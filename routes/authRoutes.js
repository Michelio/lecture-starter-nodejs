import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { createErrorMessage } from "../utilities/errorMessage.js";
const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = authService.login({ email, password });
      res.status(200);
      res.data = data;
    } catch (err) {
      res.status(404);
      res.data = createErrorMessage(err.message);
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
