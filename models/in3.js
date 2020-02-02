'use strict';

module.exports = (sequelize, DataTypes) => {
    var in3 = sequelize.define('in3', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        unqiue : false,
        autoIncrement: true,
        field: 'id'
      },
      Company: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Company'
      },
      Product: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Product'
      },
      Type: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Type'
      },
      Inches: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Inches'
      },
      Resolution: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Resolution'
      },
      CPU: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'CPU'
      },
      RAM: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'RAM'
      },
      Memory: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Memory'
      }
      ,
      Graphics: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Graphics'
      },
      OpSys: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'OpSys'
      },
      Weight: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Weight'
      },
      Price: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'Price'
      }
    }, {
        tableName: 'in3',
        timestamps: false,
    });

    


    in3.getOne = function(id){
        return in3.findOne({ where: {taskID: task_ID} });

      // return sequelize.query('update  connect.Tasks LEFT JOIN Orders ON relatedToID = Orders.ID set assignedTo= '+agentID+swapSetting+concat+';')
      // .then(
      //  ()=>{console.log("success");}
      // ).catch(
      //   ()=>{console.log("faild");}
      // )
      // ;
    }

   
   return in3;
}
