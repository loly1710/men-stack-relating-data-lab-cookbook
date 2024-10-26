const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

router.get("/", async (req, res) => {
    try {
      
    const users = await User.find();
    res.locals.users = users;
    res.render("users/index.ejs");

    } catch (error) {
      res.redirect("/");
    }
  });

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
    
        res.locals.user = user;
    
        res.render("users/show.ejs");
    } catch (error){
        res.redirect("/");
    }
});


module.exports = router;
