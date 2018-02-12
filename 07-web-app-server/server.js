var http = require('http'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	fs = require('fs'),
	calculator = require('./calculator');

var staticExtns = ['.html', '.css', '.js', '.xml', '.ico', '.png', '.json'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) !== -1;
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url === '/'? '/index.html' : req.url ),
		resourceName = urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	} else if (resourceName === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(urlObj.query);
		var op = data.op,
			x = parseInt(data.x, 10),
			y = parseInt(data.y, 10),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
	} else if (resourceName === '/calculator' && req.method === 'POST'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var data = querystring.parse(rawData);
			var op = data.op,
				x = parseInt(data.x, 10),
				y = parseInt(data.y, 10),
				result = calculator[op](x,y);

			res.write(result.toString());
			res.end();
		});
	} else {
		res.statusCode = 404;
		res.end();
		return;
	}
});
server.listen(8080);