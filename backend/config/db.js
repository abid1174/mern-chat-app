const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

module.exports = connectDB;
