var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	var resourceName = req.urlObj.pathname;
	 if (resourceName === '/calculator'){
	 	var data = req.method === 'GET' ? req.query : req.body;
	 	var op = data.op,
			x = parseInt(data.x, 10),
			y = parseInt(data.y, 10),
			result = calculator[op](x,y);

		res.write(result.toString());
		res.end();
	 } else {
		next();
	}
}