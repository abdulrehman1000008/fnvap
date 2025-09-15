import React, { useState } from 'react';
import Select from '../ui/Select';

const ManageData: React.FC = () => {
  const [dataInputMethod, setDataInputMethod] = useState('grid');
  const [sourceProject, setSourceProject] = useState('');

  const projects = [
    { value: 'project-1', label: 'Manufacturing Plant A - Version 1.0' },
    { value: 'project-2', label: 'Chemical Processing B - Version 2.0' },
    { value: 'project-3', label: 'Power Generation C - Version 1.1' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Input Method</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              value="grid"
              checked={dataInputMethod === 'grid'}
              onChange={(e) => setDataInputMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900">Add data to grid</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="import"
              checked={dataInputMethod === 'import'}
              onChange={(e) => setDataInputMethod(e.target.value)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-gray-900">Import data from current project</span>
          </label>
        </div>
      </div>

      {dataInputMethod === 'import' && (
        <div>
          <Select
            label="Source Project"
            value={sourceProject}
            onChange={setSourceProject}
            options={projects}
            placeholder="Select project to import from"
            className="w-full max-w-md"
          />
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Import Guidelines</h4>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Data import includes validation and conflict resolution</li>
          <li>• Imported data can be modified after import</li>
          <li>• Original project data remains unchanged</li>
        </ul>
      </div>
    </div>
  );
};

export default ManageData;