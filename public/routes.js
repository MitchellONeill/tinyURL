module.exports = function(app, db) {

  app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

  app.get("/", (req, res)=> {
    res.render("urls_index",{table: urlDatabase});
  });

  app.post("/urls", (req, res) => {
    let shortURL = generateRandomString()
    let longURL = req.body.longURL
    if (!longURL.match(/^https?:\/\//)) longURL = 'https://' + longURL;
    urlDatabase[shortURL] = longURL;
    res.redirect ("/urls")
  });

  app.get("/urls", (req, res) => {
    res.render('urls_obj', {table: urlDatabase});
  });

  app.get("/:shortURL", (req, res) => {
    console.log(urlDatabase);
    let longURL = urlDatabase[req.params.shortURL];
    console.log(longURL); console.log(typeof longURL);
     if (!longURL.match(/^https?:\/\//)) {
      longURL = 'https://' + longURL;
    }
    urlDatabase[req.params.shortURL] = longURL;
    res.redirect(longURL);
  });

   app.delete('/urls/:id', (req, res) => {
      let shortURL = req.params.id;
      delete urlDatabase[shortURL];
        res.redirect('/urls');
      });

   app.put('/urls/:id', (req, res) => {
      let edit = req.body.urledit;
      urlDatabase[req.params.id] = edit;
        res.redirect('/urls');
      });

  function generateRandomString(){
  let shortURL = Math.random().toString(36).slice(-6);
  return shortURL;
  };
}

