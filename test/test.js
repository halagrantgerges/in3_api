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
  it('should return Token For this User', function() {
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

describe('WsAccounts Services Tests', function() {
  // GET - List all WsAccounts with specific Types
  it('should return name and ID for all WSAccounts with type 11 and 12', function() {
    return chai.request(app)
      .get('/API/V1/Accounts/WsAccounts/WSUsersType')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('Name').eql('Akram Tourk');
        expect(res.body[0]).to.have.property('ID').eql(188);
        expect(res).to.be.json;
      })
      .catch(function(err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      })
  });

  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/INVALID_PATH')
      .set('token', token)
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });

  // GET - returh WSAccounts
  it('should return Name and ID WSAccounts', function() {
    return chai.request(app)
      .get('/API/V1/Accounts/WsAccounts/AllWSUsers')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('Name');
        expect(res.body[0]).to.have.property('ID').eql(317);
        expect(res).to.be.json;
      });
  });

  // POST - get mail and name for eID
  it('should send eID and Get name and email of it', function() {
    let uIDObj = {
      eID: "220"
    };
    return chai.request(app)
      .post('/API/V1/Accounts/WsAccounts/getEmailAccount/')
      .set('token', token)
      .send(uIDObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('Name').eql('Mike Roberts');
        expect(res.body[0]).to.have.property('Email').eql('mike@3ddx.com');
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(res).to.have.status(404);
      });
  });
});

describe('Lead Sources controller test', function() {
  it('should return ID And Name for all lead sorces', function() {
    return chai.request(app)
      .get('/API/V1/Commons/LeadSource/read/')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('Name').eql('source1');
        expect(res.body[0]).to.have.property('ID').eql(1);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
      });
  })
})


describe('Orders controller test', function() {
  it('should return Count for all Orders', function() {
    let uIDObj = {
      uID: "2077"
    };
    return chai.request(app)
      .post('/API/V1/Orders/OrderCount')
      .set('token', token)
      .send(uIDObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('No_IDs');
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  })
})

describe('Implant Cources Controller test', function() {
  it('should return all implant cources', function() {
    return chai.request(app)
      .get('/API/V1/Commons/ImplantCourse/read/')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('ID').eql(0);
        expect(res.body[0]).to.have.property('Course_Name').eql('N/A');
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
      });
  })
})

describe('Implant Categories Controller test', function() {
  it('should return all implant Categories', function() {
    return chai.request(app)
      .get('/API/V1/Commons/ImplantCategories/read/')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('implantName').eql('Straumann');
        expect(res.body[0]).to.have.property('implantId').eql(1);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      });
  })
})

describe('base Controller test', function() {
  this.timeout(5000);
  it('should get time zip', function() {
    let ZipObj = {
      Zip: "00210"
    };
    return chai.request(app)
      .post('/API/V1/Commons/getZipTimeZone')
      .set('token', token)
      .send(ZipObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('TimezoneOffset').eql(-5);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  })

  it('should get annualPayments for UID', function() {
    let uIDObj = {
      uID: "20145"
    };
    return chai.request(app)
      .post('/API/V1/Commons/getAnnualPayments')
      .set('token', token)
      .send(uIDObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('uID').eql(20145);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  })

  it('should get Account pairs', function() {
    let uIDObj = {
      xID: 299
    };
    return chai.request(app)
      .post('/API/V1/Commons/getAccPairs')
      .set('token', token)
      .send(uIDObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res.body[0]).to.have.property('openerId').eql(299);
        expect(res.body[0]).to.have.property('openerName').eql('David Paul');
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  })

  it('should get Auto generated password', function() {
    return chai.request(app)
      .get('/API/V1/Commons/generatePass/')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  })

  it('should send email', function() {
    var mailContents = {
      to: 'rasha.abuelmagd@3ddx.com',
      subject: 'Send email unit test',
      message: 'this email sent for testing purpose from unit test'
    }
    return chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/history/sendEmail')
      .set('token', token)
      .send(mailContents)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      });
  });
});
describe('Search Controller test', function() {
  this.timeout(8000);
  it('should get client data for specified search term', function() {
    return chai.request(app)
      .get('/API/V1/Commons/Search/Client?clientSearch_q=test')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  })

  it('should get client data for specified search term', function() {
    return chai.request(app)
      .get('/API/V1/Commons/Search/Advanced/?searchBy=1&value=2&userId=299&accountType=2')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      });
  })
})

