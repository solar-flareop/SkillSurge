import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import userModel from "../Models/User.js";
import courseModel from "../Models/Course.js";
import statModel from "../Models/Stats.js";
import sendToken from "../Utils/SendToken.js";
import { sendMail } from "../Utils/SendEmail.js";
import crypto from "crypto";
import getDataUri from "../Utils/DataUri.js";
import cloudinary from "cloudinary";

export const registerController = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file;

  if (!name || !email || !password || !file)
    return next(new ErrorHandler("Please enter all fields", 400));

  let user = await userModel.findOne({ email });

  if (user) return next(new ErrorHandler("User already exists", 409));

  //dataUri &  upload to cloudinary
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  sendToken(res, user, "Registered Successfully", 201);
});

export const loginController = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Credentials", 401));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler("Invalid Credentials", 401));

  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

export const logoutController = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .clearCookie("token", {
      httpOnly: true,
      secure: true, //not in lh
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getMyProfileController = catchAsyncError(
  async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const deleteMyProfileController = catchAsyncError(
  async (req, res, next) => {
    const user = await userModel.findById(req.user._id);

    //delete user data from cloudinary
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    //cancel subscription

    await userModel.findByIdAndDelete(user._id);

    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true,
        secure: true, //not in lh
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Your profile deleted successfully",
      });
  }
);

export const changePasswordController = catchAsyncError(
  async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return next(new ErrorHandler("Please enter all fields", 400));

    const user = await userModel.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return next(new ErrorHandler("Incorrect old password", 400));
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }
);

export const updateProfileController = catchAsyncError(
  async (req, res, next) => {
    const { name, email } = req.body;
    if (!name && !email)
      return next(new ErrorHandler("Enter the field you want to update", 400));

    const user = await userModel.findById(req.user._id);
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  }
);

export const updateProfilePictureController = catchAsyncError(
  async (req, res, next) => {
    const user = await userModel.findById(req.user._id);
    const file = req.file;

    if (!file) return next(new ErrorHandler("Upload profile picture", 400));

    //deleted earlier photo
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    //dataUri &  upload to cloudinary
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    user.avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
    });
  }
);

export const forgetPasswordController = catchAsyncError(
  async (req, res, next) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user)
      return next(new ErrorHandler("Email not registered for user", 400));
    const resetToken = await user.getResetToken();

    await user.save();

    //send token via email
    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
    const emailMessage = `Click on the link to reset your password. The reset link is: ${url}. Valid for 15 mins .If you have not requested then please ignore`;
    await sendMail(user.email, "SkillSurge : Reset Password", emailMessage);

    res.status(200).json({
      success: true,
      message: `Password reset token has been has been sent to ${user.email}`,
    });
  }
);

export const resetPasswordController = catchAsyncError(
  async (req, res, next) => {
    const { token } = req.params;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });

    if (!user)
      return next(new ErrorHandler("Token is invalid or expired", 401));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  }
);

export const addToPlaylistController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.body;
    const user = await userModel.findById(req.user._id);
    const course = await courseModel.findById(id);

    if (!course) return next(new ErrorHandler("Invalid course id", 404));

    const courseExists = user.playlist.find((item) => {
      if (item.course.toString() === course._id.toString()) return true;
    });
    if (courseExists)
      return next(new ErrorHandler("Course already added to playlist", 409));

    user.playlist.push({
      course: course._id,
      poster: course.poster.url,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to playlist",
    });
  }
);

export const removeFromPlaylistController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.query;
    const user = await userModel.findById(req.user._id);
    const course = await courseModel.findById(id);
    if (!course) return next(new ErrorHandler("Invalid course id", 404));

    const newPlaylist = user.playlist.filter((item) => {
      return item.course.toString() !== course._id.toString();
    });
    user.playlist = newPlaylist;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Removed from playlist",
    });
  }
);

// ---------------------------------------------------

export const getAllUsersController = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users,
  });
});

export const updateUserRoleController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    if (user.role === "user") user.role = "admin";
    else user.role = "user";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
    });
  }
);

export const deleteUserController = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  //delete user data from cloudinary
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);

  //cancel subscription

  await userModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

userModel.watch().on("change", async () => {
  const stats = await statModel.find({}).sort({ createdAt: "desc" }).limit(1);

  const subscription = await userModel.find({
    "subscription.status": "active",
  });

  stats[0].users = await userModel.countDocuments();
  stats[0].subscription = subscription.length;
  stats[0].createdAt = new Date(Date.now());

  await stats[0].save();
});
