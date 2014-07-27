var db = require('./db'),
    inherit = require('./inherit'),
    Record = require('./record');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;


};

// Inherit from Record
inherit(Person, Record);

Person.all = Record.all;

Person.findBy = function(table, key, val, callback) {
  Record.findBy(table, key, val, callback);
};

// Person.findBy = function(key, val, callback) {
//   console.log("Person.findBy() " + key + ", " + val);
//   db.query("SELECT * FROM people WHERE " + key + "=$1", [val], function(err, res){
//     var foundRow, foundPerson;
//     foundRow = res.rows;
//     foundRow.forEach(function(params) {
//       foundPerson = new Person(params);
//     });
//     callback(err, foundPerson);
//   });
// };

Person.create = function(params, callback){
  db.query("INSERT INTO people(firstname, lastname) VALUES ($1, $2) RETURNING *", [params.firstname, params.lastname], function(err, res){
    var createdRow, newPerson;
    res.rows.forEach(function(row) {
      newPerson = new Person(row.firstname, row.lastname);
    });
    callback(err, newPerson);
  });
};

Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
      console.log('from prototype: ', params);
      var colName = key + "=$" + count;
      colNames.push(colName);
      colVals.push(params[key]);
      count++;
    }
  }

  // This is a model for what to do with other methods
  var statement = "UPDATE people SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
  var values = [this.id].concat(colVals);
  console.log("Running:");
  console.log(statement, "with values", values);
  var _this = this;
  db.query(statement, values, function(err, res) {
    var updatedRow;
    if(err) {
      console.error("OOP! Something went wrong!", err);
    } else {
      updatedRow = res.rows[0];
      _this.firstname = updatedRow.firstname;
      _this.lastname = updatedRow.lastname;
    }
    callback(err, _this)
  });
}

Person.prototype.destroy = function(callback){
  db.query("DELETE FROM people WHERE id=$1", [this.id], function(err, res) {
    callback(err);
  });
}

module.exports = Person;
