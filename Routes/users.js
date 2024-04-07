const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create User Data
router.post('/create-user', userController.createUser);

// Get Random User
router.get('/get-random', userController.getRandomUser);

// Check User Existence
router.post('/check-user', userController.checkUserExistence);

// Get Users Above Age
router.post('/age-above', userController.getUsersAboveAge);

// List User Names
router.get('/names', userController.listUserNames);

// Update User by ID
router.put('/update-user/:id', userController.updateUser);

// Delete User by ID
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;
