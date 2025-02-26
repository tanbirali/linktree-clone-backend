const bcrypt = require("bcrypt");
const pool = require("../config/db.config");
const jwt = require("jsonwebtoken");
const { generateReferralCode } = require("./generateReferral.controller");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, email, password, referral_code } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    //Check if referral Code exists

    const referredBy = referral_code
      ? (
          await pool.query("SELECT * FROM users WHERE referral_code = $1", [
            referral_code,
          ])
        ).rows[0]?.id
      : null;

    const newUser = await pool.query(
      "INSERT INTO users (username, email, password_hash, referral_code, referred_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, email, hashedPassword, generateReferralCode(), referredBy]
    );

    //if referred, update referral status
    if (referredBy) {
      await pool.query(
        "INSERT INTO referrals (referrer_id, referred_user_id, status) VALUES ($1, $2, 'successful')",
        [referredBy, newUser.rows[0].id]
      );
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ message: "Registration Failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (
    !user.rows[0] ||
    !(await bcrypt.compare(password, user.rows[0].password_hash))
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });

  res.json({ message: "Login successful", token });
};
