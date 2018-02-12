//create an object 'calculator' with the following methods
// add, subtract, multiply, divide - each accepting x & y as arguments
//invoke all the above methods for x = 100 and y = 200 and print the result

var calculator = {
	add : function(x,y){
		return x + y;
	},
	subtract : function(x,y){
		return x - y;
	},
	multiply : function(x,y){
		return x * y;
	},
	divide : function(x,y){
		return x / y;
	}
}

var x = 100,
	y = 200;

console.log(calculator.add(x,y));
console.log(calculator.subtract(x,y));
console.log(calculator.multiply(x,y));
console.log(calculator.divide(x,y));