const Flashcard = require('../models/Flashcard');
const { validationResult } = require('express-validator');

exports.getAllFlashcards = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const flashcards = await Flashcard.find({ user: req.userId });
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createFlashcard = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { question, answer, category } = req.body;
    const flashcard = new Flashcard({
      question,
      answer,
      category,
      user: req.userId
    });

    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, category } = req.body;

    const flashcard = await Flashcard.findOneAndUpdate(
      { _id: id, user: req.userId },
      { question, answer, category },
      { new: true }
    );

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteFlashcard = async (req, res) => {
  try {
    const { id } = req.params;
    const flashcard = await Flashcard.findOneAndDelete({ _id: id, user: req.userId });

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};