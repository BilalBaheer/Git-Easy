import { useState, useEffect, useRef } from 'react';
import Terminal from 'react-console-emulator';
import exercises from '../data/exercises';
import './Practice.css';

function Practice() {
  const [currentExercise, setCurrentExercise] = useState(exercises[0]);
  const [fileSystem, setFileSystem] = useState({
    '.git': {},
    ...currentExercise.initialFiles || {
      'README.md': '# My Project\nThis is a sample project.',
      'index.html': '<!DOCTYPE html><html><body>Hello</body></html>',
      'src': {
        'app.js': 'console.log("Hello World");'
      }
    }
  });

  const [currentBranch, setCurrentBranch] = useState('main');
  const [branches, setBranches] = useState(['main']);
  const [commits, setCommits] = useState([]);
  const [staged, setStaged] = useState([]);
  const [modified, setModified] = useState([]);
  const [showHelp, setShowHelp] = useState(true);
  const [commandFeedback, setCommandFeedback] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const terminalRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const files = Object.keys(fileSystem).filter(f => f !== '.git');
      if (files.length > 0 && !modified.includes(files[0])) {
        setModified([...modified, files[0]]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [fileSystem, modified]);

  const getFileStatus = (filename) => {
    if (staged.includes(filename)) return 'staged';
    if (modified.includes(filename)) return 'modified';
    return 'untracked';
  };

  const generateStatusMessage = () => {
    const stagedFiles = Object.keys(fileSystem)
      .filter(f => f !== '.git' && staged.includes(f));
    
    const modifiedFiles = Object.keys(fileSystem)
      .filter(f => f !== '.git' && modified.includes(f));
    
    const untrackedFiles = Object.keys(fileSystem)
      .filter(f => f !== '.git' && !staged.includes(f) && !modified.includes(f));

    let message = `On branch ${currentBranch}\n`;

    if (stagedFiles.length === 0 && modifiedFiles.length === 0 && untrackedFiles.length === 0) {
      message += '\nNothing to commit, working tree clean';
    } else {
      if (stagedFiles.length > 0) {
        message += '\nChanges to be committed:\n';
        stagedFiles.forEach(file => {
          message += `  new file:   ${file}\n`;
        });
      }

      if (modifiedFiles.length > 0) {
        message += '\nChanges not staged for commit:\n';
        modifiedFiles.forEach(file => {
          message += `  modified:   ${file}\n`;
        });
      }

      if (untrackedFiles.length > 0) {
        message += '\nUntracked files:\n';
        untrackedFiles.forEach(file => {
          message += `  ${file}\n`;
        });
      }
    }

    return message;
  };

  const showFeedback = (message, type = 'success') => {
    setCommandFeedback({ message, type });
    setTimeout(() => setCommandFeedback(null), 3000);
  };

  const simulateGitCommand = (command, args) => {
    let result = '';
    const commandStr = args ? `${command} ${args.join(' ')}` : command;
    
    switch (command) {
      case 'init':
        result = 'Initialized empty Git repository in .git/';
        break;
      case 'status':
        result = generateStatusMessage();
        break;
      case 'add':
        if (args[0] === '.') {
          const files = Object.keys(fileSystem).filter(f => f !== '.git');
          setStaged([...new Set([...staged, ...files])]);
          result = '';
        } else {
          setStaged([...new Set([...staged, ...args])]);
          result = '';
        }
        break;
      // ... rest of your existing git command implementations ...
    }
    return result;
  };

  const commands = {
    git: {
      description: 'Git command',
      usage: 'git <command>',
      fn: (...args) => {
        if (args.length === 0) {
          return 'Usage: git <command>';
        }
        const [command, ...commandArgs] = args;
        // Construct the full command string including 'git'
        const fullCommand = `git ${command}${commandArgs.length > 0 ? ' ' + commandArgs.join(' ') : ''}`;
        
        // Check if this matches the solution before executing
        if (fullCommand.trim() === currentExercise.solution.trim()) {
          setShowSuccess(true);
          setShowNextButton(true);
        }
        
        return simulateGitCommand(command, commandArgs);
      }
    },
    clear: {
      description: 'Clear terminal',
      usage: 'clear',
      fn: () => {
        terminalRef.current?.clearStdout();
        return '';
      }
    },
    help: {
      description: 'Show help',
      usage: 'help',
      fn: () => {
        setShowHelp(true);
        return 'Showing help...';
      }
    }
  };

  const handleNextExercise = () => {
    const nextIndex = exercises.findIndex(ex => ex.id === currentExercise.id) + 1;
    if (nextIndex < exercises.length) {
      setCurrentExercise(exercises[nextIndex]);
      setShowSuccess(false);
      setShowNextButton(false);
      // Reset terminal state for new exercise
      if (terminalRef.current) {
        terminalRef.current.clearStdout();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Current Exercise</h2>
            <span className="text-sm text-gray-600">Exercise {currentExercise.id} of {exercises.length}</span>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">{currentExercise.title}</h3>
            <p className="text-blue-800 mb-4">{currentExercise.description}</p>
            <div className="bg-white rounded p-4 border border-blue-200">
              <p className="font-medium text-blue-900">Task:</p>
              <p className="text-blue-800">{currentExercise.task}</p>
            </div>
            {showHelp && (
              <div className="mt-4 bg-yellow-50 p-4 rounded border border-yellow-200">
                <p className="font-medium text-yellow-900">Hint:</p>
                <p className="text-yellow-800">{currentExercise.hint}</p>
              </div>
            )}
            {showSuccess && (
              <div className="mt-4 bg-green-50 p-4 rounded border border-green-200">
                <p className="text-green-800"> Great job! You've completed this exercise!</p>
                {showNextButton && (
                  <button
                    onClick={handleNextExercise}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    Next Exercise →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">File System</h3>
            <div className="space-y-2">
              {Object.entries(fileSystem).map(([filename, content]) => (
                <div key={filename} className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    getFileStatus(filename) === 'staged'
                      ? 'bg-green-100 text-green-800'
                      : getFileStatus(filename) === 'modified'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {getFileStatus(filename)}
                  </span>
                  <span>{filename}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black rounded-lg shadow-lg overflow-hidden">
            <Terminal
              ref={terminalRef}
              commands={commands}
              welcomeMessage={`Welcome to Git Practice!\nCurrent task: ${currentExercise.task}\nType 'help' for assistance.`}
              promptLabel={`${currentBranch} >`}
              className="h-96"
              contentClassName="p-4"
              styleEchoBack="fullInherit"
              noDefaults
            />
          </div>
        </div>

        {commandFeedback && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
            commandFeedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {commandFeedback.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Practice;
