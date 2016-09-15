var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
var connect        = require('connect');
var methodOverride = require('method-override');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(methodOverride('_method'));

var urlDatabase = {
  "http://localhost:8080/b2xVn2": "http://www.lighthouselabs.ca",
  "http://localhost:8080/9sm5xK": "http://www.google.com"
};

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  let shortURL = generateRandomString()
  let longURL = req.body.longURL
  if (!/^https:\/\//.longURL) longURL = 'https://' + longURL;
  urlDatabase['http://localhost:8080/'+shortURL] = longURL;
  res.redirect ("/urls")
});

app.get("/urls", (req, res) => {
  res.render('urls_obj', { table: urlDatabase});
});

app.get("/:shortURL", (req, res) => {
  let shortURL = 'http://localhost:8080/'+req.params.shortURL;
  let longURL = urlDatabase[shortURL]
  res.redirect(longURL);
});

app.delete("/urls", (req, res) => {

  res.redirect("/urls")
}

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

function generateRandomString(){
let shortURL = Math.random().toString(36).slice(-6);
return shortURL;
};
