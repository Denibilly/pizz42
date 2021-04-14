/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const app = express();
const serveStatic = require("serve-static")

var port = process.env.PORT || 3000;

app.use(morgan("dev"));

/*
app.use(express.static(join(__dirname, "dist")));
app.use((_, res) => {
  res.sendFile(join(__dirname, "dist", "index.html"));
});
*/

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/dist/index.html'))
})

app.listen(port, () => console.log("Listening on port "+port));
