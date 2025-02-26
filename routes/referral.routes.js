const express = require("express");
const { authMiddleware } = require("../middleware/auth.middleware");
const { getReferralStatus } = require("../controller/referral.controller");

const router = express.Router();

router.get("/referral-stats", authMiddleware, getReferralStatus);

module.exports = router;
