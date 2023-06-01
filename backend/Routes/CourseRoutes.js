import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../Controllers/CourseController.js";
const router = express.Router();

//get all courses without lectures
router.route("/courses").get(getAllCourses);

//create new course - admin only
router.route("/createcourse").post(createCourse);

//add lecture, delete course , get course details

//delete lectures

export default router;
