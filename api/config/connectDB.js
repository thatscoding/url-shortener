import mongoose from "mongoose";

export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");
  } catch (err) {
    console.log(err);
  }
};
