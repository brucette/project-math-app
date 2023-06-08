import express from "express";
import User from "../schemas/User";
import bcrypt from "bcrypt";

const router = express.Router()

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username})
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          id: user.id
        }
      }) 
    } else {
        res.status(400).json({
          success: false,
          response: "Credentials did not match"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: "Something went wrong", error: error.errors
    })
  }
})

export default router;