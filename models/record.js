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

Record.findBy = function(table, key, val, callback) {
  console.log("Person.findBy() " + key + ", " + val);
  db.query("SELECT * FROM " + table + " WHERE " + key + "=$1", [val], function(err, res){
    var foundRow, foundRecord;
    foundRow = res.rows;
    foundRow.forEach(function(params) {
      foundRecord = new Record(params);
    });
    callback(err, foundRecord);
  });
};

Record.create = function() {

};

Record.prototype.update = function() {

};

Record.prototype.delete = function() {

};


module.exports = Record;