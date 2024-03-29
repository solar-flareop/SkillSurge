import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import { sendMail } from "../Utils/SendEmail.js";
import statModel from "../Models/Stats.js";

export const contactController = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return next(new ErrorHandler("Please add all fields", 400));

  const to = process.env.MY_MAIL;
  const subject = "Contact from SkillSurge";
  const text = `I am ${name} and my email is ${email}.\n
  ${message}`;

  await sendMail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your message has been sent",
  });
});

export const courseRequestController = catchAsyncError(
  async (req, res, next) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course)
      return next(new ErrorHandler("Please add all fields", 400));

    const to = process.env.MY_MAIL;
    const subject = "Requesting for a course on SkillSurge";
    const text = `I am ${name} and my email is ${email}.\n ${course}`;

    await sendMail(to, subject, text);

    res.status(200).json({
      success: true,
      message: "Your request has been sent",
    });
  }
);

export const adminStatsController = catchAsyncError(async (req, res, next) => {
  const stats = await statModel.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift(stats[i]);
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      views: 0,
      users: 0,
      subscription: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let usersPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;
  let usersProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;

  if (statsData[10].users === 0) usersPercentage = usersCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      views: statsData[11].views - statsData[10].views,
      subscription: statsData[11].subscription - statsData[10].subscription,
    };

    usersPercentage = (difference.users / statsData[10].users) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    viewsCount,
    subscriptionCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    usersProfit,
    viewsProfit,
    subscriptionProfit,
  });
});
