const quizzes = [
  {
    id: 1,
    tutorialId: 1, // corresponds to "Getting Started with Git"
    title: "Git Basics Quiz",
    questions: [
      {
        id: 1,
        question: "What is Git?",
        options: [
          "A programming language",
          "A distributed version control system",
          "A code editor",
          "A web hosting service"
        ],
        correctAnswer: 1, // index of correct answer
        explanation: "Git is a distributed version control system that helps track changes in source code during software development."
      },
      {
        id: 2,
        question: "Which command initializes a new Git repository?",
        options: [
          "git start",
          "git init",
          "git begin",
          "git create"
        ],
        correctAnswer: 1,
        explanation: "The 'git init' command creates a new Git repository in the current directory."
      },
      {
        id: 3,
        question: "What does Git primarily track?",
        options: [
          "Only source code files",
          "Changes to files over time",
          "Only image files",
          "System performance"
        ],
        correctAnswer: 1,
        explanation: "Git tracks changes made to files in a repository over time, allowing you to view or revert to previous versions."
      }
    ]
  },
  {
    id: 2,
    tutorialId: 2, // corresponds to "Initialize a Git Repository"
    title: "Repository Setup Quiz",
    questions: [
      {
        id: 1,
        question: "What directory is created when you initialize a Git repository?",
        options: [
          ".git",
          ".github",
          "git-files",
          "git-repo"
        ],
        correctAnswer: 0,
        explanation: "The .git directory contains all the information necessary for Git version control."
      },
      {
        id: 2,
        question: "Which command shows the current status of your Git repository?",
        options: [
          "git check",
          "git status",
          "git info",
          "git show"
        ],
        correctAnswer: 1,
        explanation: "The 'git status' command shows the state of the working directory and staging area."
      }
    ]
  }
];

export default quizzes;
