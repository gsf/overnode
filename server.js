var fs = require('fs');
var http = require('http');
var url = require('url');

var port = process.argv[2] || 9001;
var appDir = '/var/node/';

var files = fs.readdirSync(appDir);
files.filter(function(file) {
  return (fs.statSync(appDir+file).isDirectory() && 
      path.existsSync(appDir+file+'/app.js'));
});

http.createServer(function(req, res) {
  var hostname = url.parse(req.url).hostname;
  for (var i=0, l=files.length; i<l; i++) {
    if (files[i] == hostname) {
      require(appDir+files[i]+'app').respond(req, res);
      break;
    }
  }
}).listen(port);

console.log('Running on port '+port);
