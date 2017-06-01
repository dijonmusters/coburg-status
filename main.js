var express = require('express');
var app = express();
var router = express.Router();
const ping = require('ping');
const https = require('https');

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
      address: 'student22.coburg.vic.edu.au',
      status: ''
    },
    {
      address: '7subjects.coburg.vic.edu.au',
      status: ''
    },
    {
      address: 'coburg-vic.compass.education',
      status: ''
    },
    {
      address: 'portal.coburg.vic.edu.au',
      status: ''
    },
    {
      address: 'community.coburg.vic.edu.au',
      status: ''
    }
  ];
  // var i = 0;
  // hosts.forEach(function(host) {
  //   var options = {
  //     hostname :  host.address,
  //     port : 443,
  //     rejectUnauthorized: false,
  //     path: '/',
  //     headers: {'Cache-Control':'no-cache', accept: '*/*'}
  //   };
  //   https.get(options, function(res) {
  //     i++;
  //     if (i === hosts.length) {
  //       res.send(hosts);
  //     }
  //     host.status = res.statusCode;
  //     console.log(res.statusCode);
  //   }).on('error', (e) => {
  //     console.error('error: ' + e);
  //     host.status = 400;
  //   });
  // });
  var i = 0;
  hosts.forEach(function (host) {
    var options = {
      hostname :  host.address,
      port : 443,
      rejectUnauthorized: false,
      path: '/',
      headers: {'Cache-Control':'no-cache', accept: '*/*'}
    };
    var req = https.get(options, (resp) => {
      host.status = resp.statusCode;
      i++;
      if (i === hosts.length) {
        res.send(hosts);
      }
    }).on('error', (e) => {
      console.error('error: ' + e);
      host.status = 400;
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
