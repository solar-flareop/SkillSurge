import courseModel from "../Models/Course.js";
import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await courseModel.find().select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

  // const file = req.file;
  await courseModel.create({
    title,
    description,
    category,
    createdBy,
    poster: { public_id: "temp", url: "temp" },
  });
  res.status(201).json({
    success: true,
    message: "Course created successfully. You can add lectures now!",
  });
});
