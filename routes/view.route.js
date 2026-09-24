import { Router } from "express";
import * as viewController from "../controllers/view.controller.js";

const router = Router();

router.get("/", viewController.renderDishes);
router.get("/sections/:slug", viewController.renderSection);
router.get("/dishes/:id", viewController.renderDish);

export default router;
