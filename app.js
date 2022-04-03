/**
 * @author Léo Unbekandt
 */

var express = require('express')
var app = express()

var MongoClient = require('mongodb').MongoClient;
var url = SCALINGO_MONGO_URL

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database made!")
  console.log(db.name)
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
