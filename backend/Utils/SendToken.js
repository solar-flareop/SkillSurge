const sendToken = (res, user, message, statusCode = 200) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 50 * 1000),//15days
    httpOnly: true,
    // secure: true,//not in lh
    sameSite: "none", //crosscheck
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message,
    user,
  });
};

export default sendToken;
