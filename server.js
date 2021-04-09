var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 3001;

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-2h53iakd.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://localhost:3001/api/external',
  issuer: 'https://dev-2h53iakd.eu.auth0.com/',
  algorithms: ['RS256']
});

app.get('/api/external', jwtCheck, function (req, res) {
    res.send('Secured Resource');
});

app.post('/api/external', jwtCheck, function (req, res) {
    res.send('Secured Resource');
});

app.listen(port, () => console.log("Listening on port "+port));