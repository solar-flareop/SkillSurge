import express from "express";
import {
  loginController,
  logoutController,
  registerController,
  getMyProfileController,
  changePasswordController,
  updateProfileController,updateProfilePictureController,forgetPasswordController,resetPasswordController
} from "../Controllers/UserController.js";
import { isAuthenticated } from "../Middlewares/Auth.js";

const router = express.Router();

//register new user
router.route("/register").post(registerController);

//login
router.route("/login").post(loginController);

//logout
router.route("/logout").get(logoutController);

//get my profile
router.route("/me").get(isAuthenticated,getMyProfileController);

//change password
router.route("/changepassword").put(isAuthenticated,changePasswordController);

//update profile
router.route("/updateprofile").put(isAuthenticated,updateProfileController);

//update profile picture
//not done
router.route("/updateprofilepicture").put(isAuthenticated,updateProfilePictureController);

//forget paassword
router.route("/forgetpassword").post(forgetPasswordController);

//reset password
router.route("/resetpassword/:token").put(resetPasswordController);
//add to playlist

//remove from playlist

export default router;
