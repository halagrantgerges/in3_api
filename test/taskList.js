'use strict';
process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;
const should = chai.should();
const fs = require('fs');
chai.use(chaiHttp);
var token = "";

describe('Auth controller test', function() {
  it('Should return Token For this User', function() {
    let userToLogin = {
      name: "rasha",
      password:"2018"
    };
    return chai.request(app)
      .post('/auth')
      .send(userToLogin)
      .then(function(res) {
        token = res.body.token;
        expect(res.body).to.have.property('message').eql('successful');
        expect(res.body).to.have.property('token');
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(500);
        expect(res.body).to.have.property('message').eql('Wrong username or password!');
      });
  })
})

/**
 * needs update as we don't use eID
 */

// describe('Tasks Lists Services Tests', function() {

//     // GET - Get clients of Agent with uID
//    it('Get clients of Agent with uID', function() {
//     var obj = {"eID" : 167}
//       return chai.request(app)
//         .post('/API/V1/Tasks/getUserAccountTypes')
//         .send(obj)
//         .set('token', token)
//         .then(function(res) {
//           expect(res).to.have.status(200);
//           expect(res.body[0]).to.have.property('FName').eql('Head and Neck');
//           expect(res.body[0]).to.have.property('uID').eql(1);
//           expect(res).to.be.json;
//         })
//         .catch(function (err) {
//           expect(err).to.have.status(500);
//           expect(res.body).to.have.property('message').eql('Wrong username  ');
//         })
//    });
  
//     // GET - All Doctor And ScanCenters
//     it('Get All Doctor And ScanCenters ', function() {
//       return chai.request(app)
//         .get('/API/V1/Tasks/getAllDoctorAndScanCenters')
//         .set('token', token)
//         .then(function(res) {
//           res.body.should.have.property('stauscode').eql(200)
//           expect(res.body[9]).to.have.property('FName').eql('John');
//           expect(res.body[9]).to.have.property('uID').eql(11);          
//           throw new Error('Path exists!');
//         })
//         .catch(function(err) {

//          }); 
//     });
  
 
//   });
  