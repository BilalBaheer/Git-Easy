import React, { useState, useRef, useCallback } from 'react';
import { Gitgraph, templateExtend, TemplateName } from '@gitgraph/react';
import ErrorBoundary from '../components/ErrorBoundary';

const Visualizer = () => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [scale, setScale] = useState(1);
  const graphRef = useRef(null);
  const branchesRef = useRef({});

  // Create custom template with author information
  const customTemplate = templateExtend(TemplateName.Metro, {
    author: "GitBetter <team@gitbetter.dev>",
    colors: ["#2563eb", "#16a34a", "#dc2626"],
    branch: {
      lineWidth: 3,
      spacing: 50,
    },
    commit: {
      spacing: 60,
      message: {
        displayAuthor: true,
        displayHash: false,
        font: "normal 14px sans-serif",
      },
      dot: {
        size: 8,
      },
    },
  });

  const mergeToMain = useCallback(() => {
    const sourceBranch = branchesRef.current[selectedBranch];
    const mainBranch = branchesRef.current.main;
    if (sourceBranch && mainBranch && selectedBranch !== 'main') {
      mainBranch.merge({
        branch: sourceBranch,
        commitOptions: {
          author: "GitBetter <team@gitbetter.dev>"
        }
      });
    }
  }, [selectedBranch]);

  const addCommit = useCallback(() => {
    const branch = branchesRef.current[selectedBranch];
    if (branch) {
      branch.commit({
        subject: `New commit on ${selectedBranch}`,
        author: "GitBetter <team@gitbetter.dev>"
      });
    }
  }, [selectedBranch]);

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
          
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col items-center">
              <label htmlFor="branch-select" className="text-sm font-medium text-gray-700 mb-2">
                Select Branch
              </label>
              <select
                id="branch-select"
                className="px-4 py-2 border-2 border-purple-200 rounded-lg bg-white text-purple-700 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
              >
                <option value="main">main</option>
                <option value="feature">feature</option>
                <option value="bugfix">bugfix</option>
              </select>
            </div>

            <div className="hidden sm:block h-12 w-px bg-gray-300"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Actions</span>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center gap-2 shadow-sm"
                  onClick={addCommit}
                >
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

            <div className="hidden sm:block h-12 w-px bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-700 mb-2">Zoom Level</span>
              <div className="flex items-center gap-2 bg-white rounded-lg border-2 border-gray-200 p-1">
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                  onClick={() => handleZoom(-0.1)}
                >
                  -
                </button>
                <span className="w-16 text-center font-medium text-gray-700">{Math.round(scale * 100)}%</span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
                  onClick={() => handleZoom(0.1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div 
            className="relative w-full overflow-x-auto bg-white mb-8 shadow-inner p-4"
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
                      author: "GitBetter <team@gitbetter.dev>"
                    });
                    branchesRef.current.main = main;

                    const feature = main.branch("feature");
                    feature.commit({
                      subject: "Feature branch created",
                      author: "GitBetter <team@gitbetter.dev>"
                    });
                    branchesRef.current.feature = feature;

                    const bugfix = main.branch("bugfix");
                    bugfix.commit({
                      subject: "Bugfix branch created",
                      author: "GitBetter <team@gitbetter.dev>"
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
                Select a branch from the dropdown menu
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">2</span>
                Click "Add Commit" to add a new commit to the selected branch
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-sm font-medium">3</span>
                Click "Merge to Main" to merge the selected branch into main
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 text-sm font-medium">4</span>
                Use the zoom controls to adjust the view
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
