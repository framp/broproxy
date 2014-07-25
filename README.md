broproxy
=========

A small and simple node.js library to proxy a request to another URL.

It's not a full-featured http proxy like [node-http-proxy](https://github.com/nodejitsu/node-http-proxy).
It's not perfect, it's a little dumb - but it's friendly and let you do cool stuff with just a line.

    var broproxy = require('broproxy');
    ...
    router.get(function(req, res, next){
      broproxy(req.query.url, req, res);
    });
    ...
    
    
Feel free to mingle with the request before handing over the proxying stuff to broproxy
    
    ...
    router.get(function(req, res, next){
      var url = req.query.url;
      delete req.query.url;
      req.query.forward = true
      req.headers['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      broproxy(url, req, res);
    });
    ...

Why another proxy?
====
The idea was to pass a req.query.url parameter and have the proxy do everything else for you.
I failed at achieving that with existing solution and, given how simple is to create a proxy with node, I went on and created a module

License
====
MIT