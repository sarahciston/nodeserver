/**
 * @author Léo Unbekandt
 */

var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient;
var url = "MONGO_URL"

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var base = db.db("ivo")
  console.log("Database made!")
  base.createCollection("phrases", function(err, res) {
    if (err) throw err;
    console.log("collection created");
  })
  db.close()
})

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', {});
})

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('App listening at http://%s:%s', host, port)
})
