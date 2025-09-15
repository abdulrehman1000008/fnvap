import React, { useState } from 'react';
import { RefreshCw, Save, Edit2, Trash2, Plus } from 'lucide-react';
import Button from '../ui/Button';
import DataTable from '../ui/DataTable';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';

const InputScreens: React.FC = () => {
  const [activeTab, setActiveTab] = useState('equipment-cost');
  const [visibleColumns, setVisibleColumns] = useState({
    equipmentCategory: true,
    quantity: true,
    rate: true,
    amount: true,
  });

  const tabs = [
    { id: 'equipment-cost', label: 'Equipment Cost' },
    { id: 'plant-cost', label: 'Plant Cost' },
    { id: 'project-basis', label: 'Project Basis' },
    { id: 'variable-cost', label: 'Variable Cost' },
    { id: 'fixed-cost', label: 'Fixed Cost' },
    { id: 'sales-revenue', label: 'Sales Revenue' },
    { id: 'project-data-cost', label: 'Project Data Cost' },
  ];

  const sampleData = [
    {
      id: '1',
      equipmentCategory: 'Pumps',
      quantity: '5',
      rate: '15000',
      amount: '75000',
    },
    {
      id: '2',
      equipmentCategory: 'Compressors',
      quantity: '3',
      rate: '25000',
      amount: '75000',
    },
    {
      id: '3',
      equipmentCategory: 'Heat Exchangers',
      quantity: '8',
      rate: '8000',
      amount: '64000',
    },
  ];

  const handleColumnToggle = (column: string) => {
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const handleEdit = (id: string) => {
    console.log('Edit row:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete row:', id);
  };

  const handleAdd = () => {
    console.log('Add new row');
  };

  const getColumns = () => {
    const baseColumns = [];
    
    if (visibleColumns.equipmentCategory) {
      baseColumns.push({ key: 'equipmentCategory', header: 'Equipment Category', width: '200px' });
    }
    if (visibleColumns.quantity) {
      baseColumns.push({ key: 'quantity', header: 'Quantity', width: '120px' });
    }
    if (visibleColumns.rate) {
      baseColumns.push({ key: 'rate', header: 'Rate (USD)', width: '150px' });
    }
    if (visibleColumns.amount) {
      baseColumns.push({ key: 'amount', header: 'Amount (USD)', width: '150px' });
    }

    baseColumns.push({
      key: 'actions',
      header: 'Actions',
      width: '120px',
      render: (item: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(item.id)}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-all"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleAdd}
            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ),
    });

    return baseColumns;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Column Visibility Controls */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Select Columns to Display</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Checkbox
            label="Equipment Category"
            checked={visibleColumns.equipmentCategory}
            onChange={() => handleColumnToggle('equipmentCategory')}
          />
          <Checkbox
            label="Quantity"
            checked={visibleColumns.quantity}
            onChange={() => handleColumnToggle('quantity')}
          />
          <Checkbox
            label="Rate"
            checked={visibleColumns.rate}
            onChange={() => handleColumnToggle('rate')}
          />
          <Checkbox
            label="Amount"
            checked={visibleColumns.amount}
            onChange={() => handleColumnToggle('amount')}
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => console.log('Refresh table')}
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Table
          </Button>
          <Select
            label="Subtotal Cost Method"
            value="sum"
            onChange={() => {}}
            options={[
              { value: 'sum', label: 'Sum' },
              { value: 'average', label: 'Average' },
            ]}
            className="w-48"
          />
          <Select
            label="Total Cost Method"
            value="sum"
            onChange={() => {}}
            options={[
              { value: 'sum', label: 'Sum' },
              { value: 'weighted', label: 'Weighted Average' },
            ]}
            className="w-48"
          />
        </div>
        <Button onClick={() => console.log('Save data')} className="flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Data
        </Button>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <DataTable
          data={sampleData}
          columns={getColumns()}
          pagination={{
            pageSize: 10,
            total: sampleData.length,
            current: 1,
            onChange: (page, pageSize) => console.log('Page change:', page, pageSize),
          }}
        />
      </div>
    </div>
  );
};

export default InputScreens;