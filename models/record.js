var db = require('./db');

function Record(id) {
	this.id = id;
}

Record.all = function(table, callback) {
	console.log("Record.all()")
  db.query("SELECT * FROM " + table,[], function(err, res){
    var allRecords = [];

    res.rows.forEach(function(params) {
      allRecords.push(new Record(params));
    });
    callback(err, allRecords);
  });
};

Record.findBy = function() {

};

Record.create = function() {

};

Record.prototype.update = function() {

};

Record.prototype.delete = function() {
	
};


module.exports = Record;