require('dotenv').config()

var express = require('express')
var app = express()

const { MongoClient } = require('mongodb')
let uri = process.env.SCALINGO_MONGO_URL
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true })

client.connect().then((err, client) => {
  console.log("reached connect")

  client.command({ ping: 1 })
  console.log("Database pinged successfully!")

  client.close()

  }).catch((err) => { console.log(err) })

  // const collection = client.db('ivo').createCollection('phrases')

  // .then((db) => { db.createCollection("phrases") })
    
  // .then((db) => { db.listCollections().toArray() })

// .then((docs) => { docs.forEach((doc, id, array) => { console.log(doc.name) })



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
