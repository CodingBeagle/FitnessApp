var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.js');
var ctrlWorkouts = require('../controllers/workouts.js');
var ctrlExercises = require('../controllers/exercises.js');
var ctrlWorkoutActivities = require('../controllers/workoutActivities.js');

// Users
router
    .route('/users/:userid')
    .delete(ctrlUsers.deleteUser);

router
	.route('/users/:username')
	.get(ctrlUsers.getUser);

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

// Workout Activity
router
    .route('/users/:userid/workouts/:workoutid/workoutActivities')
    .post(ctrlWorkoutActivities.createWorkoutActivity)

// Exercises
router
	.route('/users/:userid/workouts/:workoutid/exercises')
	.post(ctrlExercises.createExercise);

router
	.route('/users/:userid/workouts/:workoutid/exercises/:exerciseid')
	.delete(ctrlExercises.deleteExercise);

module.exports = router;