// controllers/foods.js

const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// router logic will go here - will be built later on in the lab
router.get("/", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate("pantry");

    res.locals.pantry = user.pantry;

    res.render("foods/index.ejs");
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect("/users/:userId/foods");
  } catch (error) {
    res.redirect("/");
  }
});

router.get("/delete", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate("pantry");
    
        res.locals.pantry = user.pantry;
    
        res.render("foods/delete.ejs");
      } catch (error) {
        res.redirect("/");
      }
});

router.delete('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.pantry.id(req.params.itemId).deleteOne();
        await user.save();
        res.redirect("/users/:userId/foods");
    } catch (error){
        res.redirect("/");
    }
});

router.get('/:itemId/edit', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate("pantry");

        const item = user.pantry.id(req.params.itemId);

        res.locals.item = item;
    
        res.render("foods/edit.ejs");
      } catch (error) {
        res.redirect("/");
      }
});

router.put('/:itemId', async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate("pantry");
        user.pantry.id(req.params.itemId).set(req.body);
        await user.save();
        res.redirect("/users/:userId/foods");
    } catch (error){
        res.redirect("/");
    }
});

module.exports = router;
