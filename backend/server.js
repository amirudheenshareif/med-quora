import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./database/mongodb.js";
import {questionsRoutes} from "./routes/QuestionRoutes.js";
import signUpRoute from "./routes/SignUpRoute.js";
import loginRoute from "./routes/LoginRoute.js";
import { doctorsRoute } from "./routes/DoctorsRoute.js";
import { answerRoutes } from "./routes/AnswerRoutes.js";
import { testRoute } from "./routes/test.js";
import { authMiddleWare } from "./middleware/auth.middleware.js";
// import { getTagAndType } from "./utils/LLM.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/questions",authMiddleWare,questionsRoutes)
app.use("/answer",authMiddleWare,answerRoutes)
app.use("/signup",signUpRoute)
app.use("/login",loginRoute)
app.use("/doctors",authMiddleWare,doctorsRoute)
app.use("/test",testRoute)
// app.post("/llm",getTagAndType)

const PORT = 3000;

app.get("/test", (req, res) => {
  res.send({ message: "API is working" });
});

app.listen(PORT, async () => {
      await connectToMongoDB();
      console.log("server running on port 3000");
    });