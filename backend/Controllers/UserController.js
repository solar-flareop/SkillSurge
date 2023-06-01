import catchAsyncError from "../Middlewares/CatchAsyncError.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import userModel from "../Models/User.js";
import sendToken from "../Utils/SendToken.js";

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
      expires: new Date(Date.now() + 15 * 24 * 60 * 50 * 1000),
      httpOnly: true,
      // secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});
