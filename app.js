var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));



app.get("/people", function(req, res){
  Person.all(function(err, people) {
    if (!err) {
      res.render("people/index", {people: people})
    } else {
      res.send('There was an error!', err);
    }

  });
  
});

app.get("/people/new", function(req, res){
  res.render("people/new");
});

app.get("/people/:id", function(req,res){
  var foundPerson;
  var id = Number(req.params.id);
  Person.findBy('id', id, function(err, person) {
    if (!err) {
      res.render("people/show", {person: person });
    } else {
      res.send('There was an error!', err);
    }
  });
});

app.get("/people/:id/edit", function(req,res){
  res.render("people/edit", {person: {} });
});



app.post("/people", function(req, res){
  res.redirect("/people")
});

app.delete("/people/:id", function(req, res){
  res.redirect("/people");
});

app.put("/people/:id", function(req,res){
  res.redirect("/people");
})

app.listen(3000, function(){
  console.log("THE SERVER IS LISTENING ON localhost:3000");
});
