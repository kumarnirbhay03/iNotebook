const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = process.env.JWT_SECRET;

//create a user using : POST "/api/auth/", Does not require login.
router.post(
  "/createuser",
  [
    body("name", "Enter valid Name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Enter valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, errors: "sorry a user with same email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // .then((user) => res.json(user))
      // .catch((err) => console.log(err));
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.massage);
      res.status(500).send("errror occured");
    }
  }
);

//login a user using : POST "/api/auth/", Does not require login.
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ success, errors: "Please login with correct credential" });
      }
      const passwordCompare = bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, errors: "Please login with correct credential" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // .then((user) => res.json(user))
      // .catch((err) => console.log(err));
      success = true;
      res.json({ success, authtoken, msg: "Logged in successfully" });
    } catch (error) {
      console.error(error.massage);
      res.status(500).send("errror occured");
    }
  }
);

// get logged in user details
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.massage);
    res.status(500).send("errror occured");
  }
});

module.exports = router;
