import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../Controllers/UserController.js";

const router = express.Router();

//register new user
router.route("/register").post(registerController);

//login
router.route("/login").post(loginController);

//logout
router.route("/logout").get(logoutController);

//get my profile

//change password

//update profile

//update profile picture

//forget paassword

//reset password

//add to playlist

//remove from playlist

export default router;
