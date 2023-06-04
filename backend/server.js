import app from "./app.js";
import connectDB from "./Config/Database.js";

connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
