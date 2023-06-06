import express from "express";
import {
  buySubscriptionController,
  paymentVerificationController,
  getRazorpayKeyController,unSubscribeController
} from "../Controllers/PaymentController.js";
import { isAuthenticated } from "../Middlewares/Auth.js";
const router = express.Router();

//Buy subscription
router.route("/subscribe").get(isAuthenticated, buySubscriptionController);

//Payment verification
router
  .route("/paymentverification")
  .post(isAuthenticated, paymentVerificationController);

//get razorpay key to frontend
router.route("/razorpaykey").get(getRazorpayKeyController);

//cancel subscription
router
  .route("/subscribe/cancel")
  .delete(isAuthenticated, unSubscribeController);

export default router;
