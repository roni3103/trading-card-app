const express = require('express');

const mongoose = require('mongoose');

const app = express();

// Tell our app where to look for view templates
app.set('views',__dirname + '/views');
app.set('view engine','pug');

// Tell app where to look for the relevant files
app.use(express.static(__dirname + '/public'))

// Config
var config = require('./config');

var dbMethods = require('./backend/mongoose');
var db = dbMethods.connectToDB(config);
var cardSchema = mongoose.Schema({
  Name: String,
  Collection: String,
  Edition: String,
  Colour: String,
  spelltype: String
});
var MyCard = mongoose.model('Card', cardSchema)

app.use(function (req, res, next) {
  // pass db in request to all other handlers
  req.db = db;

  next();
});

// Routes
app.get('/', function (req, res) {
  res.render('index', { title: 'Welcome', message: 'The MagicKeeper welcomes you' })
})

app.get('/get-all-cards', function(req, res){
  MyCard.find({},(function(err, results){
    if(err) console.log('Problem is ',err);
    res.send(200, {data: results})
  }))
});

app.get('/cards/name/:name', function(req, res){
  var nameToFind = req.params.name;
  MyCard.find({Name: nameToFind}, function(err, results){
    if(err) console.log(err)
    res.send(200, {data: results})
  })
})

app.get('/cards/colour/:colour', function(req, res){
  var colourToFind = req.params.colour;
  MyCard.find({Colour: colourToFind}, function(err, results){
    if(err) console.log(err)
    res.send(200, {data: results})
  })
})

app.get('/cards/collection/:deck', function(req, res){
  var deckToFind = req.params.deck;
  MyCard.find({Collection: deckToFind}, function(err, results){
    if(err) console.log(err)
    res.send(200, {data: results})
  })
});

app.get('/cards/type/:spelltype', function(req, res){
  var typeToFind = req.params.spelltype;
  MyCard.find({spelltype: typeToFind}, function(err, results){
    if(err) console.log(err)
    res.send(200, {data: results})
  })
})

app.get('/cards/creatures/:creaturetype', function(req, res){
  var typeToFind = req.params.creaturetype;
  MyCard.find({creaturetype: typeToFind}, function(err, results){
    if(err) console.log(err)
    res.send(200, {data: results})
  })
})

const port = process.env.PORT || 3000
app.listen(port)
console.log('app listening on port ', port)
