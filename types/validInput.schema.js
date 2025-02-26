const { z } = require("zod");

exports.registerSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
  referral_code: z.string().optional(),
});

exports.loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
