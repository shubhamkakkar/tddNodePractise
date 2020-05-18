const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    const router = require("./src/router");
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json());
    app.use("/", router);
    app.listen(3000, () => console.log("connection running"));
  })
  .catch((er) => console.log("failed to connect to mongoose instance", er));
