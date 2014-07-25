var db = require('./db');

function Person(params) {
  this.firstname = params.firstname;
  this.lastname = params.lastname;
  this.id = params.id;
};


Person.all = function(callback){

  db.query("SELECT * FROM people",[], function(err, res){
    var allPeople = [];
    res.rows.forEach(function(params) {
      allPeople.push(new Person(params));
    });
    callback(err, allPeople);
  });
}

// shield sql
// with values like this $1, $2... and ['value1', 'value2']
// so code in form submits can't inject sql
// db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *", ["The Great Gatsby", "Fitzgerald"])

Person.findBy = function(key, val, callback) {
  // build statements
  db.query("SELECT * FROM people WHERE " + key + "=$1",[val], function(err, res){
    var foundRow, foundPerson;
    // do something here with res
    callback(err, foundPerson);
  });
};



Person.create = function(params, callback){
  db.query("INSERT INTO people(firstname, lastname) VALUES ($1, $2) RETURNING *", [params.firstname, params.lastname], function(err, res){
    var createdRow, newPerson;
    callback(err, newPerson);
  });
};

Person.prototype.update = function(params, callback) {
  var colNames = [];
  var colVals = [];
  var count = 2;

  for(var key in this) {
    if(this.hasOwnProperty(key) && params[key] !== undefined){
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

Person.prototype.destroy = function(){
  db.query("DELETE * FROM people WHERE id=$1", [this.id], function(err, res) {
    callback(err);
  });
}

module.exports = Person;
