var models = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');

// function getData to get all data
exports.getData = function(req, res){

  // console.log(req.query);
let query= {
    // attributes: ['id', 'Company'],
    limit: 10
  };
  models.in3.findAll({})
  .then(function(client) {
      res.json(client);
  })
  .catch(function(err) {
      res.status(500).json(err.message);
  });
}
