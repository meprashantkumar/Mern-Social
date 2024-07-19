import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import path from "path";

dotenv.config();

const app = express();

const port = process.env.PORT;

// using middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

// importing routes
import userRoutes from "./routes/user.routes.js";
import pinRoutes from "./routes/pin.routes.js";
import cookieParser from "cookie-parser";

// using routes
app.use("/api", userRoutes);
app.use("/api", pinRoutes);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
