var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  expressLayouts = require('express-ejs-layouts'),
  app = express();



app.set("view engine", "ejs");
app.set('layout', 'layout');
// Middleware
app.use(bodyParser.urlencoded());
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));



app.get("/people", function(req, res){
  Person.all(function(err, people) {
    if (!err) {
      res.render("people/index", {people: people});
    } else {
      // maybe create error page with "go back" button
      console.log('There was an error!', err);
    }
  });
});

app.get("/people/new", function(req, res){
  res.render("people/new");
});

app.get("/people/:id", function(req,res){
  var id = Number(req.params.id);

  Person.findBy('id', id, function(err, person) {
    if (err) {
      console.log('There was an error!', err);
    } else {
      res.render("people/show", {person: person});
    }
  });
});

app.get("/people/:id/edit", function(req,res){
  var id = Number(req.params.id);

  Person.findBy('id', id, function(err, person) {
    res.render("people/edit", {person: person });
  });
  
});

app.post("/people", function(req, res){
  var params = req.body.person;

  Person.create(params, function(err, newPerson) {
    console.log(newPerson);
  });
  res.redirect("/people");
});


//this doesn't work at all!!!
app.delete("/people/:id", function(req, res){
  var id = Number(req.params.id);
  console.log('delete is about to find');

  Person.findBy('id', id, function(err, person) {
    console.log('finding in delete');
    person.destroy(function(err) {
      console.log('destroying');
      res.redirect('/people');
    });
  });
  
});

app.put("/people/:id", function(req,res){
  var id = Number(req.params.id);

  Person.findBy('id', id, function(err, person) {

    var params = req.body.person;

   //  console.log(params);
    person.update(params, function(err, _this) {
      console.log('_this: ', _this);
    });
  });

  res.redirect("/people");
});

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
