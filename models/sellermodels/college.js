const mongoose = require("mongoose");

/*Holds data of various colleges courses
  Doesn't require user interaction
*/

const collegeSchema = mongoose.Schema({
  college_name: {
    type: String,
    unique: true,
  },
});

const College = mongoose.model("College", collegeSchema, "Colleges");

module.exports = College;
