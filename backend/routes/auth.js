const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Register route
router.post('/register', [
  check('username').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
], authController.register);

// Login route
router.post('/login', [
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('password').notEmpty().withMessage('Password is required')
], authController.login);

module.exports = router;