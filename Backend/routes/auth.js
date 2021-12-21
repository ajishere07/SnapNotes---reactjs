const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { body, validationResult } = require("express-validator");

//TODO:in reactApp post request on this /api/auth endpoint

router.post(
  "/",
  [
    body("name", "enter valid name please").isLength({ min: 3 }),
    body("email", "enter valid email please").isEmail(),
    body("password", "password should be 8 character longer").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((error) => {
        console.log(error);
        res.json({ error: "please enter a unique value" });
      });

    const user = await User(req.body);

    await user.save();
  }
);

module.exports = router;
