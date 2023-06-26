import { FIGHTER } from "../models/fighter.js";
import { createErrorMessage } from "../utilities/errorMessage.js";

const NAME_REGEX = /^[a-z]$/gi;

const validateFighter = (fighterData, isUpdate = false) => {
  let hasProperty = false;
  Object.keys(fighterData).forEach((key) => {
    if (!FIGHTER.hasOwnProperty(key)) {
      return createErrorMessage(`Invalid property \'${key}\'.`);
    } else {
      if (key !== "id" && key !== "health") hasProperty = true;
    }
  });

  if (!hasProperty) {
    return createErrorMessage("Provide any properties.");
  }

  if (!fighterData.name && !isUpdate) {
    return createErrorMessage("Name is required.");
  }

  if (fighterData.health) {
    if (
      fighterData.health &&
      (fighterData.health < 80 || fighterData.health > 120)
    ) {
      return createErrorMessage("Invalid health value provided.");
    }
  } else {
    fighterData.health = 100;
  }

  if (!fighterData.power) {
    if (!isUpdate) return createErrorMessage("Power is required.");
  } else {
    if (fighterData.power < 1 || fighterData.power > 100) {
      return createErrorMessage("Invalid power value provided.");
    }
  }

  if (!fighterData.defense) {
    if (!isUpdate) return createErrorMessage("Defense is required.");
  } else {
    if (fighterData.defense < 1 || fighterData.defense > 10)
      return createErrorMessage("Invalid defense value provided.");
  }
};

const createFighterValid = (req, res, next) => {
  const fighterData = req.body;

  if (fighterData) {
    const valid = validateFighter(fighterData);
    if (!!valid) {
      res.status(400).json(valid);
    } else {
      res.status(200);
      next();
    }
  } else {
    res
      .status(400)
      .json(createErrorMessage("Fighter entity to create isn't valid."));
  }
};

const updateFighterValid = (req, res, next) => {
  const fighterData = req.body;

  if (fighterData) {
    const valid = validateFighter(fighterData, true);
    if (!!valid) {
      res.status(400).json(valid);
    } else {
      res.status(200);
      next();
    }
  } else {
    res
      .status(400)
      .json(createErrorMessage("Fighter entity to update isn't valid."));
  }
};

export { createFighterValid, updateFighterValid };
