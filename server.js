var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var port = process.argv[2] || 9001;
var appDir = '/var/node/';

var files = fs.readdirSync(appDir), apps = {};
for (var i=0, l=files.length; i<l; i++) {
  // only include directories containing "app.js"
  if (path.existsSync(appDir+files[i]+'/app.js')) {
    apps[files[i]] = require(appDir+files[i]+'/app');
  }
}

http.createServer(function(req, res) {
  var app = apps[req.headers.host];
  if (app) {
    app.respond(req, res);
  } else { // no hostname match
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>404 Not Found</h1>');
  }
}).listen(port);

console.log('Running on port '+port);
