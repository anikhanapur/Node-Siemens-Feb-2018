var http = require('http'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');


var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	if (urlObj.pathname !== '/calculator'){
		res.statusCode = 404;
		res.end();
		return;
	}
	var data = querystring.parse(urlObj.query);
	var op = data.op,
		x = parseInt(data.x, 10),
		y = parseInt(data.y, 10),
		result = calculator[op](x,y);

	res.write(result.toString());
	res.end();
});

server.listen(8080);