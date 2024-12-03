import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nahid:beVtIDKkwJmg3YwP@cluster0.yli9s.mongodb.net/deposit?retryWrites=true&w=majority&appName=Cluster0",
    );
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
