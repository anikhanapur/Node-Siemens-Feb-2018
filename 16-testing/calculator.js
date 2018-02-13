module.exports = {
	add : function(x,y){
		return x + y;
	},
	subtract : function(x,y, callback){
		callback(x - y);
	}
};