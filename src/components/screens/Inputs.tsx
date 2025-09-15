import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import ProjectDetails from '../inputs/ProjectDetails';
import AdditionalCurrency from '../inputs/AdditionalCurrency';
import AddVersions from '../inputs/AddVersions';
import ManageData from '../inputs/ManageData';
import InputScreens from '../inputs/InputScreens';

interface Panel {
  id: string;
  title: string;
  component: React.ReactNode;
}

const Inputs: React.FC = () => {
  const [expandedPanel, setExpandedPanel] = useState<string>('project-details');

  const panels: Panel[] = [
    {
      id: 'project-details',
      title: 'PROJECT DETAILS',
      component: <ProjectDetails />,
    },
    {
      id: 'additional-currency',
      title: 'SET ADDITIONAL CURRENCY',
      component: <AdditionalCurrency />,
    },
    {
      id: 'add-versions',
      title: 'ADD VERSIONS',
      component: <AddVersions />,
    },
    {
      id: 'manage-data',
      title: 'MANAGE DATA',
      component: <ManageData />,
    },
    {
      id: 'input-screens',
      title: 'INPUT SCREENS',
      component: <InputScreens />,
    },
  ];

  const togglePanel = (panelId: string) => {
    setExpandedPanel(expandedPanel === panelId ? '' : panelId);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Inputs</h1>
        <p className="text-gray-600">Manage project data and financial inputs</p>
      </div>

      <div className="space-y-4">
        {panels.map((panel) => {
          const isExpanded = expandedPanel === panel.id;
          
          return (
            <div key={panel.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <button
                onClick={() => togglePanel(panel.id)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors border-b border-gray-200"
              >
                <h2 className="text-lg font-semibold text-gray-900">{panel.title}</h2>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {isExpanded && (
                <div className="p-6">
                  {panel.component}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Inputs;