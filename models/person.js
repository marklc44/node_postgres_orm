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
Person.findBy = Record.findBy;
Person.create = Record.create;

module.exports = Person;
