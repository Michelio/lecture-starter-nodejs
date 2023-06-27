import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { createErrorMessage } from "../utilities/errorMessage.js";

const router = Router();

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    try {
      const newFighter = fighterService.create(req.body);
      if (newFighter) {
        res.status(200).data = newFighter;
      } else {
        res.status(400).data = createErrorMessage(
          "Unable to create Fighter. Try again."
        );
      }
    } catch (err) {
      res.status(400).data = createErrorMessage(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = fighterService.getAllFighters();
      res.status(200).data = data;
    } catch (err) {
      res.status(404).data = createErrorMessage(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.getFighter(req.params.id);
      res.status(200).data = data;
    } catch (err) {
      res.status(404).data = createErrorMessage(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    try {
      const fighterData = fighterService.update(req.params.id, req.body);
      res.status(200).data = fighterData;
    } catch (err) {
      res.status(404).data = createErrorMessage(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.delete(req.params.id);
      res.status(200).data = data;
    } catch (err) {
      res.status(404).data = createErrorMessage(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
