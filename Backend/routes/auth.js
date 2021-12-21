const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "anujyadav@1122";

const { body, validationResult } = require("express-validator");

//TODO:in reactApp post request on this /api/auth endpoint

//router for creating new user
router.post(
  "/createuser",
  [
    body("name", "enter valid name please").isLength({ min: 3 }),
    body("email", "enter valid email please").isEmail(),
    body("password", "password should be 8 character longer").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // if there are errors, return bad request and the errors
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the use with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtAuthToken = jwt.sign(data, JWT_SECRET);
      console.log(jwtAuthToken);

      res.json({ jwtAuthToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

//router for login the user
router.post(
  "/login",
  [
    body("email", "enter valid email please").isEmail(),
    body("password", "password cannot be blank ").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: "Hey you try to use correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ errors: "Hey you try to use correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtAuthToken = jwt.sign(data, JWT_SECRET);
      res.json({ jwtAuthToken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Internal server error");
    }
  }
);

//router for get loggedin user details using POST 'api/auth/getuser' login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
