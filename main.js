var express = require('express');
var app = express();
var router = express.Router();

var ping = require('ping');

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
  var hosts = [
    'https://www.student20.coburg.vic.edu.au',
    'https://www.student22.coburg.vic.edu.au/wiki',
    '10.147.252.32'
  ];
  var cfg = {
    timeout: 1000,
    // WARNING: -i 2 may not work in other platform like window
    extra: ["-i 2"],
  };
  var msg = 'PINGED';
  hosts.forEach(function (host) {
    ping.sys.probe(host, function(isAlive) {
      var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
      console.log(msg);
    }, {extra: ["-i 2"], timeout: false});
  });
  res.send(msg);
}

app.post('/ping_all', ping_all);

// app.listen(process.env.PORT);
app.listen(5000, function() {
  console.log('listening...');
});
// var http = require('http');
// http.createServer(function (req, res) {
//   // res.writeHead(200, {"Content-Type": "text/plain"});
//   // res.end("Hello node friend\n");
//   res.sendFile(__dirname + '/index.html');
// }).listen(process.env.PORT);
