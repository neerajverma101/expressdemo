const { body, validationResult } = require("express-validator/check");

const validate = (controllerFunction) => {
  switch (controllerFunction) {
    case "addCrudResourceData": {
      return [
        body("email", "invalid email").isEmail(),
        body("mobile", "invalid mobile").isMobilePhone(),
      ];
    }
  }
};

const users = () => {
  return true;
};
const posts = () => {
  return true;
};

module.exports = { users, posts };
