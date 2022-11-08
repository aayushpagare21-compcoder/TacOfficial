const mongoose = require("mongoose"); 

/*Holds data of various countries 
  Doesn't require user interaction
*/

const countrySchema = mongoose.Schema({
  country_name: {
    type: String,
    unique: true,
  },
});

const Country = mongoose.model("Country", countrySchema, "Countries");

module.exports = Country;
