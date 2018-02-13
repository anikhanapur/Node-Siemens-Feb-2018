var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.xml', '.ico', '.png', '.json'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) !== -1;
}

module.exports = function(req, res){
	var resourceName = req.urlObj.pathname;
	if (isStatic(resourceName)){
		var resourcePath = path.join(__dirname, resourceName);
		console.log(resourcePath + ' exists ? -> ', fs.existsSync(resourcePath));
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath).pipe(res);
	}
}