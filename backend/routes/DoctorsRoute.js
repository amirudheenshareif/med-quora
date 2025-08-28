import { Router } from "express";
import { fetchDrSuggestions } from "../controllers/fetchDrSuggestions.js";
import { fetchInboxQueries, fetchInboxQuery } from "../controllers/fetchInboxQueries.js";
import { fetchDoctorDetails } from "../controllers/fetchDoctorDetails.js";
import { fetchMyAnswers } from "../controllers/fetchMyAnswers.js";



export const doctorsRoute = Router();


doctorsRoute.get("/inbox/:doctorId",fetchInboxQueries)
doctorsRoute.get("/query-reply/:queryId",fetchInboxQuery)
doctorsRoute.get("/answer-history/:doctorId", fetchMyAnswers)
doctorsRoute.get("/suggestions", fetchDrSuggestions )
doctorsRoute.get("/:doctorId",fetchDoctorDetails)




