var fs = require('fs');
var http = require('http');
var path = require('path');
var url = require('url');

var port = process.argv[2] || 9001;
var appDir = '/var/node/';

var files = fs.readdirSync(appDir);
// drop files that aren't directories containing "app.js"
files.filter(function(file) {
  return (fs.statSync(appDir+file).isDirectory() && 
      path.existsSync(appDir+file+'/app.js'));
});

http.createServer(function(req, res) {
  for (var i=0, l=files.length; i<l; i++) {
    if (files[i] == req.headers.host) {
      require(appDir+files[i]+'/app').respond(req, res);
      return;
    }
  }
  // no hostname match
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>404 Not Found</h1>');
}).listen(port);

console.log('Running on port '+port);
