require('dotenv').config()

var express = require('express')
var app = express()

const { MongoClient } = require('mongodb')
let uri = process.env.SCALINGO_MONGO_URL
console.log(uri)

const client = new MongoClient(uri)

client.connect().then((err, cl) => {
    console.log("reached connect")
    let db = cl.db("ivo")
    db.command({ ping: 1 })
    console.log("Database pinged successfully!")})

  .then((db) => { db.createCollection("phrases") })
    
  .then((db) => { db.listCollections().toArray() })

// .then((docs) => { docs.forEach((doc, id, array) => { console.log(doc.name) })

  .catch((err) => { console.log(err) })  
  .finally(() => {  client.close() })


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
