/**
 * Required External Modules
 */
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const helmet = require("helmet");
const cors = require('cors');
const jwtAuthz = require('express-jwt-authz');

/**
 * App Variables
 */
var app = express();
var port = process.env.PORT || 4040;

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(cors({ origin: "http://localhost:5001" }));
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//const checkScopes = jwtAuthz([ 'order:pizza' ]);

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
    res.send(req.body.data);
});

app.listen(port, () => console.log("API Server listening on port "+port));