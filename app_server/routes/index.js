var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home.js');
var workoutController = require('../controllers/workout.js');

/* GET home page. */
router.get('/', homeController.index);
router.get('/SignIn', homeController.SignIn);

router.post('/CreateUser', homeController.CreateUser);
router.post('/Login', homeController.Login);

module.exports = router;
