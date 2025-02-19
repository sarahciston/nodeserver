require('dotenv').config()

var express = require('express')
var app = express()
let fs = require('fs')


// DATABASE


let DB_URL = process.env.SCALINGO_MONGO_URL

let { MongoClient } = require('mongodb')

let client = new MongoClient(DB_URL)
let DBNAME = 'ivo'
let TABLE = 'phrases'

client.connect()
  .then(() => {
    console.log("reached connect")

    let db = client.db(DBNAME)
    let collection = db.collection(TABLE)
    console.log("reached collection: ", collection.collectionName, db.databaseName)

    // collection.find({}).toArray().then((res) => { console.log(res) })
    // console.log("found above")

    db.listCollections().toArray().then((res) => {
      console.log("a list of tables: ", res)
    }).catch(console.error)

    // .then((docs) => { docs.forEach((doc, id, array) => { console.log(doc.name) })
  
  }).catch(console.error)

// ROUTING

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




// //ELASTIC SEARCH ATTEMPT

// let DB_URL = process.env.SCALINGO_ELASTICSEARCH_URL
// let DB_USER = process.env.DB_USER
// let DB_PW = process.env.DB_PW

// const { Client } = require ('@elastic/elasticsearch')
// const client = new Client({
//   node: DB_URL,
//   auth: { username: DB_USER,
//           password: DB_PW
//         }
//   //       ,
//   // tls: {
//   //   ca: fs.readFileSync('elastic/ca.pem'),
//   //   rejectUnauthorized: false
//   // }
// })

// client.info()
//   .then(res => console.log(res))
//   .catch(err => console.error(err))

// async function elastic(){
//   console.log("reached elastic")

//   await client.index({
//     index: 'kind-phrases',
//     document: {
//       text: 'you are amazing',
//     }
//   })

//   await client.index({
//     index: 'kind-phrases',
//     document: {
//       text: 'keep your chin up',
//     }
//   })

//   console.log("indexed")

//   await client.indices.refresh({ index: 'kind-phrases' })

//   let result = await client.search({
//     index: 'kind-phrases',
//     query: {
//       match: { text: 'keep' }
//     }
//   })
//   console.log(result.hits.hits)
// }
// elastic().catch(console.error)
