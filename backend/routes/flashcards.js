const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const flashcardController = require('../controllers/flashcardController');
const auth = require('../middleware/auth');

// Protect all routes
router.use(auth);

// Get all flashcards
router.get('/', flashcardController.getAllFlashcards);

// Create flashcard
router.post('/', [
  check('question').notEmpty().withMessage('Question is required'),
  check('answer').notEmpty().withMessage('Answer is required'),
  check('category').notEmpty().withMessage('Category is required')
], flashcardController.createFlashcard);

// Update flashcard
router.put('/:id', [
  check('question').notEmpty().withMessage('Question is required'),
  check('answer').notEmpty().withMessage('Answer is required'),
  check('category').notEmpty().withMessage('Category is required')
], flashcardController.updateFlashcard);

// Delete flashcard
router.delete('/:id', flashcardController.deleteFlashcard);

module.exports = router;