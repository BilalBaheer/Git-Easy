const tutorials = [
  {
    id: 1,
    title: "Getting Started with Git",
    sections: [
      {
        title: "What is Git?",
        content: "Git is a distributed version control system that helps you track changes in your code. It allows multiple developers to work together on the same project efficiently.",
        example: "",
        practice: "Let's start by understanding the basic concepts of Git.",
      },
      {
        title: "Why Use Git?",
        content: "Git helps you:\n- Track changes in your code\n- Collaborate with other developers\n- Maintain different versions of your project\n- Revert to previous versions if needed\n- Work on features independently",
        example: "",
        practice: "Think about how Git could help in your development workflow.",
      }
    ]
  },
  {
    id: 2,
    title: "Initialize a Git Repository",
    sections: [
      {
        title: "Creating a New Repository",
        content: "To start using Git in your project, you need to initialize a repository using 'git init'.",
        example: "git init",
        practice: "Try initializing a Git repository using the terminal.",
      },
      {
        title: "Understanding the .git Directory",
        content: "The .git directory contains all the information necessary for Git to track your project. It's created automatically when you run 'git init'.",
        example: "ls -la .git",
        practice: "Explore the contents of the .git directory.",
      }
    ]
  },
  {
    id: 3,
    title: "Adding Files to Git",
    sections: [
      {
        title: "Staging Files",
        content: "Use 'git add' to stage files for commit. This tells Git which changes you want to include in your next commit.",
        example: "git add filename.txt\ngit add .",
        practice: "Stage some files using git add.",
      },
      {
        title: "Checking Status",
        content: "Use 'git status' to see which files are staged, modified, or untracked.",
        example: "git status",
        practice: "Check the status of your repository.",
      }
    ]
  },
  {
    id: 4,
    title: "Making Commits",
    sections: [
      {
        title: "Creating Commits",
        content: "A commit is a snapshot of your changes. Use 'git commit' to save your staged changes with a descriptive message.",
        example: "git commit -m \"Add login feature\"",
        practice: "Create a commit with a meaningful message.",
      },
      {
        title: "Commit Best Practices",
        content: "- Write clear, concise commit messages\n- Make atomic commits (one feature/fix per commit)\n- Commit frequently\n- Use present tense in commit messages",
        example: "git commit -m \"Add password validation to login form\"",
        practice: "Practice creating well-structured commits.",
      }
    ]
  },
  {
    id: 5,
    title: "Working with Branches",
    sections: [
      {
        title: "Creating Branches",
        content: "Branches allow you to work on features independently. Create a new branch using 'git branch' or 'git checkout -b'.",
        example: "git branch feature-login\ngit checkout -b feature-signup",
        practice: "Create and switch to a new branch.",
      },
      {
        title: "Switching Branches",
        content: "Use 'git checkout' to switch between branches.",
        example: "git checkout main\ngit checkout feature-login",
        practice: "Practice switching between different branches.",
      }
    ]
  },
  {
    id: 6,
    title: "Merging Changes",
    sections: [
      {
        title: "Basic Merging",
        content: "Merge changes from one branch into another using 'git merge'.",
        example: "git checkout main\ngit merge feature-login",
        practice: "Try merging a feature branch into main.",
      },
      {
        title: "Handling Merge Conflicts",
        content: "Merge conflicts occur when Git can't automatically merge changes. You'll need to resolve them manually.",
        example: "# After conflict:\ngit add .\ngit commit -m \"Resolve merge conflicts\"",
        practice: "Create and resolve a merge conflict.",
      }
    ]
  },
  {
    id: 7,
    title: "Remote Repositories",
    sections: [
      {
        title: "Adding Remotes",
        content: "Connect your local repository to a remote repository using 'git remote add'.",
        example: "git remote add origin https://github.com/username/repo.git",
        practice: "Add a remote repository.",
      },
      {
        title: "Pushing and Pulling",
        content: "Use 'git push' to send changes to remote and 'git pull' to get changes from remote.",
        example: "git push origin main\ngit pull origin main",
        practice: "Practice pushing and pulling changes.",
      }
    ]
  },
  {
    id: 8,
    title: "Advanced Git Features",
    sections: [
      {
        title: "Git Stash",
        content: "Temporarily store uncommitted changes using 'git stash'.",
        example: "git stash\ngit stash pop",
        practice: "Use git stash to save and restore changes.",
      },
      {
        title: "Interactive Rebase",
        content: "Modify commit history using interactive rebase.",
        example: "git rebase -i HEAD~3",
        practice: "Try interactive rebase to squash commits.",
      }
    ]
  },
  {
    id: 9,
    title: "Git Best Practices",
    sections: [
      {
        title: "Workflow Strategies",
        content: "Learn about different Git workflows:\n- Feature Branch Workflow\n- Gitflow Workflow\n- Forking Workflow",
        example: "",
        practice: "Choose and implement a Git workflow.",
      },
      {
        title: "Code Review Process",
        content: "Best practices for code reviews:\n- Create descriptive pull requests\n- Review code in small chunks\n- Provide constructive feedback",
        example: "",
        practice: "Practice creating and reviewing pull requests.",
      }
    ]
  },
  {
    id: 10,
    title: "Pull Requests",
    sections: [
      {
        title: "Creating Pull Requests",
        content: "Pull requests (PRs) let you tell others about changes you've pushed to a branch in a repository. Learn how to:\n- Create a new PR\n- Write descriptive PR titles and descriptions\n- Add reviewers and labels\n- Link related issues\n- Include relevant screenshots or GIFs",
        example: "# Steps to create a PR:\n1. Push your branch\ngit push origin feature-branch\n\n2. Go to repository on GitHub\n3. Click 'New Pull Request'\n4. Select your branch\n5. Fill in description\n6. Add reviewers",
        practice: "Create a pull request for a feature branch with a clear description and proper documentation.",
      },
      {
        title: "Reviewing Pull Requests",
        content: "Learn best practices for reviewing PRs:\n- Check code quality and style\n- Test functionality\n- Review documentation\n- Provide constructive feedback\n- Suggest improvements\n- Approve or request changes",
        example: "# Common PR review commands:\ngit fetch origin\ngit checkout feature-branch\ngit pull origin feature-branch\n\n# Test changes locally\n# Add review comments on GitHub",
        practice: "Review a teammate's pull request and provide constructive feedback.",
      }
    ]
  },
  {
    id: 11,
    title: "Resolving Merge Conflicts",
    sections: [
      {
        title: "Understanding Merge Conflicts",
        content: "Learn what causes merge conflicts and how to identify them:\n- Multiple changes to the same line\n- Deleted files that were modified\n- Renamed files with changes\n\nConflict markers explained:\n<<<<<<< HEAD\nYour changes\n=======\nTheir changes\n>>>>>>> branch-name",
        example: "# Example of a conflict:\n<<<<<<< HEAD\nconst greeting = 'Hello';\n=======\nconst greeting = 'Hi';\n>>>>>>> feature-branch",
        practice: "Identify different types of merge conflicts in a sample repository.",
      },
      {
        title: "Resolving Complex Conflicts",
        content: "Advanced techniques for resolving conflicts:\n\n1. Using merge tools:\n- VS Code built-in merger\n- GitKraken\n- Beyond Compare\n\n2. Strategic resolution:\n- Understand both changes\n- Preserve functionality\n- Maintain code quality\n\n3. Communication:\n- Discuss with team members\n- Document resolution decisions\n- Update related tickets",
        example: "# Steps to resolve conflict:\n1. git status  # identify conflicted files\n2. Open files and locate conflicts\n3. Choose or combine changes\n4. Remove conflict markers\n5. git add .\n6. git commit -m \"Resolve merge conflicts\"\n7. git push",
        practice: "Resolve a complex merge conflict involving multiple files and changes.",
      }
    ]
  }
];

export default tutorials;
