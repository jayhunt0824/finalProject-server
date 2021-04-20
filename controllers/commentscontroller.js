const { Router } = require("express");
const { Comments } = require("../models");
// const { Recipe } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = Router();

router.post("/create/:id", validateSession, async (req, res) => {
  Comments.create({
    comments: req.body.comments,
    rating: req.body.rating,
    recipeId: req.params.id, //
    userId: req.user.id,
  })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get/:id", validateSession, function (req, res) {
  const query = {
    where: { recipeId: req.params.id },
    include: "recipe",
  };
  Comments.findOne(query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id },
  };
  Comments.findOne(query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
