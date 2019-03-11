// demo_node.js
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "p3plcpnl0974.prod.phx3.secureserver.net",
  user: "miguel1984",
  password: "Union.Dutchmen.17",
  database: "rqmr_booking",
  port: 3306,
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM flight WHERE (from_city = 'NYC' AND to_City = 'MIA')", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

