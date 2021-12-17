const mongoose = require("mongoose");

const StudentListSchema = mongoose.Schema({
  listName: {
    type: String,
    require: true,
    trim: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Students",
    },
  ],
});

module.exports = mongoose.model("StudentList", StudentListSchema);
