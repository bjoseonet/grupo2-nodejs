const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-bjoseonet.alwaysdata.net',
  user: 'bjoseonet_jose',
  password: 'adivinalaclave',
  database: 'bjoseonet_grupo2',
});

connection.connect((error) => {
  if (error) {
    return console.error(error);
  }

  console.log('Conectado ONLINE');
});

module.exports = connection;
