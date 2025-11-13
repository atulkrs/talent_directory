import express from "express";
import { addTalent, getTalents } from "../controllers/talentController.js";

const router = express.Router();

router.post("/", addTalent);

router.get("/", getTalents);

export default router;