describe('Userhistory Controller test', function() {

  it('should not allow an empty uID', function() {
    let uIDObj = {
      uID: "21060",
      limit: "3"
    };
    return chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/history/read/')
      .set('token', token)
      .send(uIDObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  });

  it('should not have an empty history', function() {
    var history = {
      userID: "182",
      History: "Test History for Integration Test",
      username: "feky",
    }
    return chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/history/add/21060')
      .set('token', token)
      .send(history)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(405);
        expect(err).to.be.json;
      });
  })
})

describe('UserAccounts Controller test', function() {
  this.timeout(50000);

  it('should read data from agents.json', function() {
    return chai.request(app)
      .get('/API/V1/Accounts/UserAccounts/readAll/')
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  });

  it('should get data for uID', function() {
    let uIDObj = {
      uID: "21060"
    };
    return chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/geteID')
      .send(uIDObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(400);
        expect(err).to.be.json;
      });
  });

  it('should get sales tasks', function() {
    var data = {
      agentId: "0"
    }
    return chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/salesTasks/readAllTasks')
      .send(data)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      });
  })

  it('should get high priority sales tasks', function() {
    var data = {
      agentId: "0"
    }
    return chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/salesTasks/readHighTasks')
      .send(data)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      }).catch(function(err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      });
  });

  it('should save a client Data then delete it', (done) => {
    var clientData = fs.readFileSync('./test/jsonDataFiles/clientData.json', 'utf8');
    let uIDObj = {
      userID: 182
    };
    clientData = JSON.parse(clientData);
    chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/add/')
      .set('token', token)
      .send(clientData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('New User Created Successfully');
        chai.request(app)
          .post('/API/V1/Accounts/UserAccounts/delete/' + res.body.data)
          .set('token', token)
          .send(uIDObj)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Client deleted successfully');
          });
        done();
      });
  });

  it('should update client Data', (done) => {
    var clientData = fs.readFileSync('./test/jsonDataFiles/clientData.json', 'utf8');
    clientData = JSON.parse(clientData);
    clientData.Email = 'test634@UpdateUnitTest.UnitTest';
    clientData.uID = '20983';
    chai.request(app)
      .post('/API/V1/Accounts/UserAccounts/update/20983')
      .set('token', token)
      .send(clientData)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('User Data Updated Successfully');
        done();
      });
  });
});

// _____________ iSmile And Appliance Order Unit Testing __________

