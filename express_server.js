"use strict";
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
var connect = require('connect');
var methodOverride = require('method-override');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride('_method'));
var routes = require("./routes")(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


