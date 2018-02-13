var express = require('express');
var router = express.Router();
var bugService = require('../services/bugService');


/* GET users listing. */
router.get('/', function(req, res, next) {
	//Sync
	/*
	var bugs = bugService.getAll()
	res.json(bugs);
	*/

	//async
	bugService.getAll(function(bugs){
		res.json(bugs);
	});
});

router.get('/:id', function(req, res, next) {
	res.json(bugService.get(parseInt(req.params.id)));
});

router.post('/', function(req, res, next){
	let newBug = bugService.addNew(req.body);
	res.statusCode = 201;
	res.json(newBug);
});

router.put('/:id', function(req, res, next){
	var bugToUpdate = req.body;
	return bugService.update(bugToUpdate);
});

router.delete('/:id', function(req, res, next){
	bugService.remove(parseInt(req.params.id));
	res.json({});
});

module.exports = router;
