import { Router } from "express";
// import {getQuestionsInfo} from '../controllers/getQuestionsInfo.js'
// import { Query } from "../models/querySchema";
import { postQuestion } from "../controllers/postQuestion.js";
import { fetchQnAData } from "../controllers/fetchQnAData.js";
import {fetchMyQuestions} from "../controllers/fetchMyQuestions.js"


export const questionsRoutes = Router();

questionsRoutes.post("/post", postQuestion);
questionsRoutes.get("/qna",fetchQnAData);
questionsRoutes.get("/patient/:id",fetchMyQuestions)



