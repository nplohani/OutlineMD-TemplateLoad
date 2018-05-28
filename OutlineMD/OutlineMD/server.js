console.log('OutlineMD');


const express = require('express');
const bodyParser = require('body-parser');

//create express app
const app = express();

//parse requests of content-type 
app.use(bodyParser.urlencoded({extended: true}));

//parse requests of content-type
app.use(bodyParser.json());
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/app', express.static(__dirname + '/app'));

//Configure the database
const dbConfig = require('./config/dbConfig.js');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

//Connecting to the database
mongoose.connect(dbConfig.url).then(()=>{
    console.log('Successfully connected to database');
}).catch(err => {
    console.log('Could not connect to database, Exiting now...');
    process.exit();
});

//define a simple route
app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/views/master-template-list.html');
});

//Require template routes
require('./app/routes/routes.js')(app);

//listem for port request
app.listen(3000, ()=> {
    console.log("server is listening to port 3000..");
});



