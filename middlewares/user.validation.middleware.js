import { USER } from "../models/user.js";
import { createErrorMessage } from "../utilities/errorMessage.js";

const EMAIL_REGEX = /^[a-z0-9](\.?[a-z0-9]){5,30}@gmail\.com$/gi;
const PHONE_REGEX = /^(\+380)\d{9}/g;

const validateUser = (userData, isUpdate = false) => {
  const userKeys = Object.keys(userData);
  const modelKeys = Object.keys(USER);

  if (
    !userKeys.every((key) => modelKeys.includes(key)) ||
    (!modelKeys.every((key) => {
      if (key === "id") return true;
      return userKeys.includes(key);
    }) &&
      !isUpdate)
  ) {
    return createErrorMessage("Invalid properties.");
  }

  if (userData.id) {
    return createErrorMessage("Id property is prohibited.");
  }

  if (userKeys.length < 1) {
    return createErrorMessage("Add some properties.");
  }

  if (userData.email && !userData.email.match(EMAIL_REGEX)) {
    return createErrorMessage("Invalid email address.");
  }

  if (userData.phoneNumber && !userData.phoneNumber.match(PHONE_REGEX)) {
    return createErrorMessage("Invalid email address.");
  }

  if (userData.password && userData.password.length < 3) {
    return createErrorMessage("Invalid password length.");
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
