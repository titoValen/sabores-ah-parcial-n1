import { Router } from "express";
import * as dishesController from "../controllers/dishes.controller.js";

const router = Router();

router.get("/", dishesController.renderDishes);
router.get("/sections/:slug", dishesController.renderSection);