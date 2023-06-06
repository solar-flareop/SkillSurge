import app from "./app.js";
import connectDB from "./Config/Database.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCorn from "node-cron";
import statModel from "./Models/Stats.js";

connectDB();

// cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

//razopray instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Node-Corn
nodeCorn.schedule("0 0 0 1 * *", async () => {
  try {
    await statModel.create({});
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
