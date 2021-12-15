const express = require("express");
const router = express.Router();
const User = require("../models/Users");

//TODO:in reactApp post request on this /api/auth endpoint

router.get("/", async (req, res) => {
  res.json({
    task: "apiTest",
    message: "success",
  });
  const user = await User(req.body);
  await console.log(req.body);
  await user.save();
});

module.exports = router;
