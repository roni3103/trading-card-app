const express = require('express');

const mongoose = require('mongoose')

// const stylus = require('stylus');

const app = express();

// Tell our app where to look for pages
app.set('views',__dirname + '/views');
app.set('view engine','pug');

// function compile(str, path) {
//   return stylus(str).set('filename', path);
// }

// Tell our middleware where to look for css
// app.use(stylus.middleware({
//   src: __dirname + '/public',
//   compile:compile
// }))

// Tell app where to look for the relevant files
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.render('index', { title: 'Welcome', message: 'The MagicKeeper welcomes you' })
})

const port = process.env.PORT || 3000
app.listen(port)
console.log('app listening on port ', port)
