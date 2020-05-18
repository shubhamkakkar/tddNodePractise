const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { handleError } = require("./src/customHandlers/error");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const app = express();
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    const router = require("./src/router");
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json());
    app.use(cors());
    app.use("/", router);
    app.use((err, req, res, next) => {
      const errorObj = handleError(err, res);
      console.log({ errorObj });
      if (errorObj) {
        // res.sendStatus(errorObj.httpStatusCode).json(err);
      }
    });
    app.listen(3000, () => console.log("connection running"));
  })
  .catch((er) => console.log("failed to connect to mongoose instance", er));
