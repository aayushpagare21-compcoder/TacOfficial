require("dotenv").config();

const express = require("express");
const app = express();

require("./helpers/db.js"); 

app.listen(process.env.PORT, function (err) {
  if (err) console.error(err);
  console.log(`Server listenning port ${process.env.PORT}`);
});
