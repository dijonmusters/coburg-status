// var express = require('express');
// var app = express();
// var router = express.Router();
//
// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// });
//
// app.get('/other', function (req, res) {
//   res.sendFile(__dirname + '/other.html');
// });
//
// app.listen(5000, function () {
//   console.log('Example app listening on port 5000!');
// });
var http = require('http');
http.createServer(function (req, res) {
  // res.writeHead(200, {"Content-Type": "text/plain"});
  // res.end("Hello node friend\n");
  res.sendFile(__dirname + '/index.html');
}).listen(process.env.PORT);
