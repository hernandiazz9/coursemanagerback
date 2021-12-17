const mongoose = require("mongoose");

const InstructorSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  lastName: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
});



module.exports = mongoose.model("Instructor", InstructorSchema);
