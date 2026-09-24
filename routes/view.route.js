import { Router } from "express";
import * as viewController from "../controllers/view.controller.js";

const router = Router();

router.get("/", viewController.renderDishes);
router.get("/sections/:slug", viewController.renderSection);
router.get("/dishes/new", viewController.renderNewDish);
router.get("/dishes/:id/edit", viewController.renderEditDish);
router.get("/dishes/:id", viewController.renderDish);
router.get("/chefs", viewController.renderChefs);
router.get("/chefs/new", viewController.renderNewChef);

export default router;
