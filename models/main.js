var Person = require('./person');

var Models = {};

Models.Person = Person;

var steve = {firstname: 'Steve', lastname: 'Jones'};
console.log(steve);
Models.Person.create(steve, function(newPerson) {
	console.log(newPerson);
});

// Models.Person.findBy(firstname, 'Max', function() {
// 	max = new Person()
// });

Models.Person.all(function(err, people){
  console.log(people);
});

// For testing

// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// })

module.exports = Models;	