import React, { useState } from 'react';
import Button from '../ui/Button';
import Select from '../ui/Select';

const AddVersions: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState('1.0');
  const [versions] = useState([
    { value: '1.0', label: 'Version 1.0' },
    { value: '1.1', label: 'Version 1.1' },
    { value: '2.0', label: 'Version 2.0' },
  ]);

  const handleAddVersion = () => {
    const newVersion = `${versions.length + 1}.0`;
    console.log('Adding new version:', newVersion);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Select
          label="Versions"
          value={selectedVersion}
          onChange={setSelectedVersion}
          options={versions}
          className="w-64"
        />
        <Button onClick={handleAddVersion}>
          Add New Version
        </Button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-medium text-yellow-900 mb-2">Version Control</h4>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Each version maintains independent data sets</li>
          <li>• New versions copy data from the currently active version</li>
          <li>• Version deletion requires confirmation</li>
        </ul>
      </div>
    </div>
  );
};

export default AddVersions;