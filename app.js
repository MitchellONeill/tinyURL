
function generateRandomString(){
let shortURL = Math.random().toString(36).slice(-6);
return shortURL
};

console.log(generateRandomString());