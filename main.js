var express = require('express');
var app = express();
var router = express.Router();

var ping = require('ping');

var hosts = [
  'https://student22.coburg.vic.edu.au',
  'https://coburg-vic.compass.education/'
];



app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/other', function (req, res) {
  res.sendFile(__dirname + '/other.html');
});

app.get('/email', function(req, res) {
  response.send(process.env.EMAIL);
});

var ping_all = function(req, res) {
  var msg = 'PINGED';
  hosts.forEach(function (host) {
    ping.sys.probe(host, function(isAlive) {
      msg += isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
    });
  });
  res.send(msg);
}

app.post('/ping_all', ping_all);

app.listen(process.env.PORT);
// var http = require('http');
// http.createServer(function (req, res) {
//   // res.writeHead(200, {"Content-Type": "text/plain"});
//   // res.end("Hello node friend\n");
//   res.sendFile(__dirname + '/index.html');
// }).listen(process.env.PORT);
