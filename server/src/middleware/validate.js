
export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    req.validatedData = parsed;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: error.errors,
    });
  }
};

