const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

  DBConfig = '';

//read Credentials.json to load DB configurations
  DBConfig = fs.readFileSync('Credentials.json', 'utf8');
  DBConfig = JSON.parse(DBConfig);
var DBUsername = process.env.DBUsername || DBConfig.DBUsername;
var DBpassword = process.env.DBpassword || DBConfig.DBpassword;
var DBhost = process.env.DBhost || DBConfig.DBhost;
const sequelize = new Sequelize(DBConfig.DB, DBUsername, DBpassword, {
  logging: true,
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
sequelize
  .authenticate()
  .then(function() {
    console.log('Connection to db has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

const db = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
