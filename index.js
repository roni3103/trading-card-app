const express = require('express')

const mongoose = require('mongoose')

const bodyParser = require('body-parser')

const app = express()

// Tell our app where to look for view templates
app.set('views',__dirname + '/views')
app.set('view engine','pug')

// Tell app where to look for the relevant files
app.use(express.static(__dirname + '/public'))

// allow for parsing of request bodies
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Config
var config = require('./config')

var dbMethods = require('./backend/mongoose')
var db = dbMethods.connectToDB(config)
var cardSchema = mongoose.Schema({
	Name: String,
	Collection: String,
	Edition: String,  
	Colour: String,
	spelltype: String,
	creaturetype: String
})
var MyCard = mongoose.model('Card', cardSchema)

app.use(function (req, res, next) {
	// pass db in request to all other handlers
	req.db = db
	next()
})

// Routes - GET
app.get('/', function (req, res) {
	res.render('index', { 
		title: 'MagicKeeper',
		message: 'A simple UI to import cards for storage in db',
		listItems: [
			{item: 'Home', href: ""},
			{item: 'View All Cards', href: '/get-all-cards'},
			{item: 'Amend Cards', href: ""},
			{item: 'Update Card Info', href: ""}
		] 
	})
})

app.get('/get-all-cards', function(req, res){
	MyCard.find({},(function(err, results){
		if(err) console.log('Problem is ',err)
		res.status(200).send({data: results.length})
	}))
})

app.get('/cards/name/:name', function(req, res){
	var nameToFind = req.params.name
	MyCard.find({Name: nameToFind}, function(err, results){
		if(err) console.log(err)
		res.status(200).send({data: results})
	})
})

app.get('/cards/colour/:colour', function(req, res){
	var colourToFind = req.params.colour
	MyCard.find({Colour: colourToFind}, function(err, results){
		if(err) console.log(err)
		res.status(200).send({data: results})
	})
})

app.get('/cards/collection/:deck', function(req, res){
	var deckToFind = req.params.deck
	MyCard.find({Collection: deckToFind}, function(err, results){
		if(err) console.log(err)
		res.status(200).send({data: results})
	})
})

app.get('/cards/type/:spelltype', function(req, res){
	var typeToFind = req.params.spelltype
	MyCard.find({spelltype: typeToFind}, function(err, results){
		if(err) console.log(err)
		res.status(200).send({data: results})
	})
})

app.get('/cards/creatures/:creaturetype', function(req, res){
	var typeToFind = req.params.creaturetype
	MyCard.find({creaturetype: typeToFind}, function(err, results){
		if(err) console.log(err)
		res.status(200).send({data: results})
	})
})

// Routes - POST
app.post('/add/card', function(req, res){
	MyCard.create({Name: req.body.Name, Collection: req.body.Collection, Colour: req.body.Colour}, function(err, results){
		if(err) console.log(err)
		res.status(200).send({inserted: results})
	}) 
})

app.post('/add/collection', function(req, res){
	// as its a post request it gets passed in the body not the params
	var stuffToInsert = require(req.body.deckname);
	
	MyCard.insertMany(stuffToInsert, function(err, results){
		if(err) console.log(err)
		res.status(200).send({inserted: results})
	})
})

const port = process.env.PORT || 3000
app.listen(port)
console.log('app listening on port ', port)
