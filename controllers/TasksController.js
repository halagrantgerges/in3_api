var models = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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


// custimized search
exports.getFeaturedData = function(req, res){
let whereArr=[];
let emptyCriteria=true;
///check on company data
if(req.body.Company&&req.body.Company!="")
{
  emptyCriteria=false;
  whereArr.push({
    Company:{
            [Op.like]: "%"+ req.body.Company+"%"
          }
  });
}
// check on products
if(req.body.Product&&req.body.Product!="")
{
  emptyCriteria=false;
  whereArr.push({
    Product:{
            [Op.like]: "%"+ req.body.Product+"%"
          }
  });
}

// getting data of CPU
if(req.body.CPU&&req.body.CPU!="")
{
    emptyCriteria=false;
  let CPUWhere=[];
  console.log("CPU");
  req.body.CPU.split(",").forEach((item, i) => {
    if(item!="")
    {
      CPUWhere.push({
                [Op.like]:"%"+item+"%"
              });
    }

  });
  if(CPUWhere.length>0)
{
  whereArr.push({
    CPU:{
            [Op.or]: CPUWhere

          }
  });
}
}


// getting data of RAM
if(req.body.RAM&&req.body.RAM!="")
{
    emptyCriteria=false;
  let RAMWhere=[];
  req.body.RAM.split(",").forEach((item, i) => {
    if(item!="")
    {
      RAMWhere.push({
                [Op.like]:"%"+item+"%"
              });
    }

  });
  if(RAMWhere.length>0)
{
  whereArr.push({
    RAM:{
            [Op.or]: RAMWhere

          }
  });

}
}

// getting data of OpSys
if(req.body.OpSys&&req.body.OpSys!="")
{
    emptyCriteria=false;
  let OpSysWhere=[];
  req.body.OpSys.split(",").forEach((item, i) => {
    if(item!="")
    {
      OpSysWhere.push({
                [Op.like]:"%"+item+"%"
              });
    }

  });
  if(OpSysWhere.length>0)
{
  whereArr.push({
    OpSys:{
            [Op.or]: OpSysWhere

          }
  });

}
}
let query= {
  where:{
     [Op.and]:whereArr,

  }

  };
  console.log("empty: ",emptyCriteria);
  if(emptyCriteria) // get all data in case of empty criteria
      query={};
  models.in3.findAll(query)
  .then(function(client) {
      res.json(client);
  })
  .catch(function(err) {
      res.status(500).json(err.message);
  });
}
