var http = require('http');
var url = require('url');

module.exports = function(link, req, res){
  var target = url.parse(link);
  target.port = target.port || 80;
  if (!target.host || !target.protocol || !target.href)
      throw "broproxy need at least a valid URL to do something";
  target.agent = new http.Agent({ 
    host: target.host, 
    port: target.port, 
    maxSockets: 1
  });
  target.path = target.href;
  target.headers = req.headers;
  target.method = req.method;
  
  var proxyReq = http.request(target, function (proxyRes) {
    proxyRes.addListener('data', function(chunk) {
      res.write(chunk, 'binary');
    });
    proxyRes.addListener('end', function() {
      res.end();
    });
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
  });
  req.addListener('data', function(chunk) {
    proxyReq.write(chunk, 'binary');
  });
  req.addListener('end', function() {
    proxyReq.end();
  });
}