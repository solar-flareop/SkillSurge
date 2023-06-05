import courseModel from "../Models/Course.js";
import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import getDataUri from "../Utils/DataUri.js";
import cloudinary from "cloudinary";

export const getAllCoursesController = catchAsyncError(
  async (req, res, next) => {
    const courses = await courseModel.find().select("-lectures");
    res.status(200).json({
      success: true,
      courses,
    });
  }
);

export const createCourseController = catchAsyncError(
  async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy)
      return next(new ErrorHandler("Please add all fields", 400));

    const file = req.file;

    //dataUri &  upload to cloudinary
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    await courseModel.create({
      title,
      description,
      category,
      createdBy,
      poster: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully. You can add lectures now!",
    });
  }
);

export const getCourseLecturesController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) return next(new ErrorHandler("Course not found", 404));

    //to increase views
    course.views += 1;
    await course.save();

    res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  }
);

export const addLectureController = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const file = req.file;

  const course = await courseModel.findById(id);
  if (!course) return next(new ErrorHandler("Course not found", 404));
  if (!title) return next(new ErrorHandler("Title is mandatory", 400));

  //dataUri &  upload to cloudinary(max size for free 100mb)
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added in course",
  });
});

export const deleteCourseController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const course = await courseModel.findById(id);
    if (!course) return next(new ErrorHandler("Course not found", 404));

    //need to delete course poster and lecture videos from cloudinary
    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
      const singleLecture = course.lectures[i];
      await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
        resource_type: "video",
      });
    }

    await courseModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  }
);

export const deleteLectureController = catchAsyncError(
  async (req, res, next) => {
    const { courseId, lectureId } = req.query;
    const course = await courseModel.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));

    const lectureToBeDeleted = course.lectures.find((item) => {
      return item._id.toString() === lectureId.toString();
    });

    //need to delete lecture videos from cloudinary
    await cloudinary.v2.uploader.destroy(lectureToBeDeleted.video.public_id, {
      resource_type: "video",
    });

    console.log("lectureToBeDeleted", lectureToBeDeleted);
    course.lectures = course.lectures.filter((item) => {
      return item._id.toString() !== lectureId.toString();
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  }
);
