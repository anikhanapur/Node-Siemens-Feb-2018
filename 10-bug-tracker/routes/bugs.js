var express = require('express');
var router = express.Router();

var bugsList = [
	{id : 1, name : 'Server communication failure', isClosed : false},
	{id : 2, name : 'Data integrity checks failed', isClosed : true},
	{id : 3, name : 'User actions not recognized', isClosed : false},
]

/* GET users listing. */
router.get('/', function(req, res, next) {
	var viewData = {list : bugsList};
  	res.render('bugs/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('bugs/new');
});

router.post('/new', function(req, res, next){
	var newBugName = req.body.newBugName,
		newBugId = bugsList.reduce(function(result, bug){
			return bug.id > result ? bug.id : result;
		}, 0) + 1;
		newBug = {
			id : newBugId,
			name : newBugName,
			isClosed : false
		};
	bugsList.push(newBug);
	res.redirect('/bugs');
});

router.get('/toggle/:id', function(req, res, next){
	var bugId = parseInt(req.params.id);
	var bugToToggle = bugsList.find(function(bug){
		return bug.id === bugId;
	});
	if (bugToToggle){
		bugToToggle.isClosed = !bugToToggle.isClosed;
	}
	res.redirect('/bugs');
})
module.exports = router;
