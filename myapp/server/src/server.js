/* Our front line of communication, clients will access this page first for any requests */

const express = require('express');
var cors = require('cors')
const MongoClient  = require('mongodb').MongoClient;//Used to create database for information to go to, online resource.
const db = require('./db.js');//Used to link to the config of DataBase
//var database_router = require.resolve('database_route.js');
const bodyParser = require('body-parser');
var app = express();
const port = 5000;
const response = require('./response.js');
const handleListen = require('./handleListen.js');

app.use(cors());

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));



console.log("Hello");
// Let app start listening to port, will output error if anything goes wrong
const client = new MongoClient(db.uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("openSourceRepos").collection("openSourceRepos");
  const { assessmentRoutes, initAssessmentRoutes } = require('./database.js');
  initAssessmentRoutes({db : collection});
  if (err) return console.log(err)
   app.use('/dbRoute', assessmentRoutes);
});

app.listen( port, handleListen(console.log, port) );      
  //app.get('/', response.hello);
  //app.get( '/express_backend', response.express_backend);


// Our API and their approtiate functions



