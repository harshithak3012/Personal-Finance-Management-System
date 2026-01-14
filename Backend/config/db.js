const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err.message);
    console.log("Please check your MONGO_URI in .env file");
    process.exit(1);
  }
};

module.exports = connectDB;
