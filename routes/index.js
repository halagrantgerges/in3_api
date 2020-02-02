const express = require('express');
const router = express.Router();

const Tasks = require('../controllers/TasksController');

router.get('/getData',Tasks.getData);
module.exports = router;
