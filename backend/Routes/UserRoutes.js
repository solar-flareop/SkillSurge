import express from "express";
import {
  loginController,
  logoutController,
  registerController,
  getMyProfileController,
  deleteMyProfileController,
  changePasswordController,
  updateProfileController,
  updateProfilePictureController,
  forgetPasswordController,
  resetPasswordController,
  addToPlaylistController,
  removeFromPlaylistController,
  getAllUsersController,
  updateUserRoleController,
  deleteUserController,
} from "../Controllers/UserController.js";
import { isAdmin, isAuthenticated } from "../Middlewares/Auth.js";
import singleUpload from "../Middlewares/Multer.js";

const router = express.Router();

//register new user
router.route("/register").post(singleUpload, registerController);

//login
router.route("/login").post(loginController);

//logout
router.route("/logout").get(isAuthenticated, logoutController);

//get my profile
//delete my profile
router
  .route("/me")
  .get(isAuthenticated, getMyProfileController)
  .delete(isAuthenticated, deleteMyProfileController);

//change password
router.route("/changepassword").put(isAuthenticated, changePasswordController);

//update profile
router.route("/updateprofile").put(isAuthenticated, updateProfileController);

//update profile picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated, singleUpload, updateProfilePictureController);

//forget paassword
router.route("/forgetpassword").post(forgetPasswordController);

//reset password
router.route("/resetpassword/:token").put(resetPasswordController);

//add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylistController);

//remove from playlist
router
  .route("/removefromplaylist")
  .delete(isAuthenticated, removeFromPlaylistController);

// --------------------------ADMIN ROUTES----------------------------------

//get all users
router
  .route("/admin/users")
  .get(isAuthenticated, isAdmin, getAllUsersController);

//update user role
//delete user
router
  .route("/admin/user/:id")
  .put(isAuthenticated, isAdmin, updateUserRoleController)
  .delete(isAuthenticated, isAdmin, deleteUserController);

export default router;
