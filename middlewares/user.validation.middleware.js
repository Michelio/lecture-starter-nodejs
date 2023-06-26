import { USER } from "../models/user.js";

const EMAIL_REGEX = /^[a-z0-9](\.?[a-z0-9]){5,30}@gmail\.com$/gi;
const PHONE_REGEX = /^(\+380)\d{9}/g;

const createErrorMessage = (message) => {
  return {
    error: true,
    message,
  };
};

const validateUser = (userData) => {
  Object.keys(userData).forEach((key) => {
    if (!USER.hasOwnProperty(key)) {
      return createErrorMessage(`Invalid property \'${key}\'.`);
    }
  });

  if (userData.hasOwnProperty("id")) {
    return createErrorMessage("You can't use id as a property.");
  }

  if (userData.firstName?.length <= 0) {
    return createErrorMessage("Invalid first name.");
  }

  if (userData.lastNameName?.length <= 0) {
    return createErrorMessage("Invalid last name.");
  }

  if (!userData.email?.match(EMAIL_REGEX)) {
    return createErrorMessage("Invalid email address.");
  }

  if (!userData.phoneNumber?.match(PHONE_REGEX)) {
    return createErrorMessage("Invalid phone number.");
  }

  if (userData.password?.length < 3) {
    return createErrorMessage("Invalid password.");
  }
};

const createUserValid = (req, res, next) => {
  const userData = req.body;

  if (userData) {
    const valid = validateUser(userData);
    if (!!valid) {
      res.status(400).json(valid);
    } else {
      res.status(200);
      next();
    }
  } else {
    res
      .status(400)
      .json(createErrorMessage("User entity to create isn't valid."));
  }
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
