import React, { useState, useRef, useCallback } from 'react';
import { Gitgraph } from '@gitgraph/react';
import ErrorBoundary from '../components/ErrorBoundary';

const Visualizer = () => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [scale, setScale] = useState(1);
  const graphRef = useRef(null);
  const branchesRef = useRef({});

  const initGraph = useCallback((gitgraph) => {
    if (!gitgraph) return;
    
    // Store the gitgraph instance
    graphRef.current = gitgraph;

    // Create main branch
    const main = gitgraph.branch({
      name: "main",
      style: {
        color: "#2563eb"
      }
    });
    main.commit("Initial commit");
    branchesRef.current.main = main;

    // Create feature branch
    const feature = main.branch({
      name: "feature",
      style: {
        color: "#16a34a"
      }
    });
    feature.commit("Feature branch created");
    branchesRef.current.feature = feature;

    // Create bugfix branch
    const bugfix = main.branch({
      name: "bugfix",
      style: {
        color: "#dc2626"
      }
    });
    bugfix.commit("Bugfix branch created");
    branchesRef.current.bugfix = bugfix;
  }, []);

  const addCommit = useCallback(() => {
    const branch = branchesRef.current[selectedBranch];
    if (branch) {
      branch.commit(`New commit on ${selectedBranch}`);
    }
  }, [selectedBranch]);

  const mergeToMain = useCallback(() => {
    if (selectedBranch === 'main') return;

    const sourceBranch = branchesRef.current[selectedBranch];
    const mainBranch = branchesRef.current.main;

    if (sourceBranch && mainBranch) {
      sourceBranch.merge(mainBranch, `Merge ${selectedBranch} into main`);
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Git Branch Visualizer</h1>
          
          <div className="mb-6 space-x-4">
            <select
              className="px-4 py-2 border rounded-lg bg-purple-600 text-white hover:bg-purple-700"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="main" className="bg-white text-black">main</option>
              <option value="feature" className="bg-white text-black">feature</option>
              <option value="bugfix" className="bg-white text-black">bugfix</option>
            </select>
            
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={addCommit}
            >
              Add Commit
            </button>
            
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              onClick={mergeToMain}
            >
              Merge to Main
            </button>

            <div className="inline-flex items-center space-x-2">
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={() => handleZoom(-0.1)}
              >
                -
              </button>
              <span className="text-gray-700">{Math.round(scale * 100)}%</span>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={() => handleZoom(0.1)}
              >
                +
              </button>
            </div>
          </div>

          <div 
            style={{ 
              height: '800px', 
              border: '1px solid #e5e7eb',
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease-out'
            }} 
            className="rounded-lg overflow-hidden"
          >
            <ErrorBoundary>
              <Gitgraph options={{ author: "GitBetter <gitbetter@example.com>" }}>
                {initGraph}
              </Gitgraph>
            </ErrorBoundary>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">How to Use:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Select a branch from the dropdown menu</li>
              <li>Click "Add Commit" to add a new commit to the selected branch</li>
              <li>Click "Merge to Main" to merge the selected branch into main</li>
              <li>Use the + and - buttons to zoom in and out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
