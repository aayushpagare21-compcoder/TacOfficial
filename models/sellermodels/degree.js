const mongoose = require("mongoose"); 

/*Holds data of various degree courses
  Doesn't require user interaction
*/

const degreeSchema = mongoose.Schema({
  degree_name: {
    type: String,
    unique: true,
  },
});

const Degree = mongoose.model("Degree", degreeSchema, "Degrees");

module.exports = Degree;
