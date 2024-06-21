import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect("mongodb+srv://amanuielgrmay:Ggpfep65@cluster0.nz30mbl.mongodb.net/sizzlespot")
    .then(() => console.log("db connected"));
};
