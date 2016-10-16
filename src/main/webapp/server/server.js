var process = require('process');
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var expServer = express();
var PORT = process.env.PORT || 3000;


var errorHandler = function(err, req, res, next) {
    var code = err.code;
    var message = err.message;
    res.writeHead(code, message, {'content-type' : 'text/plain'});
    res.end(message);
}

var options = {
  index: "index.html"
};

console.log('Root directory: ' + process.cwd());
expServer.use(express.static(process.cwd(), options));
expServer.use(bodyParser.json());
expServer.use(errorHandler);

expServer.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	}).on('error', function(err){
		throw new Error('Unable to start Express server: ' + err);
});

expServer.get('/', function(req, res) {
	res.send('App Root');
});


