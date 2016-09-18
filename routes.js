// "use strict";
// var express = require("express");
// var app = express();
// var methodOverride = require('method-override');
// var connect = require('connect');
   const MongoClient = require("mongodb").MongoClient;
   const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.set("view engine", "ejs");
// app.use(express.static('public'));
// app.use(methodOverride('_method'));


function connectAndThen(cb) {
  MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.log('Could not connect! Unexpected error. Details below.');
    throw err;
  }
    cb(err, db);
  });
};

function generateRandomString(){
  let shortURL = Math.random().toString(36).slice(-6);
  return shortURL;
};

function getLongURL(db, shortURL, cb) {
  let query = { "shortURL": shortURL };
  db.collection("url").findOne(query, (err, result) => {
    if (err) {
      return cb(err);
    }
    return cb(null, result.longURL);
  });
}





module.exports = function(app) {

  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  app.get("/index", (req, res)=> {
    connectAndThen(function(err, db) {
      if (err){
        console.log('with errors:' + err);
      }
      console.log("Connected to db then did this!");
      db.collection("url").find().toArray((err, urls) => {
        templateVars = {table: urls}
        debugger;
        res.render("urls_index", templateVars);
    });
  });
  });

  app.post("/urls", (req, res) => {
    let shortURL = generateRandomString()
    let longURL = req.body.longURL
    if (!longURL.match(/^https?:\/\//)) longURL = 'https://' + longURL;
    connectAndThen(function(err, db) {
      db.collection("url").insert({shortURL: shortURL, longURL: longURL});
      res.redirect ("/urls")
    });
  });

  app.get("/urls", (req, res) => {
    connectAndThen(function(err, db) {
      db.collection("url").find().toArray((err, url) => {
      test = {table: url};
      res.render('urls_obj', {table: url});
      });
    });
  });

  app.get("/u/:id", (req, res) => {
    console.log('process has begun')
    let shortURL = req.params.id;
      connectAndThen(function(err, db) {
        getLongURL(db, shortURL, (err, longURL) => {
        console.log('do we have a long: ',longURL);
      res.redirect(longURL);
      });
    });
  });

   app.delete('/urls/:id', (req, res) => {
      let shortURL = req.params.id;
      connectAndThen(function(err, db) {
      db.collection("url").remove({shortURL: shortURL});
      res.redirect('/urls');
      });
    });


   app.put('/urls/:id', (req, res) => {
      let edit = req.body.urledit;
      if (!edit.match(/^https?:\/\//)) {
        edit = 'http://' + edit;
      }
      let shortURL = req.params.id;
      connectAndThen(function(err, db) {
      db.collection("url").update({shortURL: shortURL}, {$set: {longURL: edit}})
        res.redirect('/urls');
      });
    });




};

