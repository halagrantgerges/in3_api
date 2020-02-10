// unit test file
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


describe('Node application is running', function() {
it('succeeds silently!', function() {   // <= No done callback
  chai.request('http://localhost:3333')
  .get('/')
  .end(function(err, res) {
    expect(res).to.have.status(123);    // <= Test completes before this runs
  });
});
})

describe('Products test1', function() {
it('Get app products!', function() {   // <= No done callback
  chai.request('http://localhost:3333')
  .get('/API/V1/Tasks/getData')
  .end(function(err, res) {
    expect(res).to.have.status(123);    // <= Test completes before this runs
  });
});
})
