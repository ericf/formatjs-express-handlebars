'use strict';

var http = require('http');
var app  = require('./app');

http.createServer(app).listen(app.get('port'), function () {
    console.log('%s server listening on: %d', app.get('name'), app.get('port'));
});
