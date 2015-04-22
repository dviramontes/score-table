var superagent = require('superagent');
var expect = require('expect.js');

describe('express notes api spec', function () {
	var noteId;
	var noteBody = {
		body: 'forget to forget the milk!' + new Date()
	};
	it('post a note', function (done) {
		superagent.post('http://localhost:4000/api/notes')
			.send(noteBody)
			.end(function (err, res) {
				expect(res.body).to.ok; // is defined;
				noteId = res.body['_id'];
				done();
			});
	});
	it('get all notes', function (done) {
		superagent.get('http://localhost:4000/api/notes')
			.end(function (err, res) {
				expect(res.body).to.ok;
				expect(res.body).to.be.an('array');
				done();
			});
	});
	it('get a specific note, with provided id', function (done) {
		superagent.get('http://localhost:4000/api/notes/' + noteId)
			.end(function (err, res) {
				expect(res.body['_id']).to.equal(noteId);
				expect(res.body).to.ok;
				done();
			});
	});
	it('get a specific note, with query= passed in', function (done) {
		superagent.get('http://localhost:4000/api/notes?query=forget')
			.end(function (err, res) {
				expect(res.body.length).to.be.above(0);
				done();
			});
	});
});
