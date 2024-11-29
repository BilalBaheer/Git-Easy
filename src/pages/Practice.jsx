import { useState, useEffect, useRef } from 'react';
import Terminal from 'react-console-emulator';
import './Practice.css';

function Practice() {
  const [fileSystem, setFileSystem] = useState({
    '.git': {},
    'README.md': '# My Project\nThis is a sample project.',
    'index.html': '<!DOCTYPE html><html><body>Hello</body></html>',
    'src': {
      'app.js': 'console.log("Hello World");'
    }
  });

  const [currentBranch, setCurrentBranch] = useState('main');
  const [branches, setBranches] = useState(['main']);
  const [commits, setCommits] = useState([]);
  const [staged, setStaged] = useState([]);
  const [modified, setModified] = useState([]);
  const [showHelp, setShowHelp] = useState(true);
  const [commandFeedback, setCommandFeedback] = useState(null);

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

  const showFeedback = (message, type = 'success') => {
    setCommandFeedback({ message, type });
    setTimeout(() => setCommandFeedback(null), 3000);
  };

  const simulateGitCommand = (command, args) => {
    let result = '';
    
    switch (command) {
      case 'init':
        result = 'Initialized empty Git repository in .git/';
        showFeedback(result);
        break;
      
      case 'status':
        result = `On branch ${currentBranch}
${staged.length > 0 ? '\nChanges to be committed:\n  ' + staged.join('\n  ') : ''}
${modified.length > 0 ? '\nModified files:\n  ' + modified.join('\n  ') : ''}
${Object.keys(fileSystem).filter(f => f !== '.git' && !staged.includes(f) && !modified.includes(f)).length > 0 ? '\nUntracked files:\n  ' + Object.keys(fileSystem).filter(f => f !== '.git' && !staged.includes(f) && !modified.includes(f)).join('\n  ') : ''}`;
        break;
      
      case 'add':
        if (args[0] === '.') {
          const newStaged = Object.keys(fileSystem).filter(f => f !== '.git');
          setStaged(newStaged);
          return `Added ${newStaged.length} files to staging area`;
        }
        if (fileSystem[args[0]]) {
          setStaged([...staged, args[0]]);
          return `Added ${args[0]} to staging area`;
        }
        return `fatal: pathspec '${args[0]}' did not match any files`;
      
      case 'commit':
        if (staged.length === 0) return 'nothing to commit, working tree clean';
        if (!args.includes('-m')) return 'please provide a commit message with -m "message"';
        const message = args[args.indexOf('-m') + 1];
        const newCommit = {
          hash: Math.random().toString(36).substring(2, 10),
          message,
          branch: currentBranch,
          files: [...staged]
        };
        setCommits([...commits, newCommit]);
        setStaged([]);
        return `[${currentBranch} ${newCommit.hash}] ${message}\n ${staged.length} files changed`;
      
      case 'branch':
        if (args.length === 0) {
          return branches.map(b => (b === currentBranch ? '* ' + b : '  ' + b)).join('\n');
        }
        if (branches.includes(args[0])) {
          return `fatal: A branch named '${args[0]}' already exists`;
        }
        setBranches([...branches, args[0]]);
        return `Created branch ${args[0]}`;
      
      case 'checkout':
        if (args[0] === '-b') {
          if (branches.includes(args[1])) {
            return `fatal: A branch named '${args[1]}' already exists`;
          }
          setBranches([...branches, args[1]]);
          setCurrentBranch(args[1]);
          return `Switched to a new branch '${args[1]}'`;
        }
        if (!branches.includes(args[0])) {
          return `error: pathspec '${args[0]}' did not match any file(s) known to git`;
        }
        setCurrentBranch(args[0]);
        return `Switched to branch '${args[0]}'`;
      
      case 'log':
        if (commits.length === 0) return 'no commits yet';
        return commits
          .filter(c => c.branch === currentBranch)
          .map(c => `commit ${c.hash}\nAuthor: User <user@example.com>\n\n    ${c.message}\n`)
          .join('\n');
      
      default:
        return `git: '${command}' is not a git command. See 'git help'.`;
    }
    
    return result;
  };

  const terminalCommands = {
    help: {
      description: 'Show available commands',
      fn: () => {
        return `Available commands:
  help                    Show available commands
  git init               Initialize repository
  git status             Check repository status
  git add <file>         Stage changes
  git commit -m "msg"    Commit changes
  git branch             List branches
  git checkout <branch>  Switch branches
  git log                View history
  clear                  Clear terminal
`;
      }
    },
    git: {
      description: 'Git command',
      fn: (...args) => {
        if (args.length === 0) return 'usage: git <command> [<args>]';
        const [command, ...cmdArgs] = args;
        return simulateGitCommand(command, cmdArgs);
      }
    },
    clear: {
      description: 'Clear terminal',
      fn: () => {
        if (terminalRef.current) {
          terminalRef.current.clearStdout();
        }
        return '';
      }
    }
  };

  return (
    <div className="practice-container">
      <div className="practice-header">
        <h1 className="practice-title">Git Practice Terminal</h1>
        <p className="practice-description">
          A simulated environment to practice Git commands safely.
        </p>
      </div>
      
      <div className="practice-content">
        <div className="terminal-section">
          <div className="terminal-window">
            <div className="terminal-titlebar">
              <div className="titlebar-buttons">
                <span className="titlebar-button close"></span>
                <span className="titlebar-button minimize"></span>
                <span className="titlebar-button maximize"></span>
              </div>
              <div className="titlebar-title">git-terminal</div>
            </div>
            <Terminal
              ref={terminalRef}
              commands={terminalCommands}
              promptLabel={`${currentBranch} $`}
              noDefaults
              className="terminal-content"
              contentStyle={{ 
                color: '#00ff00',
                backgroundColor: '#1a1a1a',
                padding: '16px',
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontSize: '14px',
                lineHeight: '1.6',
                height: '100%',
                overflow: 'auto'
              }}
              promptLabelStyle={{ 
                color: '#00ff00',
                fontWeight: 'bold',
                marginRight: '8px'
              }}
              autoFocus
              ignoreCommandCase
              clearOnLoad={true}
              dangerMode={false}
              noEchoBack={false}
            />
          </div>
        </div>

        <div className="info-section">
          <div className="info-card repository-status">
            <h2 className="info-title">Repository Status</h2>
            <div className="info-content">
              <div className="status-item">
                <span className="status-label">Current Branch</span>
                <span className="status-value branch-name">{currentBranch}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Staged Files</span>
                <span className="status-value staged-count">{staged.length}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Modified Files</span>
                <span className="status-value modified-count">{modified.length}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Total Commits</span>
                <span className="status-value commit-count">{commits.length}</span>
              </div>
            </div>
          </div>

          <div className="info-card working-directory">
            <h2 className="info-title">Working Directory</h2>
            <div className="info-content file-list">
              {Object.entries(fileSystem).map(([name, content]) => (
                <div key={name} className="file-item">
                  <span className="file-icon">{typeof content === 'object' ? '' : ''}</span>
                  <span className={`flex-1 ${getFileStatus(name) === 'staged' ? 'text-green-600' : getFileStatus(name) === 'modified' ? 'text-yellow-600' : 'text-gray-600'}`}>{name}</span>
                  <span className={`status-badge ${getFileStatus(name) === 'staged' ? 'status-badge-staged' : getFileStatus(name) === 'modified' ? 'status-badge-modified' : 'status-badge-untracked'}`}>{getFileStatus(name)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="info-card quick-help">
            <div className="help-header">
              <h2 className="info-title">Quick Help</h2>
              <button onClick={() => setShowHelp(!showHelp)} className="help-toggle">
                {showHelp ? 'Hide' : 'Show'}
              </button>
            </div>
            {showHelp && (
              <div className="info-content command-list">
                <div className="command-item">
                  <code>git init</code>
                  <span>Initialize repository</span>
                </div>
                <div className="command-item">
                  <code>git status</code>
                  <span>Check status</span>
                </div>
                <div className="command-item">
                  <code>git add &lt;file&gt;</code>
                  <span>Stage changes</span>
                </div>
                <div className="command-item">
                  <code>git commit -m</code>
                  <span>Commit changes</span>
                </div>
                <div className="command-item">
                  <code>git branch</code>
                  <span>List branches</span>
                </div>
                <div className="command-item">
                  <code>git checkout</code>
                  <span>Switch branches</span>
                </div>
                <div className="command-item">
                  <code>git log</code>
                  <span>View history</span>
                </div>
                <div className="command-item">
                  <code>clear</code>
                  <span>Clear terminal</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;
