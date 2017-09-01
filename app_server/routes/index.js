var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.js');

/* GET home page. */
router.get('/', homeController.index);

module.exports = router;
