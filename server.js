var Sequelize = require('sequelize');
const fs = require('fs');

  DBConfig = '';
    DBConfig = fs.readFileSync('/home/hala/in3_api/Credentials.json', 'utf8');
    DBConfig = JSON.parse(DBConfig);
var DBUsername = process.env.DBUsername || DBConfig.DBUsername;
var DBpassword = process.env.DBpassword || DBConfig.DBpassword;
var DBhost = process.env.DBhost || DBConfig.DBhost;

const connection = new Sequelize(DBConfig.DB, DBUsername, DBpassword, {
  logging: false,
  host: DBhost,
  dialect: 'mysql',
  dialectOptions: {
    flags: '-FOUND_ROWS'
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
connection
  .authenticate()
  // eslint-disable-next-line
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = connection;
