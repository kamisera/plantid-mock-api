const express = require("express");
const app = express();
const responses = require("./data/real-responses.json");

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

const identifyRequest = (req, res, next) => {
  const { api_key, images } = req.body;
  if (!api_key) {
    res.status(400).send({ msg: "There must be an api_key given!" });
  }
  if (!images) {
    res.status(400).send({msg: 'Images cannot be missing!'})
  }
  if (images.length === 0) {
    res.status(400).send({ msg: "Must be given at least 1 image!" });
  }

  res.status(200).send(responses[Math.floor(Math.random() * responses.length)]);
};

app.post("/v2/identify", identifyRequest);

module.exports = app;
