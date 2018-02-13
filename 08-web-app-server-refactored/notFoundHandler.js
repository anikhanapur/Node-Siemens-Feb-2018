module.exports = function(res){
	console.log('ending response from notFoundHandler');
	res.statusCode = 404;
	res.end();
	return;
}