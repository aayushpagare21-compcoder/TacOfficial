const mongoose = require("mongoose");

const options = {}; 

mongoose
  .connect(process.env.DB_URL, options)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Error connecting to database: " + err.message);
  });
