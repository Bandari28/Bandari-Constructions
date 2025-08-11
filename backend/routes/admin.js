const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const ADMIN_EMAIL = "bandariconstructions28@gmail.com";
const ADMIN_PASSWORD_HASH = "$2b$10$o7XoA9oQrjGzirwyVm7eau2XH7NGQDtBxNHXoxZB96FHocmLFpxc2"; 

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check email
  if (email !== ADMIN_EMAIL) {
    return res.status(401).json({ message: "Unauthorized: Invalid email" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!isMatch) {
    return res.status(401).json({ message: "Unauthorized: Invalid password" });
  }

  // Generate JWT
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
