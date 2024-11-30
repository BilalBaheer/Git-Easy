import React, { useState } from 'react';
import Tree from 'react-d3-tree';

const Visualizer = () => {
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [treeData, setTreeData] = useState({
    name: 'main',
    attributes: {
      commit: 'initial'
    },
    children: [
      {
        name: 'feature',
        attributes: {
          commit: 'initial'
        },
        children: []
      },
      {
        name: 'bugfix',
        attributes: {
          commit: 'initial'
        },
        children: []
      }
    ]
  });

  const addCommit = () => {
    setTreeData(prevData => {
      const newData = { ...prevData };
      const addCommitToNode = (node) => {
        if (node.name === selectedBranch) {
          const newCommit = {
            name: `${selectedBranch}-commit`,
            attributes: {
              commit: `commit-${Date.now()}`
            },
            children: []
          };
          node.children = [...(node.children || []), newCommit];
          return true;
        }
        if (node.children) {
          for (let child of node.children) {
            if (addCommitToNode(child)) return true;
          }
        }
        return false;
      };
      addCommitToNode(newData);
      return newData;
    });
  };

  const mergeToMain = () => {
    if (selectedBranch === 'main') return;

    setTreeData(prevData => {
      const newData = { ...prevData };
      const findBranch = (node) => {
        if (node.name === selectedBranch) {
          return node;
        }
        if (node.children) {
          for (let child of node.children) {
            const found = findBranch(child);
            if (found) return found;
          }
        }
        return null;
      };

      const branchToMerge = findBranch(newData);
      if (branchToMerge && branchToMerge.children && branchToMerge.children.length > 0) {
        const lastCommit = branchToMerge.children[branchToMerge.children.length - 1];
        newData.children.push({
          name: 'merge',
          attributes: {
            commit: `merged-${selectedBranch}-${Date.now()}`
          },
          children: []
        });
      }
      return newData;
    });
  };

  const renderCustomNode = ({ nodeDatum }) => (
    <g>
      <circle
        r={25}
        fill={
          nodeDatum.name === 'main' ? '#2563eb' :
          nodeDatum.name === 'feature' ? '#16a34a' :
          nodeDatum.name === 'bugfix' ? '#dc2626' :
          nodeDatum.name === 'merge' ? '#9333ea' :
          '#64748b'
        }
      />
      <text
        dy=".31em"
        x={35}
        textAnchor="start"
        style={{ fill: 'white', fontSize: '16px' }}
      >
        {nodeDatum.name}
      </text>
    </g>
  );

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
          </div>

          <div style={{ height: '800px', border: '1px solid #e5e7eb' }} className="rounded-lg overflow-hidden">
            <Tree
              data={treeData}
              orientation="vertical"
              renderCustomNodeElement={renderCustomNode}
              pathFunc="step"
              translate={{ x: 400, y: 100 }}
              separation={{ siblings: 2.5, nonSiblings: 3 }}
              zoom={0.8}
            />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">How to Use:</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Select a branch from the dropdown menu</li>
              <li>Click "Add Commit" to add a new commit to the selected branch</li>
              <li>Click "Merge to Main" to merge the selected branch into main</li>
              <li>Drag the visualization area to pan</li>
              <li>Use mouse wheel to zoom in/out</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
