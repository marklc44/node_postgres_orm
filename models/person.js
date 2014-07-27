var db = require('./db'),
    inherit = require('./inherit'),
    Record = require('./record');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;

  // Record.call(this, all, findBy, create);
}


// Inherit from Record
inherit(Person, Record);

Person.all = Record.all;

// Tried to set arguments for table and constructor
// no dice.
// Person.all = function(callback) {
//   var Person = Person();
//   var table = 'people';

//   return Record.all(table, Person, callback);
// };

Person.findBy = Record.findBy;
Person.create = Record.create;

module.exports = Person;
