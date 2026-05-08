import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 4000;

if (!process.env.MONGO_URI) {
  console.error("CRITICAL: MONGO_URI is not defined in environment variables.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI, {
  bufferCommands: false,
})
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);
