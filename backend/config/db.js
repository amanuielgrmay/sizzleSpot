import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(process.env.SECRET_KEY)
    .then(() => console.log("db connected"));
};
