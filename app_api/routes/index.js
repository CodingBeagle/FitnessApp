var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.js');
var ctrlWorkouts = require('../controllers/workouts.js');
var ctrlExercises = require('../controllers/exercises.js');

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
    .route('/workouts/:workoutid')
    .delete(ctrlWorkouts.deleteWorkout);

router
    .route('/workouts')
    .post(ctrlWorkouts.createWorkout);

// Exercises
router
	.route('/users/:userid/workouts/:workoutid/exercises')
	.post(ctrlExercises.createExercise);

router
	.route('/users/:userid/workouts/:workoutid/exercises/:exerciseid')
	.delete(ctrlExercises.deleteExercise);

module.exports = router;