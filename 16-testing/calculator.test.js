var calculator = require('./calculator');

test("add", function(){
	//arrange
	var x = 100,
		y = 200,
		expectedResult = 300;

	//act
	var result = calculator.add(x,y);

	//assert
	expect(result).toBe(expectedResult);
});

test("subtract", function(){
	var x = 100,
		y = 50,
		expectedResult = 50;

	var mockCallback = jest.fn();

	calculator.subtract(x, y, mockCallback);

	expect(mockCallback.mock.calls.length).toBe(1);
	expect(mockCallback.mock.calls[0][0]).toBe(50);
});