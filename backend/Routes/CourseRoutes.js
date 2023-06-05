import express from "express";
import {
  createCourseController,
  getAllCoursesController,
  getCourseLecturesController,
  addLectureController,
  deleteCourseController,
  deleteLectureController,
} from "../Controllers/CourseController.js";
import singleUpload from "../Middlewares/Multer.js";
import { isAdmin, isAuthenticated } from "../Middlewares/Auth.js";
const router = express.Router();

//get all courses without lectures
router.route("/courses").get(getAllCoursesController);

//create new course
router
  .route("/createcourse")
  .post(isAuthenticated, isAdmin, singleUpload, createCourseController);

//get all lectures of course
//add lecture to course
//delete course
router
  .route("/course/:id")
  .get(isAuthenticated, getCourseLecturesController)
  .post(isAuthenticated, isAdmin, singleUpload, addLectureController)
  .delete(isAuthenticated, isAdmin, deleteCourseController);

//delete lecture
router
  .route("/lecture")
  .delete(isAuthenticated, isAdmin, deleteLectureController);

export default router;