describe('iSmile And Appliance Services Tests', function() {

  // POST 1- List all iSmile Orders
 it('should return iSmile sub Order , iSmile Files and the full details for all iSmile Orders with type 14', function() {
    var ordersObj = {'billDate': "" ,'clientToBeBilledOnly': "" ,'subID': "" ,'todaysFlow': false };
    return chai.request(app)
      .post('/API/V1/Orders/iSmile')
      .send(ordersObj)
      .set('token', token)
      .then(function(res) {
        expect(res).to.have.status(200);
        // expect(res.body[0]).to.have.property('Name');
        // expect(res.body[0]).to.have.property('ID');
        expect(res).to.be.json;
      })
      .catch(function (err) {
        expect(err).to.have.status(500);
        expect(err).to.be.json;
      });
 });

 // POST 2- Add iSmile Order and insert data to tables ..
 it('should add iSmile Order .. ',function() {
   var formData = [ {name: "ScanID", value: "83399"},{name: "DocID", value: "111138"},{name: "orderType", value: "1"}
                  , {name: "scanfullName", value: "7amada 7amadaaa"} , {name: "docfullName", value: "Nada Nasser"}
                  , {name: "billTo", value: "111138"} , {name: "patientName", value: "unitTestingPatient"}
                  , {name: "birthDate", value: "2019-03-31"} , {name: "Gender", value: "2"} , {name: "hasIOS", value: "1"}
                  , {name: "systemIOS", value: "2"} , {name: "hasFabrication", value: "1"} , {name: "additionalComments", value: "test cases"}
                  , {name: "arch", value: "1"} , {name: "NumberingSystem", value: "1"} , {name: "toothNum_3", value: "3"}
                  , {name: "toothNum_4", value: "4"} , {name: "toothNum_5", value: "5"} , {name: "missingToothReason_3", value: "3"}
                  , {name: "internalHistory", value: "Test From unit testing .. First test case"} , {name: "toBeMoved", value: "[5]"}
                  , {name: "sendToInternalCaseNote[]", value: "1"} , {name: "sendToInternalCaseNote[]", value: "6"}
                  , {name: "sendToInternalCaseNote[]", value: "8"} , {name: "preShippingInstruction", value: "Pre Shipping From unit testing"}
                  , {name: "xid", value: "337"} , {name: "existingImplants", value: "[4]"} , {name: "actualMoved", value: "[]"} ];

   return chai.request(app)
   .post('/API/V1/Orders/addIsmile')
   .send(formData)
   .set('token', token)
   .then(function(res) {
     expect(res).to.have.status(200);
     // expect(res.body[0]).to.have.property('Name');
     // expect(res.body[0]).to.have.property('ID');
     expect(res).to.be.json;
   }).catch(function (err) {
     expect(err).to.have.status(405);
     expect(err).to.be.json;
   });
 });

// POST 3- Get iSmile Order Details for specific ID ..
it('should Get iSmile Order for specific ID .. ',function() {
  var formData={"id" : 393261};
  return chai.request(app)
  .post('/API/V1/Orders/iSmileByID')
  .send(formData)
  .set('token', token)
  .then(function(res) {
    expect(res.body[0]).to.have.property('id').eql(393261);
    expect(res.body[0]).to.have.property('scanId').eql(111123);
    expect(res.body[0]).to.have.property('docId').eql(3821);
    expect(res).to.be.json;
  }).catch(function (err) {
    expect(err).to.have.status(405);
    expect(err).to.be.json;
  });
});


// POST 4- Change iSmile Order Staus for specific iSmile SubOrder ID ..
it('should Change iSmile SubOrder Status for specific ID .. ',function() {
  var orderObj={"iSmileSubOrderID" : 9 , "status": 'Received', "statusCode":2};
  return chai.request(app)
  .post('/API/V1/Orders/changeiSmileStatus')
  .send(orderObj)
  .set('token', token)
  .then(function(res) {
    expect(res.body).to.have.property('message').eql('iSmile Sub Order Updated Successfully');
    expect(res).to.be.json;
  }).catch(function (err) {
    expect(err).to.have.status(405);
    expect(err).to.be.json;
  });
});


// GET 5- Get iSmile Order STLS Lower And Upper for specific iSmile ID ..
it('should Get iSmile STL Lower And Upper for specific ID .. ',function() {
  return chai.request(app)
  .get('/API/V1/Orders/stlReader?orderID=393261')
  .set('token', token)
  .then(function(res) {
    expect(res.body).to.have.property('message').eql('STLs read successfully');
    expect(res.body.data).to.have.property('lower');
    expect(res.body.data).to.have.property('upper');
    expect(res.body.data.patientName[0]).to.have.property('dcmPatientName').eql('Patient Nam');
    expect(res).to.be.json;
  }).catch(function (err) {
    expect(err).to.have.status(405);
    expect(err).to.be.json;
  });
});

// GET 6- Get iSmile Order STLS Lower And Upper for specific iSmile ID ..
it('should Get iSmile STL Lower And Upper for specific ID .. ',function() {
  return chai.request(app)
  .get('/API/V1/Orders/stlReader?orderID=393261')
  .set('token', token)
  .then(function(res) {
    expect(res.body).to.have.property('message').eql('STLs read successfully');
    expect(res.body.data).to.have.property('lower');
    expect(res.body.data).to.have.property('upper');
    expect(res.body.data.patientName[0]).to.have.property('dcmPatientName').eql('Patient Nam');
    expect(res).to.be.json;
  }).catch(function (err) {
    expect(err).to.have.status(405);
    expect(err).to.be.json;
  });
});


// POST 7- Get Doctors List for specific Scanning center ID ..
it('should Get Doctors List for specific Scanning Center ID .. ',function() {
  var orderObj={"scanID" : 1535};
  return chai.request(app)
  .post('/API/V1/Orders/getDoctorsOfScanCenter')
  .send(orderObj)
  .set('token', token)
  .then(function(res) {
    expect(res.body).to.have.property('message').eql('This Client Is Scanning Center !');
    expect(res.body).to.have.property('response');
    expect(res).to.be.json;
  }).catch(function (err) {
    expect(err).to.have.status(405);
    expect(err).to.be.json;
  });
});


// POST 8- Add Internal History for specific order id and iSmileID..
it('should Add Internal History for specific order ID And iSmile ID .. ',function() {
  var orderObj={"OrderID" :393261  , "SubOrderID" : 992, "internalNote" : "InternalHistory Note from test Cases iSmile Order","xID":402};
  return chai.request(app)
  .post('/API/V1/Orders/addInternalHistory')
  .send(orderObj)
  .set('token', token)
  .then(function(res) {
    expect(res.body).to.have.property('message').eql('History Inserted Successfully');
    expect(res).to.be.json;
  }).catch(function (err) {
    expect(err).to.have.status(405);
    expect(err).to.be.json;
  });
});

});

