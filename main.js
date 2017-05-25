var express = require('express');
var app = express();
var router = express.Router();

const isReachable = require('is-reachable');

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
    {
      address: '9subjects.coburg.vic.edu.au',
      status: ''
    },
    {
      address: 'https://student22.coburg.vic.edu.au',
      status: ''
    },
    {
      address: '7subjects.coburg.vic.edu.au',
      status: ''
    },
    {
      address: 'coburg-vic.compass.education',
      status: ''
    }
  ];
  var i = 0;
  hosts.forEach(function (host) {
    isReachable(host.address).then(function(reachable) {
      reachable ? host.status = 'online' : host.status = 'offline';
      console.log(host.address, ': ', host.status);
      i++;
      if (i === hosts.length) {
        res.send(hosts);
      }
    });
  });
  // setTimeout(ping_all, 15000);
}

app.post('/ping_all', ping_all);

if (process.env.PORT) {
  app.listen(process.env.PORT);
} else {
  app.listen(5000, function() {
    console.log('listening...');
  });
}


// app.listen(5000, function() {
//   console.log('listening...');
// });
// var http = require('http');
// http.createServer(function (req, res) {
//   // res.writeHead(200, {"Content-Type": "text/plain"});
//   // res.end("Hello node friend\n");
//   res.sendFile(__dirname + '/index.html');
// }).listen(process.env.PORT);
