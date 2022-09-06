require("dotenv").config();

const express = require("express");
const app = express();

app.use("/users", require("./controllers/usercontroller.js"));
app.use("/categories", require("./controllers/categorycontroller.js"));

app.listen(process.env.PORT, function (err) {
  if (err) console.error(err);
  console.log(`Server listenning port ${process.env.PORT}`);
});
