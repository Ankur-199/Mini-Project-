const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isNotAuthenticated } = require('../middleware/authMiddleware');

// Signup routes
router.get('/signup', isNotAuthenticated, authController.showSignup);
router.post('/signup', isNotAuthenticated, authController.signup);

// Login routes
router.get('/login', isNotAuthenticated, authController.showLogin);
router.post('/login', isNotAuthenticated, authController.login);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;

