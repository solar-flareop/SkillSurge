import express from "express";
import {
  contactController,
  courseRequestController,
  adminStatsController
} from "../Controllers/OtherController.js";
const router = express.Router();
import { isAdmin, isAuthenticated } from "../Middlewares/Auth.js";

//contact form
router.route("/contact").post(contactController);

//course request form
router.route("/courserequest").post(courseRequestController);

//get admin dashboard stats
router
  .route("/admin/stats")
  .get(isAuthenticated, isAdmin, adminStatsController);

export default router;
