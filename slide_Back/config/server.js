var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: '*'
  })
);

// consign()
//   .include('global/routes')
//   .then('global/script')
//   .then('global/models')
//   .then('global/controllers')
//   .into(app);

module.exports = app;
