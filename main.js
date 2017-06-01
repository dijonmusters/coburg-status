var express = require('express');
var app = express();
var router = express.Router();
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

var background_ping = function() {
  var hosts = [
    '9subjects.coburg.vic.edu.au',
    'student22.coburg.vic.edu.au',
    '7subjects.coburg.vic.edu.au',
    'coburg-vic.compass.education',
    'portal.coburg.vic.edu.au',
    'community.coburg.vic.edu.au'
  ];
  hosts.forEach(function (h) {
    var options = {
      hostname :  h,
      port : 443,
      rejectUnauthorized: false,
      path: '/',
      headers: {'Cache-Control':'no-cache', accept: '*/*'}
    };
    var req = https.get(options, function(resp) {
      resp.on('data', function() {} );
      console.log(h + ': ' + resp.statusCode);
    });
    req.on('socket', function(socket) {
      socket.setTimeout(5000);
      socket.on('timeout', function() {
        req.abort();
      });
    });
    req.on('error', function(e) {
      if (e.code == 'EHOSTDOWN' || e.code == 'ETIMEDOUT')
        console.log(h + ': ' + 'DOWN');
      if (e.code == 'ECONNRESET')
        console.log(h + ': ' + 'DROPPED');
    });
  });
  setTimeout(background_ping, 60000);
}

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
  var i = 0;
  hosts.forEach(function (host) {
    var options = {
      hostname :  host.address,
      port : 443,
      rejectUnauthorized: false,
      path: '/',
      headers: {'Cache-Control':'no-cache', accept: '*/*'}
    };
    var req = https.get(options, function(resp) {
      host.status = 'online';
      i++;
      if (i === hosts.length) {
        res.send(hosts);
      }
      resp.on('data', function() {});
    });
    req.on('socket', function(socket) {
      socket.setTimeout(5000);
      socket.on('timeout', function() {
        req.abort();
      });
    });
    req.on('error', function(e) {
      host.status = 'offline';
      i++;
      if (i === hosts.length) {
        res.send(hosts);
      }
    });
  });
}

app.post('/ping_all', ping_all);

if (process.env.PORT) {
  app.listen(process.env.PORT);
} else {
  app.listen(5000, function() {
    console.log('listening...');
  });
}

background_ping();
