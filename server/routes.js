const express = require("express");
const { getComments, postComment } = require("./controllers/comment");
const { body } = require("express-validator");
const { validate } = require("./lib/validate");

const router = express.Router();

router.get("/comments", getComments);
router.post(
  "/comments",
  body("comment")
    .not()
    .isEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 1, max: 500 })
    .withMessage("Comment must be between 1 and 500 characters"),
  validate,
  postComment
);

module.exports = router;
