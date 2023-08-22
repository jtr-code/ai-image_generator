import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("Succesfully mongodb connected"))
    .catch((err) => console.error("Error in mongodb connection", err));
};

export default connectDB;
