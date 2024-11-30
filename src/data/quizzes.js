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
  },
  {
    id: 4,
    tutorialId: 4, // corresponds to "Working with Branches"
    title: "Working with Branches Quiz",
    questions: [
      {
        id: 1,
        question: "What command creates a new branch?",
        options: [
          "git create branch",
          "git branch",
          "git new",
          "git checkout"
        ],
        correctAnswer: 1,
        explanation: "The 'git branch <branch-name>' command creates a new branch, but doesn't switch to it."
      },
      {
        id: 2,
        question: "How do you switch to a different branch?",
        options: [
          "git switch",
          "git checkout",
          "git move",
          "git change"
        ],
        correctAnswer: 1,
        explanation: "The 'git checkout <branch-name>' command switches to the specified branch."
      },
      {
        id: 3,
        question: "What's the shortcut command to create and switch to a new branch?",
        options: [
          "git branch -b",
          "git checkout -b",
          "git switch -c",
          "Both B and C"
        ],
        correctAnswer: 3,
        explanation: "Both 'git checkout -b' and 'git switch -c' create and switch to a new branch in one command."
      },
      {
        id: 4,
        question: "What happens to uncommitted changes when switching branches?",
        options: [
          "They are automatically committed",
          "They are lost forever",
          "They carry over to the new branch",
          "Git prevents switching unless changes are committed or stashed"
        ],
        correctAnswer: 3,
        explanation: "Git prevents switching branches with uncommitted changes that would conflict with files in the target branch to protect your work."
      }
    ]
  },
  {
    id: 5,
    tutorialId: 5, // corresponds to "Merging Changes"
    title: "Merging Changes Quiz",
    questions: [
      {
        id: 1,
        question: "Which command merges one branch into another?",
        options: [
          "git merge",
          "git combine",
          "git join",
          "git unite"
        ],
        correctAnswer: 0,
        explanation: "The 'git merge' command combines changes from one branch into your current branch."
      },
      {
        id: 2,
        question: "What is a fast-forward merge?",
        options: [
          "A merge that happens quickly",
          "A merge where the source branch is ahead of the target branch",
          "A merge that skips the commit history",
          "A merge between remote branches"
        ],
        correctAnswer: 1,
        explanation: "A fast-forward merge occurs when the target branch's commits are directly ahead of the current branch."
      },
      {
        id: 3,
        question: "What happens during a merge conflict?",
        options: [
          "Git automatically chooses the best version",
          "The merge is cancelled",
          "Git marks the conflicting areas in the files",
          "All files are deleted"
        ],
        correctAnswer: 2,
        explanation: "During a merge conflict, Git marks the conflicting areas in files with special markers, allowing you to resolve them manually."
      },
      {
        id: 4,
        question: "What command aborts a merge in progress?",
        options: [
          "git merge --abort",
          "git abort",
          "git cancel",
          "git reset --hard"
        ],
        correctAnswer: 0,
        explanation: "The 'git merge --abort' command safely cancels a merge and returns to the state before the merge began."
      }
    ]
  },
  {
    id: 6,
    tutorialId: 6, // corresponds to "Remote Repositories"
    title: "Remote Repositories Quiz",
    questions: [
      {
        id: 1,
        question: "What command adds a remote repository?",
        options: [
          "git remote add",
          "git add remote",
          "git push",
          "git clone"
        ],
        correctAnswer: 0,
        explanation: "The 'git remote add' command adds a new remote repository connection to your local repository."
      },
      {
        id: 2,
        question: "How do you download changes from a remote repository?",
        options: [
          "git push",
          "git pull",
          "git fetch",
          "git download"
        ],
        correctAnswer: 1,
        explanation: "The 'git pull' command fetches and merges changes from the remote repository into your current branch."
      },
      {
        id: 3,
        question: "What's the difference between fetch and pull?",
        options: [
          "They are the same thing",
          "Fetch downloads changes but doesn't merge, pull does both",
          "Fetch is faster than pull",
          "Pull is only for single files"
        ],
        correctAnswer: 1,
        explanation: "git fetch only downloads new data, while git pull downloads AND integrates changes into your current branch."
      },
      {
        id: 4,
        question: "What command shows all configured remotes?",
        options: [
          "git remote",
          "git remote -v",
          "git show remotes",
          "git list"
        ],
        correctAnswer: 1,
        explanation: "The 'git remote -v' command shows all remote repositories and their URLs."
      }
    ]
  },
  {
    id: 7,
    tutorialId: 7, // corresponds to "Advanced Git Features"
    title: "Advanced Git Features Quiz",
    questions: [
      {
        id: 1,
        question: "What does git rebase do?",
        options: [
          "Deletes a branch",
          "Moves or combines a sequence of commits",
          "Creates a new repository",
          "Backs up the repository"
        ],
        correctAnswer: 1,
        explanation: "Git rebase moves or combines a sequence of commits to a new base commit, creating a linear history."
      },
      {
        id: 2,
        question: "What command temporarily stores changes?",
        options: [
          "git save",
          "git stash",
          "git store",
          "git cache"
        ],
        correctAnswer: 1,
        explanation: "The 'git stash' command temporarily stores modified tracked files, letting you switch contexts."
      },
      {
        id: 3,
        question: "What does git cherry-pick do?",
        options: [
          "Removes commits",
          "Applies a specific commit from one branch to another",
          "Creates a new branch",
          "Merges branches"
        ],
        correctAnswer: 1,
        explanation: "Git cherry-pick applies the changes from a specific commit to your current branch."
      },
      {
        id: 4,
        question: "What command shows the commit history?",
        options: [
          "git history",
          "git log",
          "git show",
          "git commits"
        ],
        correctAnswer: 1,
        explanation: "The 'git log' command shows the commit history, including commit messages, authors, and dates."
      }
    ]
  },
  {
    id: 8,
    tutorialId: 8, // corresponds to "Git Best Practices"
    title: "Git Best Practices Quiz",
    questions: [
      {
        id: 1,
        question: "What is a good practice for commit messages?",
        options: [
          "Use single words",
          "Write descriptive messages in present tense",
          "Leave them empty",
          "Use only timestamps"
        ],
        correctAnswer: 1,
        explanation: "Good commit messages should be descriptive and written in present tense, explaining what the commit does."
      },
      {
        id: 2,
        question: "How often should you commit changes?",
        options: [
          "Only at the end of the day",
          "After completing the entire feature",
          "After each logical change",
          "Once a week"
        ],
        correctAnswer: 2,
        explanation: "Commit after each logical change to maintain a clear history and make it easier to track changes."
      },
      {
        id: 3,
        question: "What should you do before pushing to a shared branch?",
        options: [
          "Nothing special",
          "Delete the branch",
          "Pull the latest changes",
          "Create a new branch"
        ],
        correctAnswer: 2,
        explanation: "Always pull the latest changes before pushing to avoid conflicts and ensure you're working with the most recent code."
      },
      {
        id: 4,
        question: "What should a .gitignore file contain?",
        options: [
          "Source code files",
          "Important documentation",
          "Temporary files and sensitive data",
          "README files"
        ],
        correctAnswer: 2,
        explanation: "The .gitignore file should list temporary files, build artifacts, and sensitive data that shouldn't be version controlled."
      }
    ]
  },
  {
    id: 9,
    tutorialId: 9, // corresponds to "Pull Requests"
    title: "Pull Requests Quiz",
    questions: [
      {
        id: 1,
        question: "What is a pull request?",
        options: [
          "A way to download code",
          "A request to merge changes from one branch to another",
          "A way to create branches",
          "A type of git repository"
        ],
        correctAnswer: 1,
        explanation: "A pull request is a way to notify team members about changes you've pushed and request their review before merging."
      },
      {
        id: 2,
        question: "What should you do before creating a pull request?",
        options: [
          "Delete the branch",
          "Review your changes and test your code",
          "Merge directly to main",
          "Close all other pull requests"
        ],
        correctAnswer: 1,
        explanation: "Before creating a pull request, review your changes, test your code, and ensure it follows project guidelines."
      },
      {
        id: 3,
        question: "Who can review a pull request?",
        options: [
          "Only the repository owner",
          "Anyone with repository access",
          "Only the pull request creator",
          "Only external contributors"
        ],
        correctAnswer: 1,
        explanation: "Anyone with repository access can review a pull request, though some repositories may have specific reviewer requirements."
      },
      {
        id: 4,
        question: "What happens after a pull request is merged?",
        options: [
          "The branch is automatically deleted",
          "Changes are integrated into the target branch",
          "A new repository is created",
          "The repository is locked"
        ],
        correctAnswer: 1,
        explanation: "After merging, the changes are integrated into the target branch, and you typically have the option to delete the source branch."
      }
    ]
  },
  {
    id: 10,
    tutorialId: 10, // corresponds to "Resolving Merge Conflicts"
    title: "Resolving Merge Conflicts Quiz",
    questions: [
      {
        id: 1,
        question: "What causes a merge conflict?",
        options: [
          "Having too many branches",
          "Changes to the same lines in different branches",
          "Using the wrong Git commands",
          "Having too many commits"
        ],
        correctAnswer: 1,
        explanation: "Merge conflicts occur when different branches have made changes to the same lines in a file."
      },
      {
        id: 2,
        question: "How does Git mark conflicts in files?",
        options: [
          "It deletes the conflicting lines",
          "It creates a new file",
          "It uses <<<<<<< and >>>>>>> markers",
          "It highlights the lines in red"
        ],
        correctAnswer: 2,
        explanation: "Git marks conflicts with special markers (<<<<<<< HEAD, =======, and >>>>>>>), showing both versions of the conflicting code."
      },
      {
        id: 3,
        question: "What should you do after resolving a conflict?",
        options: [
          "Nothing, Git handles it",
          "Delete the file and start over",
          "Add the file and commit the changes",
          "Create a new branch"
        ],
        correctAnswer: 2,
        explanation: "After resolving conflicts, you need to add the resolved files and commit the changes to complete the merge."
      },
      {
        id: 4,
        question: "How can you prevent merge conflicts?",
        options: [
          "Never create branches",
          "Communicate with team and regularly sync branches",
          "Only work on one file at a time",
          "Disable merging"
        ],
        correctAnswer: 1,
        explanation: "Regular communication with team members and frequently syncing branches helps minimize merge conflicts."
      }
    ]
  }
];

export default quizzes;
