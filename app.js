const express = require("express");
const app = express();
const responses = require("./data/real-responses.json");
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const identifyRequest = (req, res, next) => {
  const { api_key, images } = req.body;
  if (!api_key) {
    res.status(400).send({ msg: "There must be an api_key given!" });
  }
  if (images.length === 0) {
    res.status(400).send({ msg: "Must be given at least 1 image!" });
  }

  const base64Regex =
    /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

  images.forEach((image) => {
    if (!base64Regex.test(image)) {
      res.status(400).send({ msg: "Invalid Base64 encoded image supplied!" });
    }
  });

  res.status(200).send(responses[Math.floor(Math.random() * responses.length)]);
};

app.post("/v2/identify", identifyRequest);

module.exports = app;
