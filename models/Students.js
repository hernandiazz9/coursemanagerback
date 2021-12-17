const mongoose = require("mongoose");

const StudentsSchema = mongoose.Schema({
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
//   coursesTaked:{

//   }
});

module.exports = mongoose.model("Students", StudentsSchema);
