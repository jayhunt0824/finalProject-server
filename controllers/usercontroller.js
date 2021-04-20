const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validateSession");

const router = Router();
router.get("/get", function (req, res) {
  User.findAll({ where: { id: 1 }, include: ["recipe"] }).then(
    function findOneSuccess(data) {
      res.json(data);
    },
    function findOneError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/signup", function (req, res) {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 13),
    role: "User",
  })
    .then(function createSuccess(user) {
      let token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: 60 * 60 * 24,
        }
      );
      res.json({
        user: user,
        message: "User Successfully Created",
        sessionToken: token,
      });
    })
    .catch(function (err) {
      res.status(500).json({ error: err });
    });
});

router.post("/login", function (req, res) {
  User.findOne({
    where: {
      username: req.body.username,
      // password: bcrypt.hashSync(req.body.password, 13),
      // role: "User",
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, matches) {
            if (matches) {
              let token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                {
                  expiresIn: 60 * 60 * 24,
                }
              );
              res.status(200).json({
                user: user,
                message: "User Successfully Logged in!",
                sessionToken: token,
              });
            } else {
              res.status(502).send({ error: "Login Failed" });
            }
          }
        );
      } else {
        res.status(500).json({ error: "User does not exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
  if (req.user.role != "Admin") {
    res.json({ message: "You are not an Admin!!!" });
  }
  const updateUser = {
    name: req.body.name,
    password: req.body.password,
  };

  const query = {
    where: { id: req.params.id },
  };

  User.update(updateUser, query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  if (req.user.role != "Admin") {
    res.json({ message: "You are not an Admin!!!" });
  }

  const query = {
    where: { id: req.params.id },
    // include: "user",
  };
  User.destroy(query)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
