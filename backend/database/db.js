import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "YoutubeMernSocial",
    });

    console.log("Connected To MongoDb");
  } catch (error) {
    console.log(error);
  }
};
