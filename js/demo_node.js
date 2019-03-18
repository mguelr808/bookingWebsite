var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// parse html forms
app.use(bodyParser.urlencoded({ extended : true}));
// set ejs as rendering engine
app.set('view engine', 'ejs');
app.use("/views", express.static('./views/'));




// render the ejs page
app.get('/submit', function (req, res) {
  res.render('submit.ejs');
});



// when Add to Bottom button is clicked
app.post("/submit", function (req, res) {
    console.log(" is added to top of the list.");
 
  
});

app.listen(8000);
console.log('App is listening on PORT 8000');