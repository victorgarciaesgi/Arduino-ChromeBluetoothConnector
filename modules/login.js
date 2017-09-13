const mysql = require('mysql');
const DB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'portefolio'
});


exports.getUsers = function(){
  return new Promise(function (fulfill, reject){
    DB.query('SELECT * from users', function (error, results, fields) {
      if (error) reject(error);
      else fulfill(results);
    })
  })


}
