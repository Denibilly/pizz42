

app.listen(port, () => console.log("Listening on port "+port));

var path = require('path');
var express = require("express");
const morgan = require("morgan");
var app = express();

var port = process.env.PORT || 5001;

app.use(morgan("dev"));
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static(join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, '../dist'), { maxAge: 86400000 }));

//handle any errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// Render the app
app.get('/',function(req, res){//get,put,post,delete   
  res.sendFile(__dirname + '../dist/index.html');
});

//start server
app.listen(port, function() {
  console.log("Listening on " + port);
});
