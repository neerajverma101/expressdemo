const { body, check, validationResult } = require("express-validator/check");

const addUser = (req, res, next) => [
  body("email", "invalid email").isEmail()(req, res, next),
  body("mobile", "invalid mobile").isMobilePhone()(req, res, next),
];

const addPost = (req, res, next) => [
  body("title", "invalid title").notEmpty()(req, res, next),
  body("description", "invalid description").notEmpty()(req, res, next),
]

module.exports = { addUser, addPost };
