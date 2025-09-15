import React, { useState } from 'react';
import { Download, TrendingUp, DollarSign } from 'lucide-react';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import DataTable from '../ui/DataTable';

interface ReportModule {
  id: string;
  title: string;
  enabled: boolean;
}

const Outputs: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('all-projects');
  const [selectedVersion, setSelectedVersion] = useState('base-version');
  const [selectAll, setSelectAll] = useState(false);
  
  const [reports, setReports] = useState<ReportModule[]>([
    { id: 'equipment-cost', title: 'Equipment Cost', enabled: true },
    { id: 'profit-loss', title: 'Profit and Loss', enabled: false },
    { id: 'cash-flow', title: 'Cash Flow', enabled: false },
    { id: 'economic-summary', title: 'Economic Summary', enabled: false },
    { id: 'balance-sheet', title: 'Balance Sheet', enabled: false },
  ]);

  const projectOptions = [
    { value: 'all-projects', label: 'All Projects' },
    { value: 'manufacturing-a', label: 'Manufacturing Plant A' },
    { value: 'chemical-b', label: 'Chemical Processing B' },
    { value: 'power-c', label: 'Power Generation C' },
  ];

  const versionOptions = [
    { value: 'base-version', label: 'Base Version' },
    { value: 'version-1.1', label: 'Version 1.1' },
    { value: 'version-2.0', label: 'Version 2.0' },
  ];

  const equipmentData = [
    { id: '1', equipmentCategory: 'Centrifuge', costUSD: '150,000', costINR: '12,450,000' },
    { id: '2', equipmentCategory: 'Screens', costUSD: '200,000', costINR: '16,600,000' },
    { id: '3', equipmentCategory: 'Filters', costUSD: '150,000', costINR: '12,450,000' },
    { id: '4', equipmentCategory: 'Pumps', costUSD: '75,000', costINR: '6,225,000' },
    { id: '5', equipmentCategory: 'Compressors', costUSD: '125,000', costINR: '10,375,000' },
  ];

  const chartData = [
    { name: 'Centrifuge', value: 150000, percentage: 21.4, color: '#3b82f6' },
    { name: 'Screens', value: 200000, percentage: 28.6, color: '#8b5cf6' },
    { name: 'Filters', value: 150000, percentage: 21.4, color: '#06b6d4' },
    { name: 'Pumps', value: 75000, percentage: 10.7, color: '#10b981' },
    { name: 'Compressors', value: 125000, percentage: 17.9, color: '#f59e0b' },
  ];

  const handleReportToggle = (reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, enabled: !report.enabled }
        : report
    ));
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setReports(prev => prev.map(report => ({ ...report, enabled: newSelectAll })));
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const equipmentColumns = [
    { key: 'equipmentCategory', header: 'Equipment Category', width: '200px' },
    { key: 'costUSD', header: 'Cost (USD)', width: '150px' },
    { key: 'costINR', header: 'Cost (INR)', width: '150px' },
  ];

  const DonutChart = () => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    const radius = 80;
    const centerX = 120;
    const centerY = 120;
    let cumulativePercentage = 0;

    const createPath = (percentage: number, startPercentage: number) => {
      const startAngle = (startPercentage / 100) * 2 * Math.PI - Math.PI / 2;
      const endAngle = ((startPercentage + percentage) / 100) * 2 * Math.PI - Math.PI / 2;
      
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      
      const largeArc = percentage > 50 ? 1 : 0;
      
      return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    };

    return (
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="240" height="240" className="transform -rotate-90">
            {chartData.map((item, index) => {
              const path = createPath(item.percentage, cumulativePercentage);
              cumulativePercentage += item.percentage;
              
              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              );
            })}
            <circle
              cx={centerX}
              cy={centerY}
              r="40"
              fill="white"
              className="drop-shadow-sm"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">$700K</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </div>
        <div className="ml-8 space-y-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-3"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500">
                  ${(item.value / 1000).toFixed(0)}K ({item.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Outputs</h1>
          <p className="text-gray-600">Financial analysis and reporting dashboard</p>
        </div>
        <Button onClick={handleExportData} className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Data
        </Button>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Filter Projects"
            value={selectedProject}
            onChange={setSelectedProject}
            options={projectOptions}
          />
          <Select
            label="Select Version"
            value={selectedVersion}
            onChange={setSelectedVersion}
            options={versionOptions}
          />
        </div>
      </div>

      {/* Report Selector Grid */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Reports to Display</h2>
        <div className="space-y-4">
          <Checkbox
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAll}
            className="font-medium"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pl-6">
            {reports.map((report) => (
              <Checkbox
                key={report.id}
                label={report.title}
                checked={report.enabled}
                onChange={() => handleReportToggle(report.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Report Display Area */}
      <div className="space-y-8">
        {reports.find(r => r.id === 'equipment-cost')?.enabled && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-900">Equipment Cost Summary</h3>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Part 1: KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700 mb-1">Total Cost Without Tax</p>
                      <p className="text-3xl font-bold text-blue-900">$500,000</p>
                      <p className="text-sm text-blue-600 mt-1">Base equipment costs</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-700" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">Total Cost With Tax</p>
                      <p className="text-3xl font-bold text-green-900">$524,000</p>
                      <p className="text-sm text-green-600 mt-1">Including 4.8% tax</p>
                    </div>
                    <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-700" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Interactive Chart */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-6">Cost Distribution</h4>
                <div className="bg-gray-50 rounded-lg p-6">
                  <DonutChart />
                </div>
              </div>

              {/* Part 3: Data Table */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h4>
                <DataTable
                  data={equipmentData}
                  columns={equipmentColumns}
                  pagination={{
                    pageSize: 10,
                    total: equipmentData.length,
                    current: 1,
                    onChange: (page, pageSize) => console.log('Page change:', page, pageSize),
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other reports */}
        {reports.filter(r => r.enabled && r.id !== 'equipment-cost').map((report) => (
          <div key={report.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{report.title}</h3>
              <p className="text-gray-500">Report module coming soon...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Outputs;