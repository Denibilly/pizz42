
var path = require('path');
var express = require("express");

var port = process.env.PORT || 5001;
var app = express();

app.use(express.static(__dirname + '/dist/'));

//handle any errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// Render the app
app.get('/.*/',function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});


//start server
app.listen(port, function() {
  console.log("Listening on " + port);
});
