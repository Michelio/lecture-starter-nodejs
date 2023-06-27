import { FIGHTER } from "../models/fighter.js";
import { createErrorMessage } from "../utilities/errorMessage.js";

const validateFighter = (fighterData, isUpdate = false) => {
  const fighterKeys = Object.keys(fighterData);
  const modelKeys = Object.keys(FIGHTER);

  if (
    !fighterKeys.every((key) => modelKeys.includes(key)) ||
    (!modelKeys.every((key) => {
      if (key === "id" || key === "health") return true;
      return fighterKeys.includes(key);
    }) &&
      !isUpdate)
  ) {
    return createErrorMessage("Invalid properties.");
  }

  if (fighterData.id) {
    return createErrorMessage("Id property is prohibited.");
  }

  if (fighterKeys.length < 1) {
    return createErrorMessage("Add some properties.");
  }

  if (!isUpdate) fighterData.health = fighterData.health || 100;

  if (
    fighterData.health &&
    (typeof fighterData.health !== "number" ||
      fighterData.health < 80 ||
      fighterData.health > 120)
  ) {
    return createErrorMessage("Invalid health value.");
  }

  if (
    fighterData.power &&
    (typeof fighterData.power !== "number" ||
      fighterData.power < 1 ||
      fighterData.power > 100)
  ) {
    return createErrorMessage("Invalid power value.");
  }

  if (
    fighterData.defense &&
    (typeof fighterData.defense !== "number" ||
      fighterData.defense < 1 ||
      fighterData.defense > 10)
  ) {
    return createErrorMessage("Invalid defense value.");
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
