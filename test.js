
// var urlDatabase = {
//   "b2xVn2": "http://www.lighthouselabs.ca",
//   "9sm5xK": "http://www.google.com"
// };

// templateVars = { urls: urlDatabase };
// // console.log(templateVars);
// // console.log(Object.keys(urlDatabase));
// console.log(typeof urlDatabase);
//  Object.keys(urlDatabase).forEach(function(key){
//  console.log(key + ' - ' + urlDatabase[key])});

//  { shortURL: req.params.id }

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('yes', () => {
  console.log('an event occurred!');
});
myEmitter.emit('yes');

