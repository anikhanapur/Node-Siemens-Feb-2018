var path = require('path'),
	fs = require('fs');

var staticExtns = ['.html', '.css', '.js', '.xml', '.ico', '.png', '.json'];

function isStatic(resourceName){
	return staticExtns.indexOf(path.extname(resourceName)) !== -1;
}

module.exports = function(publicFolderPath){
	return function(req, res, next){
		var resourceName = req.urlObj.pathname;
		if (isStatic(resourceName)){
			var resourcePath = path.join(publicFolderPath, resourceName);
			if (!fs.existsSync(resourcePath)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resourcePath).pipe(res);
		} else {
			next();
		}
	}
}