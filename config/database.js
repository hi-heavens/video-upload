const mongoose = require("mongoose");
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD);

const connectToMongoDB = () => {
  mongoose.connect(DB);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB successfully...");
  });
  mongoose.connection.on("error", (err) => {
    console.log("An error occurred connecting to MongoDB...");
    console.error(err);
  });
};

module.exports = connectToMongoDB;
