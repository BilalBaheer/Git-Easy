const exercises = [
  {
    id: 1,
    category: "Basics",
    title: "Initialize a Repository",
    description: "Create a new Git repository in your project directory.",
    task: "Initialize a new Git repository.",
    solution: "git init",
    hint: "Use the git init command",
    initialFiles: {
      'README.md': '# My Project\nThis is a sample project.',
      'index.html': '<!DOCTYPE html><html><body>Hello</body></html>'
    }
  },
  {
    id: 2,
    category: "Basics",
    title: "Check Repository Status",
    description: "View the current state of your repository.",
    task: "Check which files are tracked, untracked, or modified.",
    solution: "git status",
    hint: "Use the command that shows the working tree status"
  },
  {
    id: 3,
    category: "Basics",
    title: "Add Files to Staging",
    description: "Stage files for commit.",
    task: "Add all files to the staging area.",
    solution: "git add .",
    hint: "Use git add with a dot to stage all files"
  },
  {
    id: 4,
    category: "Basics",
    title: "Commit Changes",
    description: "Create your first commit.",
    task: 'Make a commit with the message "Initial commit"',
    solution: 'git commit -m "Initial commit"',
    hint: "Use git commit with the -m flag for the message"
  },
  {
    id: 5,
    category: "Basics",
    title: "View Commit History",
    description: "Check your repository's commit history.",
    task: "View all commits made to the repository.",
    solution: "git log",
    hint: "Use the command that shows commit logs"
  },
  {
    id: 6,
    category: "Branching",
    title: "Create a Branch",
    description: "Create a new feature branch.",
    task: 'Create a new branch named "feature"',
    solution: "git branch feature",
    hint: "Use git branch followed by the branch name"
  },
  {
    id: 7,
    category: "Branching",
    title: "Switch Branches",
    description: "Move to a different branch.",
    task: 'Switch to the "feature" branch',
    solution: "git checkout feature",
    hint: "Use git checkout to switch branches"
  },
  {
    id: 8,
    category: "Branching",
    title: "Create and Switch Branch",
    description: "Create a new branch and switch to it in one command.",
    task: 'Create and switch to a new branch named "development"',
    solution: "git checkout -b development",
    hint: "Use git checkout with the -b flag"
  },
  {
    id: 9,
    category: "Branching",
    title: "List All Branches",
    description: "View all branches in the repository.",
    task: "Show all local branches.",
    solution: "git branch",
    hint: "Use git branch without any arguments"
  },
  {
    id: 10,
    category: "Branching",
    title: "Delete Branch",
    description: "Remove an unused branch.",
    task: 'Delete the "feature" branch',
    solution: "git branch -d feature",
    hint: "Use git branch with the -d flag"
  },
  {
    id: 11,
    category: "Changes",
    title: "View File Changes",
    description: "See what changes have been made to files.",
    task: "View changes in working directory.",
    solution: "git diff",
    hint: "Use git diff to see unstaged changes"
  },
  {
    id: 12,
    category: "Changes",
    title: "View Staged Changes",
    description: "Check changes in staging area.",
    task: "View changes that are staged for commit.",
    solution: "git diff --staged",
    hint: "Use git diff with the --staged flag"
  },
  {
    id: 13,
    category: "Changes",
    title: "Unstage Files",
    description: "Remove files from staging area.",
    task: "Unstage all staged files.",
    solution: "git reset",
    hint: "Use git reset to unstage files"
  },
  {
    id: 14,
    category: "Changes",
    title: "Discard Changes",
    description: "Discard changes in working directory.",
    task: "Discard changes to index.html",
    solution: "git checkout -- index.html",
    hint: "Use git checkout with -- and the filename"
  },
  {
    id: 15,
    category: "Changes",
    title: "Rename Files",
    description: "Rename a file using Git.",
    task: 'Rename "index.html" to "home.html"',
    solution: "git mv index.html home.html",
    hint: "Use git mv for moving/renaming files"
  },
  {
    id: 16,
    category: "Remote",
    title: "Add Remote Repository",
    description: "Connect to a remote repository.",
    task: 'Add a remote named "origin"',
    solution: "git remote add origin [URL]",
    hint: "Use git remote add with name and URL"
  },
  {
    id: 17,
    category: "Remote",
    title: "List Remotes",
    description: "View all remote repositories.",
    task: "Show all remote repositories.",
    solution: "git remote -v",
    hint: "Use git remote with the -v flag"
  },
  {
    id: 18,
    category: "Remote",
    title: "Push Changes",
    description: "Push commits to remote repository.",
    task: 'Push commits to "origin" remote',
    solution: "git push origin main",
    hint: "Use git push with remote and branch names"
  },
  {
    id: 19,
    category: "Remote",
    title: "Pull Changes",
    description: "Get changes from remote repository.",
    task: "Pull latest changes from remote.",
    solution: "git pull",
    hint: "Use git pull to fetch and merge changes"
  },
  {
    id: 20,
    category: "Remote",
    title: "Clone Repository",
    description: "Clone a remote repository.",
    task: "Clone a repository from URL.",
    solution: "git clone [URL]",
    hint: "Use git clone with the repository URL"
  },
  {
    id: 21,
    category: "Advanced",
    title: "Interactive Rebase",
    description: "Modify commit history.",
    task: "Start an interactive rebase.",
    solution: "git rebase -i HEAD~3",
    hint: "Use git rebase with the -i flag"
  },
  {
    id: 22,
    category: "Advanced",
    title: "Cherry Pick",
    description: "Apply specific commits to current branch.",
    task: "Cherry-pick a commit.",
    solution: "git cherry-pick [commit-hash]",
    hint: "Use git cherry-pick with commit hash"
  },
  {
    id: 23,
    category: "Advanced",
    title: "Create Tag",
    description: "Create a new tag for release.",
    task: 'Create a tag named "v1.0"',
    solution: "git tag v1.0",
    hint: "Use git tag to create version tags"
  },
  {
    id: 24,
    category: "Advanced",
    title: "Stash Changes",
    description: "Temporarily store modified files.",
    task: "Stash current changes.",
    solution: "git stash",
    hint: "Use git stash to save changes"
  },
  {
    id: 25,
    category: "Advanced",
    title: "Apply Stash",
    description: "Restore stashed changes.",
    task: "Apply most recent stash.",
    solution: "git stash pop",
    hint: "Use git stash pop to apply and remove stash"
  },
  {
    id: 26,
    category: "Configuration",
    title: "Set User Name",
    description: "Configure Git username.",
    task: 'Set Git username to "John Doe"',
    solution: 'git config --global user.name "John Doe"',
    hint: "Use git config to set user.name"
  },
  {
    id: 27,
    category: "Configuration",
    title: "Set User Email",
    description: "Configure Git email.",
    task: 'Set Git email to "john@example.com"',
    solution: 'git config --global user.email "john@example.com"',
    hint: "Use git config to set user.email"
  },
  {
    id: 28,
    category: "Configuration",
    title: "List Configuration",
    description: "View all Git configurations.",
    task: "Show all Git configurations.",
    solution: "git config --list",
    hint: "Use git config with --list flag"
  },
  {
    id: 29,
    category: "Merging",
    title: "Merge Branch",
    description: "Merge changes from another branch.",
    task: 'Merge "feature" branch into current branch',
    solution: "git merge feature",
    hint: "Use git merge with branch name"
  },
  {
    id: 30,
    category: "Merging",
    title: "Abort Merge",
    description: "Cancel an ongoing merge.",
    task: "Abort current merge operation.",
    solution: "git merge --abort",
    hint: "Use git merge with --abort flag"
  },
  {
    id: 31,
    category: "History",
    title: "Show Commit Details",
    description: "View detailed commit information.",
    task: "Show details of latest commit.",
    solution: "git show",
    hint: "Use git show to view commit details"
  },
  {
    id: 32,
    category: "History",
    title: "View File History",
    description: "See changes to specific file.",
    task: "View commit history for README.md",
    solution: "git log -- README.md",
    hint: "Use git log with -- and filename"
  },
  {
    id: 33,
    category: "History",
    title: "Blame",
    description: "See who changed which lines.",
    task: "Show who modified each line of README.md",
    solution: "git blame README.md",
    hint: "Use git blame with filename"
  },
  {
    id: 34,
    category: "Recovery",
    title: "Recover Deleted File",
    description: "Restore a deleted file.",
    task: "Restore deleted index.html",
    solution: "git checkout HEAD -- index.html",
    hint: "Use git checkout with HEAD and filename"
  },
  {
    id: 35,
    category: "Recovery",
    title: "Reset to Commit",
    description: "Reset branch to specific commit.",
    task: "Reset to previous commit.",
    solution: "git reset HEAD~1",
    hint: "Use git reset with HEAD~1"
  },
  {
    id: 36,
    category: "Cleanup",
    title: "Clean Working Directory",
    description: "Remove untracked files.",
    task: "Remove all untracked files.",
    solution: "git clean -f",
    hint: "Use git clean with -f flag"
  },
  {
    id: 37,
    category: "Cleanup",
    title: "Prune Remote Branches",
    description: "Clean up deleted remote branches.",
    task: "Prune remote-tracking branches.",
    solution: "git remote prune origin",
    hint: "Use git remote prune"
  },
  {
    id: 38,
    category: "Submodules",
    title: "Add Submodule",
    description: "Add a Git submodule.",
    task: "Add a submodule from URL.",
    solution: "git submodule add [URL]",
    hint: "Use git submodule add with URL"
  },
  {
    id: 39,
    category: "Submodules",
    title: "Update Submodules",
    description: "Update all submodules.",
    task: "Update all submodules.",
    solution: "git submodule update --remote",
    hint: "Use git submodule update"
  },
  {
    id: 40,
    category: "Workflow",
    title: "Create Feature Branch",
    description: "Start work on new feature.",
    task: 'Create and switch to "feature/login"',
    solution: "git checkout -b feature/login",
    hint: "Use git checkout -b with feature prefix"
  },
  {
    id: 41,
    category: "Workflow",
    title: "Squash Commits",
    description: "Combine multiple commits.",
    task: "Squash last 3 commits.",
    solution: "git rebase -i HEAD~3",
    hint: "Use interactive rebase"
  },
  {
    id: 42,
    category: "Workflow",
    title: "Rebase Branch",
    description: "Rebase current branch.",
    task: "Rebase onto main branch.",
    solution: "git rebase main",
    hint: "Use git rebase with base branch"
  },
  {
    id: 43,
    category: "Remote",
    title: "Fetch Remote Changes",
    description: "Get remote changes without merging.",
    task: "Fetch from remote repository.",
    solution: "git fetch origin",
    hint: "Use git fetch with remote name"
  },
  {
    id: 44,
    category: "Remote",
    title: "Track Remote Branch",
    description: "Set up branch tracking.",
    task: 'Track remote "development" branch',
    solution: "git checkout --track origin/development",
    hint: "Use git checkout with --track"
  },
  {
    id: 45,
    category: "Debugging",
    title: "Bisect Start",
    description: "Find problematic commit.",
    task: "Start binary search for bug.",
    solution: "git bisect start",
    hint: "Use git bisect to find issues"
  },
  {
    id: 46,
    category: "Debugging",
    title: "Find String in History",
    description: "Search through commit history.",
    task: 'Search for "bug" in commits',
    solution: 'git log -S "bug"',
    hint: "Use git log with -S flag"
  },
  {
    id: 47,
    category: "Advanced",
    title: "Create Patch",
    description: "Create patch from changes.",
    task: "Create patch from last commit.",
    solution: "git format-patch -1",
    hint: "Use git format-patch"
  },
  {
    id: 48,
    category: "Advanced",
    title: "Apply Patch",
    description: "Apply a patch file.",
    task: "Apply patch file.",
    solution: "git apply patch-file",
    hint: "Use git apply with patch file"
  },
  {
    id: 49,
    category: "Workflow",
    title: "Merge with Message",
    description: "Merge with custom message.",
    task: 'Merge feature with message "Release v1.0"',
    solution: 'git merge feature -m "Release v1.0"',
    hint: "Use git merge with -m flag"
  },
  {
    id: 50,
    category: "Advanced",
    title: "Reflog Inspection",
    description: "View reference logs.",
    task: "Show reflog history.",
    solution: "git reflog",
    hint: "Use git reflog to see reference history"
  }
];

export default exercises;
