var db = require('./db');

function Record() {
	this.id;
}

Record.all = function(table, constructor, callback) {
	console.log("Record.all()")
  db.query("SELECT * FROM " + table, [], function(err, res){
    var allRecords = [];
    res.rows.forEach(function(params) {
      allRecords.push(new constructor(params));
    });
    // somehow this is undefined
    callback(err, allRecords);
  });
};

Record.findBy = function(table, constructor, key, val, callback) {
  console.log("Person.findBy() " + key + ", " + val);
  db.query("SELECT * FROM " + table + " WHERE " + key + "=$1", [val], function(err, res){
    var foundRow, foundRecord;
    foundRow = res.rows;
    foundRow.forEach(function(params) {
      foundRecord = new constructor(params);
    });
    callback(err, foundRecord);
  });
};

Record.create = function(constructor, params, callback){

	var colNames = [];
	var colVals = [];
	var placeholders = [];
	var count = 1;

	for (key in params) {
		colNames.push(key);
		colVals.push(params[key]);
		placeholders.push('$' + count);
		count++;
	}

  db.query("INSERT INTO people(" + colNames.join(", ") + ") VALUES (" + placeholders.join(", ") + ") RETURNING *", colVals, function(err, res){
    var createdRow, newRecord;
   
    callback(err, newRecord);
  });
};

// Record.create = function(table, constructor, params, callback){
//   db.query("INSERT INTO " + table + "(firstname, lastname) VALUES ($1, $2) RETURNING *", [params.firstname, params.lastname], function(err, res){
//     var createdRow, newPerson;
//     res.rows.forEach(function(row) {
//       newPerson = new Person(row.firstname, row.lastname);
//     });
//     callback(err, newPerson);
//   });
// };

Record.prototype.update = function(table, params, callback) {
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
  var statement = "UPDATE " + table + " SET " + colNames.join(", ") + " WHERE id=$1 RETURNING *";
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

Record.prototype.destroy = function(table, callback){
  db.query("DELETE FROM " + table + " WHERE id=$1", [this.id], function(err, res) {
    callback(err);
  });
}


module.exports = Record;