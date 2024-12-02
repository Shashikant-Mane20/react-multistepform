const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/multistepform");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

// Ensure the "uploads" folder exists
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// API Endpoint to Handle Form Submission
app.post("/submit", upload.single("file"), async (req, res) => {
  const { avatar, name, designation } = req.body;

  try {
    const newUser = new User({
      avatar,
      name,
      designation,
      file: req.file.path,
    });

    await newUser.save();
    res.status(200).json({ message: "Data saved successfully!" });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ message: "Failed to save data.", error });
  }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
