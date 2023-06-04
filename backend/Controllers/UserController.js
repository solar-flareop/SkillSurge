import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import userModel from "../Models/User.js";
import sendToken from "../Utils/SendToken.js";
import { sendMail } from "../Utils/SendEmail.js";

export const registerController = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  // const file=req.file

  if (!name || !email || !password)
    return next(new ErrorHandler("Please enter all fields", 400));

  let user = await userModel.findOne({ email });

  if (user) return next(new ErrorHandler("User already exists", 409));

  //upload file to cloudinary

  user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "111",
      url: "1111",
    },
  });
  sendToken(res, user, "Registered Successfully", 201);
});

export const loginController = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // const file=req.file

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
    .cookie("token", null, {
      expires: new Date(Date.now()),
      // expires: new Date(Date.now() + 15 * 24 * 60 * 50 * 1000),
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",
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
    //cloudinary todo
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
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  }
);
