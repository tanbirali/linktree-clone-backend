exports.validate = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.body); //validate and sanitize the data
    if (!result.success) {
      return res
        .status(400)
        .json({ error: result.error.errors.map((e) => e.message).join(", ") });
    }
    req.body = result.data;
    next();
  } catch (error) {
    console.error("Validation error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
