const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

const conectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO,{
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
