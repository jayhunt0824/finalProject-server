const { Router } = require("express");
// const { MyRecipes } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = Router();
const {Recipe} = require("../models");

router.post("/create", validateSession, (req, res) => {
  // if (req.user.role != "Admin") {
  //   res.json({ message: "You are not an Admin!!!" });
  // }
  const recipeEntry = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    categories: req.body.categories,
    photoURL: req.body.photoURL,
    // adminDisplay: req.body.product.adminDisplay,
    userId: req.user.id,
  };

  Recipe.create(recipeEntry)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "user",
  };
  Recipe.findAll(query)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "user",
  };
  Recipe.findAll(query)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:name", validateSession, function (req, res) {
  const query = {
    where: { name: req.params.name },
    include: "user",
  };
  Recipe.findOne(query)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/update/:id", validateSession, function (req, res) {
  const updateRecipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    categories: req.body.categories,
    photoURL: req.body.photoURL,
  };

  const query = {
    where: { id: req.params.id, userId: req.user.id },
  };

  Recipe.update(updateRecipe, query)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id, userId: req.user.id },
    // include: "user",
  };
  Recipe.destroy(query)
    .then((recipe) => res.status(200).json(recipe))
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
