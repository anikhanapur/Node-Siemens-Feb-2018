var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	var resourceName = req.urlObj.pathname;
	 if (resourceName === '/calculator' && req.method === 'GET'){
		var data = querystring.parse(req.urlObj.query);
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
		next();
	}
}