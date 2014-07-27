var db = require('./db'),
    inherit = require('./inherit'),
    Record = require('./record');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;

}


// Inherit from Record
inherit(Person, Record);

Person.all = function(callback) {
  var Person = this;
  var table = 'people';

  Record.all(table, Person, callback);
};

Person.findBy = function(val, callback) {
	var Person = this;
	var table = 'people';
	var id = 'id';

	Record.findBy(table, Person, id, val, callback);
};

Person.create = function(params, callback) {
	var Person = this;
	var table = 'people';

	Record.create(table, Person, params, callback);
};

module.exports = Person;
