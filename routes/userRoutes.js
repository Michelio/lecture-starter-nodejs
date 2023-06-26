import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    try {
      const newUser = userService.create(req.body);
      if (newUser) {
        res.status(200).data = newUser;
      } else {
        res.status(400).data = {
          error: true,
          message: "Unable to create user. Try again.",
        };
      }
    } catch (err) {
      res.status(400).data = { error: true, message: err.message };
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
      res.status(404).data = { error: true, message: err.message };
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
      const data = userService.getUser(req.body.id);
      res.status(200).data = data;
    } catch (err) {
      res.status(404).data = { error: true, message: err.message };
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
      const data = userService.update(req.body);
      res.status(200).data = data;
    } catch (err) {
      res.status(404).data = { error: true, message: err.message };
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
      const data = userService.delete(req.body.id);
      res.status(200).data = data;
    } catch (err) {
      res.status(404).data = { error: true, message: err.message };
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
