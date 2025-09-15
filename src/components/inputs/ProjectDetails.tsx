import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';

const ProjectDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    industryType: '',
    plantType: '',
    baseCurrency: 'USD',
    projectName: '',
    creationDate: new Date().toISOString().split('T')[0],
    customerReference: '',
  });

  const industryTypes = [
    { value: 'MFG', label: 'Manufacturing' },
    { value: 'CHM', label: 'Chemical Processing' },
    { value: 'PWR', label: 'Power Generation' },
    { value: 'OIL', label: 'Oil & Gas' },
  ];

  const plantTypes = [
    { value: 'REF', label: 'Refinery' },
    { value: 'PCH', label: 'Petrochemical' },
    { value: 'PWR', label: 'Power Plant' },
    { value: 'WTR', label: 'Water Treatment' },
  ];

  const currencies = [
    { value: 'USD', label: 'USD - United States Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound Sterling' },
    { value: 'AZN', label: 'AZN - Azerbaijani Manat' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving project:', formData);
  };

  const handleAddNew = () => {
    setFormData({
      industryType: '',
      plantType: '',
      baseCurrency: 'USD',
      projectName: '',
      creationDate: new Date().toISOString().split('T')[0],
      customerReference: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select
            label="Filter Projects"
            value=""
            onChange={() => {}}
            options={[{ value: '', label: 'All Projects' }]}
            className="w-64"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleAddNew}>
            Add New Project
          </Button>
          <Button onClick={handleSave}>
            Save Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Industry Type *"
          value={formData.industryType}
          onChange={(value) => handleInputChange('industryType', value)}
          options={industryTypes}
          required
        />

        <Select
          label="Plant Type *"
          value={formData.plantType}
          onChange={(value) => handleInputChange('plantType', value)}
          options={plantTypes}
          required
        />

        <Select
          label="Base Currency *"
          value={formData.baseCurrency}
          onChange={(value) => handleInputChange('baseCurrency', value)}
          options={currencies}
          required
        />

        <Input
          label="Project Name *"
          value={formData.projectName}
          onChange={(value) => handleInputChange('projectName', value)}
          placeholder="Enter project name"
          required
        />

        <Input
          label="Creation Date *"
          type="date"
          value={formData.creationDate}
          onChange={(value) => handleInputChange('creationDate', value)}
          required
        />

        <Input
          label="Customer Reference"
          value={formData.customerReference}
          onChange={(value) => handleInputChange('customerReference', value)}
          placeholder="Enter customer reference"
        />
      </div>
    </div>
  );
};

export default ProjectDetails;