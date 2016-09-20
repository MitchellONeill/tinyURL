const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";

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
    debugger;
    if (err) {
      return cb(err);
    }
    return cb(err, result.longURL);
  });
}


module.exports = function(app) {

  app.get("/", (req, res) => {
   res.redirect("/urls/new");
  });

  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  app.get("/index", (req, res)=> {
    connectAndThen(function(err, db) {
      console.log("Connected to db then did this!");
      db.collection("url").find().toArray((err, urls) => {
        res.render("urls_index", {table: urls});
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
    let shortURL = req.params.id;
    console.log('youve been redirected');
      connectAndThen(function(err, db) {
        getLongURL(db, shortURL, (err, longURL) => {
          res.redirect(301, longURL);
      });
    });
  });

  app.get("/urls/:id", (req, res) => {
    let shortURL = req.params.id;
    let query = { "shortURL" : shortURL};
    connectAndThen(function(err, db) {
      db.collection("url").findOne(query, (err, url) => {
      if (err) {
        return cb(err);
      }
      res.render('urls_id', url);
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

