var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pjson = require('./package.json');
var mysql = require('mysql');

app.use(bodyParser.json());
// parse html forms
app.use(bodyParser.urlencoded({ extended : true}));
// set ejs as rendering engine
app.set('view engine', 'ejs');
app.use("/views", express.static('./views/'));

var multer  = require('multer');
var upload = multer();



var con = mysql.createConnection({
  host: pjson.rqmr_booking.host,
  user: pjson.rqmr_booking.user,
  password: pjson.rqmr_booking.password,
  database: pjson.rqmr_booking.database,
  port: pjson.rqmr_booking.port,   
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



// render the ejs page
app.get('/', function (req, res) {
  res.render('index.ejs');
});

var ssn ;

app.get('/submit', function (req, res) {
    var ssn = req.session;
    var city1 = req.query.fromCity.toString();
    var pass = req.query.class;
    var numPass = req.query.adults + req.query.children;
    var city2 = req.query.toCity.toString();
    
  

    con.query( ( 'SELECT * FROM flight WHERE( from_city LIKE '+ "'"+city1 + "'"+ ' AND to_city LIKE '+  "'"+city2+ "'"+')' ) , function(err, rows) {
    
    if (err) {
        console.log(err);
       
    }
    
    console.log(ssn.class);    
     res.render('submit.ejs',{data:rows, classtype:pass, number:numPass});
    });
  
});

app.get('/flight', function (req, res) {
    var flightNo = req.query.flight;
    
    var queryflight = 'SELECT * FROM seat_reservation WHERE flight_id = '+flightNo+' AND booked = 0 ORDER BY seat_id DESC';
    console.log(queryflight);
    con.query( (queryflight ) , function(err, rows) {
    
    if (err) {
        console.log(err);
       
    }
    
   res.render('seating.ejs',{data:rows});
     
    });
  
});
app.get('/getInfo', function (req, res) {
    
    
   res.render('getInfo.ejs');
     

  
});







app.listen(8000);
console.log('App is listening on PORT 8000');