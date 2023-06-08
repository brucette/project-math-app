import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./schemas/User";
import userStatsRouter from "./routes/userStatsRouter";
import registerRouter from "./routes/registerRouter";
import logInRouter from "./routes/logInRouter";
import makeChallengesRouter from "./routes/makeChallengesRouter";
import questionsRouter from "./routes/questionsRouter";
import welcomeRouter from "./routes/welcomeRouter";
import findUserIdRouter from "./routes/findUserIdRouter";
import findUsernameRouter from "./routes/findUsernameRouter";
import gameChallengeUserRouter from "./routes/challengeUserRouter";
import getChallengesRouter from "./routes/getChallengesRouter";
import challengeStatsRouter from "./routes/challengeStatsRouter";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/math-game"
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = Promise

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send([
    { "API": "Math-questions" },
    { "path": "/register", "methods": ["POST"] },
    { "path": "/login", "methods": ["POST"] },
    { "path": "/welcome", "methods": ["GET"] },
    { "path": "/user/:id", "methods": ["GET"] },
    { "path": "/user", "methods": ["GET"] },
    { "path": "/challenges", "methods": ["GET", "POST"] },
    { "path": "/gameChallengeUser", "methods": ["POST"] },
    { "path": "/challengestats", "methods": ["PATCH"] },
    { "path": "/userstats", "methods": ["GET", "POST"] },
    { "path": "/userstats/:username", "methods": ["GET", "POST"] },
    { "path": "/questions", "methods": ["POST"] }
  ]);
});

// Authenticated endpoint, accessible only when logged in
export const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({accessToken})
    if (user) {
      next()
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    })
  }
}

app.use("/register", registerRouter);
app.use("/login", logInRouter);

app.use("/welcome", authenticateUser, welcomeRouter);

app.use("/user/", findUserIdRouter);
app.use("/user", findUsernameRouter);
app.use("/gameChallengeUser", gameChallengeUserRouter);

app.use("/challenges", authenticateUser, makeChallengesRouter);

app.use("/challenges", getChallengesRouter);
app.use("/challengestats", challengeStatsRouter);


app.use("/userstats", authenticateUser, userStatsRouter);
app.use("/userstats/:username", authenticateUser, userStatsRouter);

app.use("/questions", authenticateUser, questionsRouter);

// Starts the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
