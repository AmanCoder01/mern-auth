import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected !");

    } catch (error) {
        console.log("Database Connection Error", error.message);
        process.exit(1);
    }
}