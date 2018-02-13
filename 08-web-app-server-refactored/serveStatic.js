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
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		//fs.createReadStream(resourcePath).pipe(res);
		var stream = fs.createReadStream(resourcePath);

		stream.on('data', function(chunk){
			console.log('serving file from serveStatic');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('ending response from serveStatic');
			res.end();
		})
	}
}