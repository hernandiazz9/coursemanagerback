const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hernandiazz:sayhiphop9@cluster0.6qf1n.mongodb.net/ChallangeCourses',{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(">>> DB conected");
  } catch (error) {
    console.log("There was an ERROR:", error);
    process.exit(1); //stop app
  }
};

module.exports = conectDB;
