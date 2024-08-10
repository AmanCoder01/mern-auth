import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js"
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); //allow us to parse req.body


app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    });
}


app.listen(process.env.PORT, () => {
    connectDb();
    console.log(`Server is running on PORT ${process.env.PORT}`);
})