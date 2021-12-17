const mongoose = require("mongoose");

const CoursesSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  startDate: {
    type: Date,
    require: true,
  },
  startTime: {
    type: String,
    require: true,
  },
  courseLength: {
    type: String,
    require: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Instructor",
  },
  studentList: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "StudentList",
  },
});


module.exports = mongoose.model("Courses", CoursesSchema);
