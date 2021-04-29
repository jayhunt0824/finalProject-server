const { Router } = require("express");
// const { MyRecipes } = require("../models");
const validateSession = require("../middleware/validateSession");
const router = Router();
const MyRecipes = require("../db").import("../models/myrecipes");

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

  MyRecipes.create(recipeEntry)
    .then((myrecipes) => res.status(200).json(myrecipes))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "user",
  };
  MyRecipes.findAll(query)
    .then((myrecipes) => res.status(200).json(myrecipes))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/mine", validateSession, function (req, res) {
  const query = {
    where: { userId: req.user.id },
    include: "user",
  };
  MyRecipes.findAll(query)
    .then((myrecipes) => res.status(200).json(myrecipes))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:name", validateSession, function (req, res) {
  const query = {
    where: { name: req.params.name },
    include: "user",
  };
  MyRecipes.findOne(query)
    .then((myrecipes) => res.status(200).json(myrecipes))
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
    where: { id: req.params.id, userId: req.user.id },
  };

  MyRecipes.update(updateRecipe, query)
    .then((myrecipes) => res.status(200).json(myrecipes))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = {
    where: { id: req.params.id, userId: req.user.id },
    // include: "user",
  };
  MyRecipes.destroy(query)
    .then((myrecipes) => res.status(200).json(myrecipes))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