// ____________ End iSmile Unit Testing __________


// _____________ QC Form Operation Unit Testing __________

describe('QC Form Operation Services Tests', function () {

    // GET 1- Get QC Form for Operation Departement that should to be active ..
    it('should Get The only active form for operation departement .. ', function () {
        return chai.request(app)
                .get('/API/V1/Commons/QCForm/getActiveQCForm')
                .set('token', token)
                .then(function (res) {
                   expect(res.body).to.have.property('message').eql('All Data Retrieved Successfully');
                   expect(res.body.data).to.have.property('FormSectionsDetails');
                   expect(res.body.data).to.have.property('active');
                   expect(res.body.data).to.have.property('name').eql('Operations QC Form');
                    expect(res).to.be.json;
                }).catch(function (err) {
            expect(err).to.have.status(405);
            expect(err).to.be.json;
        });
    });

    // POST 2- Get latest evaluation for specific order based on criteria of QC Form Operation .. 
    it('should return latest evaluation for specific order based on criteria of QC Form Operation', function () {
        var dataObj = {"orderID": 249605, "agentID": 469};

        return chai.request(app)
                .post('/API/V1/Commons/QCForm/getLatestQCFormOrderEvaluation')
                .send(dataObj)
                .set('token', token)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    // expect(res.body).to.have.property('message').eql('No Evaluation Found For This Order');
                    expect(res.body.data).to.have.property('formDetails');
                    expect(res.body.data).to.have.property('orderDetails');
                    // expect(res.body.data).to.have.property('agentEmail').eql('naguib_swd@testing.com');
                    expect(res).to.be.json;
                })
                .catch(function (err) {
                    expect(err).to.have.status(500);
                    expect(err).to.be.json;
                });
    });

    // POST 3- Add new QC form (operation departement) by it`s sections and items .. 
    it('should Add new QC form (operation departement) by it`s sections and items', function () {
        var formObj = {
            "createdBy": 343,
            "formName": "Hopa Form",
            "sectionsList": [
                {
                    "name": "Section66",
                    "weight": 15,
                    "SectionItemsDetails": [
                        {
                            "name": "sec66_item2",
                            "weight": 10
                        },
                        {
                            "name": "sec66_item1",
                            "weight": 90
                        }
                    ]
                },
                {
                    "name": "Section55",
                    "weight": 10,
                    "SectionItemsDetails": [
                        {
                            "name": "sec55_item3",
                            "weight": 30
                        },
                        {
                            "name": "sec55_item2",
                            "weight": 50
                        },
                        {
                            "name": "sec55_item1",
                            "weight": 20
                        }
                    ]
                }
            ]
        };
        return chai.request(app)
                .post('/API/V1/Commons/QCForm/addNewQCForm')
                .send(formObj)
                .set('token', token)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                })
                .catch(function (err) {
                    expect(err).to.have.status(500);
                    expect(err).to.be.json;
                });
    });

    // POST 4- Add Evaluation for specific order based on active QC Form  .. 
    it('should Add Evaluation for specific order based on active QC Form ', function () {
        var formEvaluationObj = {
            "formID": 35,
            "recorderID": 343,
            "orderID": 254700,
            "OrderStatus": 0,
            "SentTo": "CS,OP",
            "Comment": "Hoopa Order Fail Or Pass ! O_O",
            "addedToIH": 1,
            "itemsList": [
                {
                    "rate": 0.5,
                    "itemID": 68
                },
                {
                    "rate": 0.8,
                    "itemID": 69
                },
                {
                    "rate": 0.4,
                    "itemID": 72
                }
            ]
        };
        return chai.request(app)
                .post('/API/V1/Commons/QCForm/addQCFormOrderEvaluation')
                .send(formEvaluationObj)
                .set('token', token)
                .then(function (res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').eql('New Items Rates Added Successfully');
                    expect(res).to.be.json;
                })
                .catch(function (err) {
                    expect(err).to.have.status(500);
                    expect(err).to.be.json;
                });
    });

});

// ____________ End QC Form Operation Unit Testing __________
