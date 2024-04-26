let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user:   'root',
    password: '',
    database: 'rm_klinik_pens'
})

connection.connect(function(error){
    if(!!error){
        console.log(error);
    }else{
        console.log("MySQL Connected");
    }
})

module.exports = connection;