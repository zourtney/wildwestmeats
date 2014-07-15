//
// Start the HTTP server
//
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json())
app.listen(process.env.PORT || 3000);


//
// Create the default data set
//
require('./server/defaults');


//
// Append all routes (REST API)
//
require('./server/api')(app);