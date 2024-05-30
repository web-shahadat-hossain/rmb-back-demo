import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://webshahadathossain:gF8HKkPJdjhc8e0K@cluster0.vxsxlfa.mongodb.net/rmbBackend?retryWrites=true&w=majority&appName=Cluster0",
    );
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
