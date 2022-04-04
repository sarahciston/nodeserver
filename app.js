require('dotenv').config()

var express = require('express')
var app = express()

let { MongoClient } = require('mongodb')

let url = process.env.SCALINGO_MONGO_URL
let client = new MongoClient(url)
let DBNAME = 'ivo'
let TABLE = 'phrases'

// async function database(){

//   await client.connect((err) => {
//     console.log("reached connect")
    
//     let db = client.db(DBNAME)
//     let collection = db.collection(TABLE)
//     console.log("reached collection: ", collection.collectionName, db.databaseName)

//     let findResult = await collection.find({}).toArray()
//     console.log('Found documents... ', findResult)

//     client.close()
//   })
// }
// database().catch(console.error)

client.connect().then(() => {
  console.log("reached connect")

  let db = client.db(DBNAME)
  let collection = db.collection(TABLE)
  console.log("reached collection: ", collection.collectionName, db.databaseName)

  // collection.find({}).toArray().then((res) => { console.log(res) })
  // console.log("found above")

  // }).then(() => {
    // client.close()
    // console.log("closed db")
  }).catch(console.error)


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
