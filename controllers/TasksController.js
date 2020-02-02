var models = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const fs = require('fs');

exports.getData = function(req, res){

  // console.log(req.query);
let query= {
    attributes: ['id', 'Company'],
    limit: 10
  };
  models.in3.findAll(query)
  .then(function(client) {
      res.json(client);
  })
  .catch(function(err) {
      res.status(500).json(err.message);
  });
}
