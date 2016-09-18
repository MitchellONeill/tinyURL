"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/url_shortener";

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    console.log('Could not connect! Unexpected error. Details below.');
    throw err;
  }

  console.log('Connected to the database!');
  let collection = db.collection("url");

  console.log('Retreiving documents for the "test" collection...');
  collection.find().toArray((err, results) => {
    console.log('results: ', results);

    console.log('Disconnecting from Mongo!');
    db.close();
  });
});

// ////Mongo function Example!
// function connectAndThen(cb){

//   MongoClient.connect(MONGODB_URI, (err, db) => {
//     cb(err, db);
//   });
// }

// app.get("/urls", (req, res) => {


//   connectAndThen(function(err, db){

//     console.log("Connected to db then did this!");
//     console.log("With errors: "+err);

//     db.collection("urls").find().toArray((err, urls) => {


//       res.render("urls_index", {urls: urls});

//     });
//   });