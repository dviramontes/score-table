var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var FileStore = require('nedb');

var db = new FileStore({filename: './notes.flat', autoload: true});

var app = express();
var jsonParser = bodyParser.json();
var cors = require('cors');

app.use(morgan('combined'));
app.use(cors());


app.get('/api/notes/:id', function (req, res, next) {
	if (req.params.id) {
		db.findOne({'_id': req.params.id}, function (err, doc) {
			if (!err) res.json(doc);
		});
	} else {
		next();
	}
});

app.get('/api/notes', function (req, res, next) {
	var query = req.query.query;
	if(req.query.query){
		db.find({'body': new RegExp(query) }, function (err, doc) {
			if (!err && doc !== null){
				res.json(doc);
			} else{
				res.sendStatus(404);
			}
		});
	}else{
		next();
	}
});


app.get('/api/notes', function (req, res) {
	db.find({}, function (err, docs) { // find all
		if (!err) res.json(docs);
	});
});

app.post('/api/notes', jsonParser, function (req, res) {
	if (req.body) {
		var criteria = req.body;
		db.findOne({
			body: criteria.body
		}, function (err, doc) {
			if (err || doc == null) {
				db.insert(criteria, function (err, doc) {
					if (!err) res.json(doc);
				});
			} else {
				res.end('note found, not posting');
			}
		});
	} else {
		res.sendStatus(400);
	}
});

// start server after flat file is loaded
db.loadDatabase(function (err) {
	if (err) throw err;
	console.log('nedb loaded!!!')
	app.listen(4000);
});

