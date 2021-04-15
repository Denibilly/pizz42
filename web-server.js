
var path = require('path');
var express = require("express");
const morgan = require("morgan");

var appDir = path.dirname(require.main.filename);
var port = process.env.PORT || 5001;
var app = express();


app.use(morgan("dev"));
app.use(express.logger());
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.static(path.join(appDir, '/dist'), { maxAge: 86400000 }));

console.log("APP DIR ---> "+appDir)

//handle any errors
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});

// Render the app
app.get('/',function(req, res){//get,put,post,delete   
  res.sendFile(appDir + '/index.html');
});

//start server
app.listen(port, function() {
  console.log("Listening on " + port);
});
