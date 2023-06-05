import app from "./app.js";
import connectDB from "./Config/Database.js";
import cloudinary from 'cloudinary'


// cloudinary configuration 
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});

connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
