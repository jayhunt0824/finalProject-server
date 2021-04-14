const { Router } = require("express");
const { Recipe } = require("../models");
const validateSession = require("../middleware/validate-session");
const router = Router();

router.post("/create", validateSession, function (req, res) {
  console.log(req.user.id);
  const recipeEntry = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    categories: req.body.categories,
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
  };

  const query = {
    where: { id: req.params.id, owner: req.user.id },
  };

  Recipe.update(updateRecipe, query)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id },
    // include: "user",
  };
  Recipe.destroy(query)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
