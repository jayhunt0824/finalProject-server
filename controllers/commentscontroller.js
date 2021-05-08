const { Router } = require("express");
const { Comments } = require("../models");
// const { Recipe } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = Router();

router.post("/create", validateSession, async (req, res) => {
  Comments.create({
    comments: req.body.comments,
    userId: req.user.id,
    photoURL: req.body.photoURL,
  })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", function (req, res) {

  Comments.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
  const updateComment = {
    comments: req.body.comments,
    userId: req.user.id,
    photoURL: req.body.photoURL,
  };

  const query = {
    where: { id: req.params.id, userId: req.user.id },
  };

  Comments.update(updateComment, query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id, userId: req.user.id },
   
  };
  Comments.destroy(query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));
});



router.get('/cloudsign', validateSession, async (req, res) => {
  try {

      const ts = Math.floor(new Date().getTime() / 1000).toString()

      const sig = cloudinary.utils.api_sign_request(
          {timestamp: ts, upload_preset: 'artisan-goods-cloudinary'},
          process.env.CLOUDINARY_SECRET
      )

      res.status(200).json({
          sig, ts
      })

  } catch (err) {
      res.status(500).json({
          message: 'failed to sign'
      })
  }
})

router.put('/photoURL', validateSession, async (req, res) => {
  try {

      const u = await User.findOne({where: {id: req.user.id}})

      const result = await u.update({
          avatar: req.body.url
      })

  } catch (err) {
      res.status(500).json({
          message: 'failed to set image'
      })
  }
})

module.exports = router;
