var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.js');

// Users
router
    .route('/users/:userid')
    .get(ctrlUsers.getUser)
    .delete(ctrlUsers.deleteUser);

router
    .route('/users')
    .post(ctrlUsers.createUser);

// Workouts

// Exercises

module.exports = router;