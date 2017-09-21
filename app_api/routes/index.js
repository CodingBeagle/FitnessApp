var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.js');
var ctrlWorkouts = require('../controllers/workouts.js');

// Users
router
    .route('/users/:userid')
    .get(ctrlUsers.getUser)
    .delete(ctrlUsers.deleteUser);

router
    .route('/users')
    .post(ctrlUsers.createUser);

// Workouts
router
    .route('/users/:userid/workouts/:workoutid')
    .delete(ctrlWorkouts.deleteWorkout);

router
    .route('/users/:userid/workouts')
    .post(ctrlWorkouts.createWorkout);

// Exercises
module.exports = router;