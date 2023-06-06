import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import userModel from "../Models/User.js";
import paymentModel from "../Models/Payment.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const buySubscriptionController = catchAsyncError(
  async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    if (!user) return next(new ErrorHandler("User not found", 404));
    if (user.role === "admin")
      return next(new ErrorHandler("Admin has full access", 404));

    const subscription = await instance.subscriptions.create({
      plan_id: process.env.PLAN_ID,
      customer_notify: 1,
      total_count: 12,
    });

    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;

    await user.save();

    res.status(201).json({
      success: true,
      subscriptionId: subscription.id,
    });
  }
);

export const paymentVerificationController = catchAsyncError(
  async (req, res, next) => {
    const {
      razorpay_signature,
      razorpay_payment_id,
      razorpay_subscription_id,
    } = req.body;

    const user = await userModel.findById(req.user._id);

    const subscription_id = user.subscription.id;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(razorpay_payment_id + "|" + subscription_id, "utf-8")
      .digest("hex");

    const isAuthenticPayment = generated_signature === razorpay_signature;

    if (!isAuthenticPayment)
      return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);

    await paymentModel.create({
      razorpay_signature,
      razorpay_payment_id,
      razorpay_subscription_id,
    });

    user.subscription.status = "active";

    await user.save();

    res.redirect(
      `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
    );
  }
);

export const getRazorpayKeyController = catchAsyncError(
  async (req, res, next) => {
    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_API_KEY,
    });
  }
);

export const unSubscribeController = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  const subscriptionId = user.subscription.id;

  let refund = false;

  //cancel razorpay subscription
  await instance.subscriptions.cancel(subscriptionId);

  //check in model
  const payment = await paymentModel.findOne({
    razorpay_payment_id: subscriptionId,
  });

  const gap = Date.now() - payment.createdAt;

  const refundTime = process.env.REFUND_DAYS * 24 * 60 * 60 * 1000;

  if (refundTime > gap) {
    await instance.payments.refund(payment.razorpay_payment_id);
    refund = true;
  }

  // deleted from model
  await paymentModel.findOneAndDelete({
    razorpay_payment_id: subscriptionId,
  });

  // update user model
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();

  return res.status(200).json({
    success: true,
    message: refund
      ? "Subscription cancelled, you will recieve refund within 7 days"
      : "Subscription cancelled , no refund as subscription was cancelled after 7 days",
  });
});
