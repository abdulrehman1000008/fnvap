import React, { useState, useEffect } from 'react';
import { Edit2, Plus, ChevronDown } from 'lucide-react';
import DataTable from '../ui/DataTable';
import Button from '../ui/Button';
import Select from '../ui/Select';

export interface MasterData {
  id: string;
  optionId: string;
  description: string;
}

type MasterType = 'currency' | 'industry-type' | 'plant-type';

const Masters: React.FC = () => {
  const [selectedMaster, setSelectedMaster] = useState<MasterType>('currency');
  const [data, setData] = useState<MasterData[]>([]);
  const [loading, setLoading] = useState(false);

  const masterOptions = [
    { value: 'currency', label: 'Currency' },
    { value: 'industry-type', label: 'Industry Type' },
    { value: 'plant-type', label: 'Plant Type' },
  ];

  const sampleData = {
    currency: [
      { id: '1', optionId: 'USD', description: 'United States Dollar' },
      { id: '2', optionId: 'EUR', description: 'Euro' },
      { id: '3', optionId: 'GBP', description: 'British Pound Sterling' },
      { id: '4', optionId: 'AZN', description: 'Azerbaijani Manat' },
      { id: '5', optionId: 'JPY', description: 'Japanese Yen' },
    ],
    'industry-type': [
      { id: '1', optionId: 'MFG', description: 'Manufacturing' },
      { id: '2', optionId: 'CHM', description: 'Chemical Processing' },
      { id: '3', optionId: 'PWR', description: 'Power Generation' },
      { id: '4', optionId: 'OIL', description: 'Oil & Gas' },
    ],
    'plant-type': [
      { id: '1', optionId: 'REF', description: 'Refinery' },
      { id: '2', optionId: 'PCH', description: 'Petrochemical' },
      { id: '3', optionId: 'PWR', description: 'Power Plant' },
      { id: '4', optionId: 'WTR', description: 'Water Treatment' },
    ],
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(sampleData[selectedMaster] || []);
      setLoading(false);
    }, 500);
  }, [selectedMaster]);

  const handleEdit = (id: string) => {
    console.log('Edit item:', id);
  };

  const handleAdd = () => {
    console.log('Add new item');
  };

  const columns = [
    { key: 'optionId', header: 'Option ID', width: '200px' },
    { key: 'description', header: 'Description', width: 'auto' },
    {
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (item: MasterData) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(item.id)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleAdd}
            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MASTER TYPE</h1>
        <p className="text-gray-600">Manage foundational data categories</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-72">
              <Select
                label="Master List"
                value={selectedMaster}
                onChange={(value) => setSelectedMaster(value as MasterType)}
                options={masterOptions}
              />
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
        </div>

        <div className="p-6">
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
            pagination={{
              pageSize: 10,
              total: data.length,
              current: 1,
              onChange: (page, pageSize) => console.log('Page change:', page, pageSize),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Masters;