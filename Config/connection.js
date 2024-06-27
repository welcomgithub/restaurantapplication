var mysql = require('mysql2');
var config = require('./config.json');

   var con = mysql.createConnection(config.development);
  // var con = mysql.createConnection(config.production);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
