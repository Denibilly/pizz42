/**
 * Required External Modules
 */
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const helmet = require("helmet");
const axios = require('axios').default;
const cors = require('cors');

/**
 * App Variables
 */
var app = express();
var port = process.env.PORT || 5000;

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(cors({ origin: ["http://localhost:5001", "https://pizz42.herokuapp.com/"] }));
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
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.post('/api/external', jwtCheck, async function (req, res) {
  let historyUpdated = await getToken().then(
    (response) => {
      return updateData(req.body.data.userId, req.body.data.cart, req.body.data.history, response.access_token).then(
        result  => {
          console.log(result);
          return result;
        }
      )
    }
  );
  console.log("History updated "+JSON.stringify(historyUpdated));
  res.send(historyUpdated);
});

async function getToken() {
  var options = {
    method: 'POST',
    url: 'https://dev-2h53iakd.eu.auth0.com/oauth/token',
    headers: { 'content-type': ' application/json', 'Access-Control-Allow-Origin': 'http://localhost:5001' },
    data: {
      grant_type: 'client_credentials',
      //client_id: process.env.CLIENT_ID,
      //client_secret: process.env.CLIENT_SECRET,
      client_id: "KONoVylUyfZMiHq5rbxdI0sKA4DA8LY8",
      client_secret: "C240RtIxmKwzROyu9-swpx7fEXxIE3R7nXSeGIW_X77hPFajGxjnWQdynM4UEfja",
      audience: 'https://dev-2h53iakd.eu.auth0.com/api/v2/'
    }
  };

  return axios.request(options).then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
}

async function updateData(userId, cart, history, token) {
  if (history) {
    let newIndex = history[history.length - 1].index + 1;
    history.push({ index: newIndex, date: getDate(), cart});
  }
  else {
    history = [{ index: 0, date: getDate(), cart }];
  }

  var options = {
    method: 'PATCH',
    url: 'https://dev-2h53iakd.eu.auth0.com/api/v2/users/' + userId,
    headers: { authorization: 'Bearer ' + token, 'content-type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5001' },
    data: {
      user_metadata: {
        "orderHistory": history
      }
    }
  };

  return axios.request(options).then(function (response) {
    return history;
  }).catch(function (error) {
    console.error(error);
  });
}

function getDate(){
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // prints date in YYYY-MM-DD format
  return date + "-" + month + "-" + year + " " + hours + ":" + ("0" + minutes).slice(-2);
};


app.listen(port, () => console.log("API Server listening on port " + port));