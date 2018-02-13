var bugsList = [
	{id : 1, name : 'Server communication failure', isClosed : false},
	{id : 2, name : 'Data integrity checks failed', isClosed : true},
	{id : 3, name : 'User actions not recognized', isClosed : false},
]

function getAll(callback){
	setTimeout(function(){
		callback(bugsList);
	}, 3000);
}

function get(id){
	var result = bugsList.find(function(bug){
		return bug.id === parseInt(req.params.id);
	});
	return result;
}

function addNew(bugData){
	var newBug = bugData,
		newBugId = bugsList.reduce(function(result, bug){
			return bug.id > result ? bug.id : result;
		}, 0) + 1;
	newBug.id = newBugId;
	bugsList.push(newBug);
	return newBug;
}

function update(bugToUpdate){
	bugsList = bugsList.map(function(bug){
		if (bug.id === bugToUpdate.id){
			return bugToUpdate;
		} else {
			return bug;
		}
	});
	return bugToUpdate;
}

function remove(id){
	bugsList = bugsList.filter(function(bug){
		return bug.id !== id;
	});
}

module.exports = {
	getAll : getAll,
	get : get,
	addNew : addNew,
	update : update,
	remove : remove
};