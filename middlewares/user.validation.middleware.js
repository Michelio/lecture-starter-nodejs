import { USER } from "../models/user.js";
import { createErrorMessage } from "../utilities/errorMessage.js";

const EMAIL_REGEX = /^[a-z0-9](\.?[a-z0-9]){5,30}@gmail\.com$/gi;
const PHONE_REGEX = /^(\+380)\d{9}/g;

const validateUser = (userData, isUpdate = false) => {
  let hasProperty = false;
  Object.keys(userData).forEach((key) => {
    if (!USER.hasOwnProperty(key)) {
      return createErrorMessage(`Invalid property \'${key}\'.`);
    } else {
      if (key !== "id") hasProperty = true;
    }
  });

  if (!hasProperty) {
    return createErrorMessage("Provide any properties.");
  }

  if (!userData.firstName && !isUpdate) {
    return createErrorMessage("First name is required.");
  }

  if (!userData.lastName && !isUpdate) {
    return createErrorMessage("Last name is required.");
  }

  if (!userData.email) {
    if (!isUpdate) return createErrorMessage("Email address is required.");
  } else {
    if (!userData.email.match(EMAIL_REGEX)) {
      return createErrorMessage("Invalid email address.");
    }
  }

  if (!userData.phoneNumber) {
    if (!isUpdate) return createErrorMessage("Phone number is required.");
  } else {
    if (!userData.phoneNumber.match(PHONE_REGEX))
      return createErrorMessage("Invalid phone number.");
  }

  if (!userData.password) {
    if (!isUpdate) return createErrorMessage("Password is required.");
  } else {
    if (userData.password.length < 3) {
      return createErrorMessage("Invalid password.");
    }
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
  const userData = req.body;

  if (userData) {
    const valid = validateUser(userData, true);
    if (!!valid) {
      res.status(400).json(valid);
    } else {
      res.status(200);
      next();
    }
  } else {
    res
      .status(400)
      .json(createErrorMessage("User entity to update isn't valid."));
  }
};

export { createUserValid, updateUserValid };
