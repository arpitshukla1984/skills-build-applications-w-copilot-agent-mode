import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/octofit";

app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const connectWithRetry = async (retries = 5, delay = 2000) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
      connectWithRetry();
    });
  } catch (err) {
    console.error(`MongoDB connection error: ${err}. Retries left: ${retries - 1}`);
    if (retries > 1) {
      setTimeout(() => connectWithRetry(retries - 1, delay * 2), delay);
    } else {
      console.error("Could not connect to MongoDB after retries. Starting server without DB connection.");
      app.listen(PORT, () => console.log(`Server running on port ${PORT} (no DB)`));
    }
  }
};

connectWithRetry();
