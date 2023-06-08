import express from "express";
import User from "../schemas/User";
import UserStats from "../schemas/UserStats";
import bcrypt from "bcrypt";

const router = express.Router();

//REGISTER
router.post("/", async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const salt = bcrypt.genSaltSync();
      const anyUser = await User.findOne({username})
      if (anyUser) {
        res.status(400).json({
          success: false,
          response: "Username already in use"
        })
      } else if (password.length < 8) {
            res.status(400).json({
            success: false,
            response: "Password must be at least 8 characters long"
        })
      } else {
          const newUser = await User({username: username, email: email, password: bcrypt.hashSync(password, salt)}).save()
          const newChallengeStat = await new UserStats({username: username, quiztype: 'training', category: "-", score: 0, points: 0, time: 0, opponent: "-"}).save()
          const newUserStat = await new UserStats({username: username, quiztype: 'challenge', category: "-", score: 0, points: 0, time: 0, opponent: "-"}).save()
          console.log(newUserStat, newChallengeStat)
          res.status(201).json({
          success: true,
          response: {
            username: newUser.username,
            accessToken: newUser.accessToken,
            email: newUser.email,
            id: newUser.id
          }
        })
      }
    } catch (error) {
        res.status(400).json({
          success: false,
          response: "Something went wrong", error: error.errors
        });
    }
  });

  export default router;