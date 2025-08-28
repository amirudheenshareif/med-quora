import { Router } from "express";
import { generateSuggestion } from "../controllers/generateSuggestion.js";
import { postAnswer } from "../controllers/postAnswer.js";

export const answerRoutes = Router();

answerRoutes.post("/generate",generateSuggestion);
answerRoutes.post("/post",postAnswer)