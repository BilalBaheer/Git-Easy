const express = require('express');
const router = express.Router();

// Sample quiz data (replace with database queries later)
const quizzes = [
  {
    id: 1,
    title: "Git Basics",
    questions: [
      {
        id: 1,
        question: "What command initializes a new Git repository?",
        options: ["git init", "git start", "git create", "git new"],
        correctAnswer: "git init"
      },
      // Add more questions...
    ],
    tutorialId: 1
  },
  // Add more quizzes...
];

// Get all quizzes
router.get('/', (req, res) => {
  res.json(quizzes);
});

// Get a specific quiz
router.get('/:id', (req, res) => {
  const quiz = quizzes.find(q => q.id === parseInt(req.params.id));
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
});

module.exports = router;
