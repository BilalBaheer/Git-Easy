import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import { ClockIcon, CodeBracketIcon, ArrowPathIcon, ScaleIcon } from '@heroicons/react/24/outline';
import ErrorBoundary from '../components/ErrorBoundary';

const Visualizer = () => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [scale, setScale] = useState(1);
  const [commitMessage, setCommitMessage] = useState('');
  const [showTimeline, setShowTimeline] = useState(false);
  const [commitStats, setCommitStats] = useState({ additions: 0, deletions: 0 });
  const [branchProtection, setBranchProtection] = useState({ main: true });
  const graphRef = useRef(null);
  const branchesRef = useRef({});

  // Enhanced template with more visual features
  const customTemplate = templateExtend(TemplateName.Metro, {
    author: "GitBetter <team@gitbetter.dev>",
    colors: ["#2563eb", "#16a34a", "#dc2626", "#9333ea", "#0891b2", "#c026d3"],
    branch: {
      lineWidth: 4,
      spacing: 50,
      label: {
        display: true,
        font: "bold 14px sans-serif",
        borderRadius: 10,
      }
    },
    commit: {
      spacing: 60,
      message: {
        displayAuthor: true,
        displayHash: true,
        font: "normal 14px sans-serif",
      },
      dot: {
        size: 10,
        strokeWidth: 2,
      },
      tooltipHTMLFormatter: (commit) => {
        return `
          <div class="bg-gray-800 text-white p-3 rounded-lg shadow-lg">
            <div class="font-bold">${commit.subject}</div>
            <div class="text-gray-300 text-sm">${commit.author}</div>
            <div class="text-gray-400 text-xs">${commit.hash}</div>
            ${showTimeline ? `<div class="text-gray-300 mt-1">${new Date().toLocaleString()}</div>` : ''}
          </div>
        `;
      }
    },
  });

  const createBranch = useCallback(() => {
    const branchName = prompt("Enter new branch name:");
    if (branchName && !branchesRef.current[branchName]) {
      const sourceBranch = branchesRef.current[selectedBranch];
      if (sourceBranch) {
        const newBranch = sourceBranch.branch(branchName);
        newBranch.commit({
          subject: `${branchName} branch created`,
          author: "GitBetter <team@gitbetter.dev>",
          style: {
            dot: {
              color: customTemplate.colors[Object.keys(branchesRef.current).length % customTemplate.colors.length],
            },
          },
        });
        branchesRef.current[branchName] = newBranch;
        setSelectedBranch(branchName);
      }
    }
  }, [selectedBranch]);

  const mergeToMain = useCallback(() => {
    if (branchProtection.main && !confirm("Main branch is protected. Are you sure you want to merge?")) {
      return;
    }
    
    const sourceBranch = branchesRef.current[selectedBranch];
    const mainBranch = branchesRef.current.main;
    if (sourceBranch && mainBranch && selectedBranch !== 'main') {
      mainBranch.merge({
        branch: sourceBranch,
        commitOptions: {
          subject: `Merge ${selectedBranch} into main`,
          author: "GitBetter <team@gitbetter.dev>",
          style: {
            dot: {
              color: "#9333ea",
            },
          },
        }
      });
    }
  }, [selectedBranch, branchProtection]);

  const addCommit = useCallback(() => {
    const branch = branchesRef.current[selectedBranch];
    if (branch) {
      // Simulate file changes
      const newStats = {
        additions: Math.floor(Math.random() * 50),
        deletions: Math.floor(Math.random() * 20),
      };
      setCommitStats(newStats);

      branch.commit({
        subject: commitMessage || `New commit on ${selectedBranch}`,
        author: "GitBetter <team@gitbetter.dev>",
        body: `Changes: +${newStats.additions} -${newStats.deletions}`,
        style: {
          dot: {
            color: newStats.deletions > newStats.additions ? "#dc2626" : "#16a34a",
          },
        }
      });
      setCommitMessage('');
    }
  }, [selectedBranch, commitMessage]);

  const handleZoom = useCallback((delta) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.max(0.5, Math.min(2, newScale));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Git Branch Visualizer</h1>
            <p className="text-gray-600">Create, visualize, and manage Git branches interactively</p>
          </div>
          
          <div className="mb-8 flex flex-wrap items-center justify-center gap-6 bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col items-center min-w-[200px]">
              <label htmlFor="branch-select" className="text-sm font-medium text-gray-700 mb-2">
                Current Branch
              </label>
              <select
                id="branch-select"
                className="w-full px-4 py-2 border-2 border-purple-200 rounded-lg bg-white text-purple-700 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                {Object.keys(branchesRef.current).map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col items-center min-w-[300px]">
              <label htmlFor="commit-message" className="text-sm font-medium text-gray-700 mb-2">
                Commit Message
              </label>
              <input
                id="commit-message"
                type="text"
                className="w-full px-4 py-2 bg-white border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400 shadow-sm hover:border-purple-300"
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="Enter commit message..."
              />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Actions</span>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                  onClick={createBranch}
                >
                  <CodeBracketIcon className="h-5 w-5" />
                  New Branch
                </button>
                
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                  onClick={addCommit}
                >
                  <ArrowPathIcon className="h-5 w-5" />
                  Add Commit
                </button>
                
                <button
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                  onClick={mergeToMain}
                >
                  Merge to Main
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                    showTimeline ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}
                  onClick={() => setShowTimeline(!showTimeline)}
                >
                  <ClockIcon className="h-5 w-5" />
                  Timeline
                </button>

                <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-gray-200 p-1">
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                    onClick={() => handleZoom(-0.1)}
                  >
                    <ScaleIcon className="h-5 w-5" />-
                  </button>
                  <span className="w-16 text-center font-medium text-gray-700">{Math.round(scale * 100)}%</span>
                  <button
                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                    onClick={() => handleZoom(0.1)}
                  >
                    <ScaleIcon className="h-5 w-5" />+
                  </button>
                </div>
              </div>

              {commitStats.additions > 0 || commitStats.deletions > 0 ? (
                <div className="text-sm text-gray-600">
                  Last commit: <span className="text-green-600">+{commitStats.additions}</span> <span className="text-red-600">-{commitStats.deletions}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div 
            className="relative w-full overflow-x-auto bg-white mb-8 shadow-inner p-4 rounded-lg"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}
          >
            <ErrorBoundary>
              <Gitgraph options={{ template: customTemplate }}>
                {(gitgraph) => {
                  if (!graphRef.current) {
                    graphRef.current = gitgraph;
                    
                    const main = gitgraph.branch("main");
                    main.commit({
                      subject: "Initial commit",
                      author: "GitBetter <team@gitbetter.dev>",
                      style: {
                        dot: {
                          color: customTemplate.colors[0],
                        },
                      },
                    });
                    branchesRef.current.main = main;

                    const feature = main.branch("feature");
                    feature.commit({
                      subject: "Feature branch created",
                      author: "GitBetter <team@gitbetter.dev>",
                      style: {
                        dot: {
                          color: customTemplate.colors[1],
                        },
                      },
                    });
                    branchesRef.current.feature = feature;

                    const bugfix = main.branch("bugfix");
                    bugfix.commit({
                      subject: "Bugfix branch created",
                      author: "GitBetter <team@gitbetter.dev>",
                      style: {
                        dot: {
                          color: customTemplate.colors[2],
                        },
                      },
                    });
                    branchesRef.current.bugfix = bugfix;
                  }
                }}
              </Gitgraph>
            </ErrorBoundary>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm font-medium">1</span>
                Select or create a new branch to work with
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">2</span>
                Enter a commit message and add commits to your branch
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium">3</span>
                Merge your changes into the main branch when ready
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium">4</span>
                Toggle timeline view and use zoom controls to adjust the visualization
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
