import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createErrorMessage } from "../utilities/errorMessage.js";

const router = Router();

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const newUser = userService.create(req.body);
      if (newUser) {
        res.status(200).data = newUser;
      } else {
        res.status(400).data = createErrorMessage(
          "Unable to create user. Try again."
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
      const data = userService.getAllUsers();
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
      const data = userService.getUser(req.params.id);
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
  updateUserValid,
  (req, res, next) => {
    try {
      const data = userService.update(req.params.id, req.body);
      res.status(200).data = data;
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
      const data = userService.delete(req.params.id);
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
