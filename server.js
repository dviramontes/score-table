var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var FileStore = require('nedb');

var db = new FileStore({filename: './data.flat', autoload: true});

var app = express();
var jsonParser = bodyParser.json();
var cors = require('cors');

app.use(morgan('combined'));
app.use(cors());

var insertDoc = function (criteria, callback) {
	db.insert(criteria, function (err) {
		if (err) {
			callback(err);
		} else {
			callback('user created');
		}
	});
};

var findAll = function (callback) {
	db.find({}, function (err, docs) { // find all
		if (!err) callback(docs);
	});
};

app.post('/api/post', jsonParser, function (req, res) {
	if (req.body) {
		var criteria = req.body.student;
		db.findOne({
			fname: criteria.fname,
			lname: criteria.lname
		}, function (err, doc) {
			if (err || doc == null) {
				insertDoc(criteria, function (response) {
					console.log(response);
					findAll(function (all) {
						res.json(all);
					});
				})
			} else {
				res.end('student record found, not posting, try clicking on the record itself to modify it');
			}
		});
	} else {
		res.sendStatus(400);
	}
});

app.get('/api/getlist', function (req, res) {
	findAll(function (all) {
		res.json(all);
	});
});

app.put('/api/update', jsonParser, function (req, res) {
	var data = req.body.data;
	var key  = req.body.type;
	db.findOne({'_id': req.body.id}, function (err, doc) {
		doc[key] = data;
		db.update({'_id': req.body.id}, doc, {}, function (err, numReplaced) {
			res.sendStatus(200);
		});
	});
});

// start server after file.flat is loaded
db.loadDatabase(function (err) {
	if (err) throw err;
	console.log('nedb laoded!!!')
	app.listen(4000);
});

