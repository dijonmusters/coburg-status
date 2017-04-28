var express = require('express');
var app = express();
var router = express.Router();

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/other', function (req, res) {
  res.sendFile(__dirname + '/other.html');
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});
