const { validationResult } = require("express-validator");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(200)
      .json({ error: errors.array().map((e) => e.msg)?.[0] });
  } else {
    next();
  }
};
