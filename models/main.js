var Person = require('./person');
var Record = require('./record');

var Models = {};

Models.Person = Person;


// For testing

var steve = {firstname: 'Steve', lastname: 'Jones'};

// Models.Person.create(steve, function(newPerson) {
// 	console.log(newPerson);
// });

Models.Person.findBy('people', Person, 'id', 4, function(err, person) {
	console.log(person);
});

// Models.Person.all('people', Person, function(err, people){
//   console.log(people);
// });

var max = new Person('max', 'doe');
console.log(max.destroy);
// console.log(max instanceof Record);

// Models.Person.findBy('id', 5, function(err, person) {
// 	console.log(person);
// 	person.destroy(function(err) {
// 		console.log(err);
// 	});
// })

// Models.Person.findBy("id", 1, function(err, person){
//   console.log("found", person);
//   person.update({firstname: "sam", lastname: "creek"}, function(err, person){
//     console.log("UPDATED:", person)
//   });
// });

module.exports = Models;	