const express = require("express");
const { registerSchema, loginSchema } = require("../types/validInput.schema");
const { register, login } = require("../controller/users.controller");
const { validate } = require("../middleware/inputValidator.middleware");

const router = express.Router();

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

module.exports = router;
