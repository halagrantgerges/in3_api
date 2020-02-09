//express for routing
const express = require('express');
const router = express.Router();

// load the Tasks control
const Tasks = require('../controllers/TasksController');

//http://localhost:3333/API/V1/Tasks/getData/?Company=HP
router.get('/getData',Tasks.getData);
router.post('/getFeaturedData',Tasks.getFeaturedData);
module.exports = router;
