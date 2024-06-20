const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Error when starting the database");
  }
};

module.exports = {
  dbConnection,
};
