var express = require('express');
var router = express.Router();
var ctrlUsers = require('../controllers/users.js');
var ctrlWorkouts = require('../controllers/workouts.js');
var ctrlExercises = require('../controllers/exercises.js');
var ctrlWorkoutActivities = require('../controllers/workoutActivities.js');
var jwt = require('express-jwt');
var auth = jwt({secret: process.env.JWT_Secret, userProperty: 'payload'});

// Users
router.delete('/users/:userid', auth, ctrlUsers.deleteUser);

router.get('/users/:username', auth, ctrlUsers.getUser);

router
    .route('/users/login')
    .post(ctrlUsers.login);

router
    .route('/users')
    .post(ctrlUsers.createUser);

// Workouts
router.delete('/users/:userid/workouts/:workoutid', auth, ctrlWorkouts.deleteWorkout);

router.post('/users/:userid/workouts', auth, ctrlWorkouts.createWorkout);

// Workout Activity
router.post('/users/:userid/workouts/:workoutid/workoutActivities', auth, ctrlWorkoutActivities.createWorkoutActivity);

router.delete('/users/:userid/workouts/:workoutid/workoutActivities/:activityid', auth, 
    ctrlWorkoutActivities.deleteWorkoutActivity);
    
// Exercises
router.post('/users/:userid/workouts/:workoutid/exercises', auth, ctrlExercises.createExercise);

router.delete('/users/:userid/workouts/:workoutid/exercises/:exerciseid', auth, ctrlExercises.deleteExercise);

module.exports = router;