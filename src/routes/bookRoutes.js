import express from "express";
import { getBooks, getCategories } from "../controllers/bookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/categories", getCategories);

export default router;
