const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-bjoseonet.alwaysdata.net',
  user: 'bjoseonet_jose',
  password: '14cab056CAB411',
  database: 'bjoseonet_grupo2',
});

connection.connect((error) => {
  if (error) {
    return console.error(error);
  }

  console.log('Conectado');
});

module.exports = connection;
