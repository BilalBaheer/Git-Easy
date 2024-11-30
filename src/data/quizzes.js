const quizzes = [
  {
    id: 1,
    tutorialId: 1, // corresponds to "Getting Started with Git"
    title: "Getting Started with Git Quiz",
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
        correctAnswer: 1,
        explanation: "Git is a distributed version control system that helps track changes in source code during software development."
      },
      {
        id: 2,
        question: "Who created Git?",
        options: [
          "Steve Jobs",
          "Bill Gates",
          "Linus Torvalds",
          "Mark Zuckerberg"
        ],
        correctAnswer: 2,
        explanation: "Git was created by Linus Torvalds in 2005 for the development of the Linux kernel."
      },
      {
        id: 3,
        question: "Which of these is NOT a benefit of using Git?",
        options: [
          "Version control of code",
          "Collaboration with team members",
          "Automatic bug fixing",
          "Backup of code history"
        ],
        correctAnswer: 2,
        explanation: "Git does not automatically fix bugs. It's a version control system that helps track changes and facilitate collaboration."
      },
      {
        id: 4,
        question: "What type of version control system is Git?",
        options: [
          "Centralized Version Control System",
          "Distributed Version Control System",
          "Linear Version Control System",
          "Hierarchical Version Control System"
        ],
        correctAnswer: 1,
        explanation: "Git is a distributed version control system, meaning every developer has a full copy of the repository on their local machine."
      }
    ]
  },
  {
    id: 2,
    tutorialId: 2, // corresponds to "Initialize a Git Repository"
    title: "Git Repository Initialization Quiz",
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
      },
      {
        id: 3,
        question: "What happens if you run 'git init' in a directory that's already a Git repository?",
        options: [
          "It will create a new repository inside the existing one",
          "It will reinitialize the existing repository",
          "It will throw an error",
          "It will delete the existing repository"
        ],
        correctAnswer: 1,
        explanation: "Running 'git init' in an existing repository is safe - it will simply reinitialize the repository without overwriting things that are already there."
      },
      {
        id: 4,
        question: "Which of these files is created by default when initializing a new Git repository?",
        options: [
          "README.md",
          ".gitignore",
          "config.json",
          "None of the above"
        ],
        correctAnswer: 3,
        explanation: "Git doesn't create any files in your working directory by default - it only creates the .git directory with its internal files."
      }
    ]
  },
  {
    id: 3,
    tutorialId: 3, // corresponds to "Adding Files to Git"
    title: "Adding Files to Git Quiz",
    questions: [
      {
        id: 1,
        question: "What command is used to add files to the staging area?",
        options: [
          "git commit",
          "git add",
          "git push",
          "git stage"
        ],
        correctAnswer: 1,
        explanation: "The 'git add' command adds files to the staging area, preparing them for commit."
      },
      {
        id: 2,
        question: "What does 'git add .' do?",
        options: [
          "Adds only hidden files",
          "Adds all new and modified files to staging",
          "Creates a new file",
          "Deletes all files"
        ],
        correctAnswer: 1,
        explanation: "The command 'git add .' adds all new and modified files in the current directory and its subdirectories to the staging area."
      },
      {
        id: 3,
        question: "Which command removes a file from the staging area?",
        options: [
          "git remove",
          "git reset",
          "git unstage",
          "git delete"
        ],
        correctAnswer: 1,
        explanation: "Use 'git reset' to remove files from the staging area while keeping them in your working directory."
      },
      {
        id: 4,
        question: "What's the difference between the working directory and staging area?",
        options: [
          "They are the same thing",
          "Working directory contains files, staging area is empty",
          "Working directory has your files, staging area has files ready to be committed",
          "Working directory is remote, staging area is local"
        ],
        correctAnswer: 2,
        explanation: "The working directory contains your current files, while the staging area holds the files that are ready to be included in your next commit."
      }
    ]
  }
];

export default quizzes;
