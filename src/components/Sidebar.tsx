import React from 'react';
import { 
  Home, 
  Database, 
  Upload, 
  Download, 
  CreditCard 
} from 'lucide-react';
import { Screen } from '../App';

interface SidebarProps {
  activeScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

const navigationItems = [
  { id: 'dashboard' as Screen, label: 'Dashboard', icon: Home },
  { id: 'masters' as Screen, label: 'Masters', icon: Database },
  { id: 'inputs' as Screen, label: 'Inputs', icon: Upload },
  { id: 'outputs' as Screen, label: 'Outputs', icon: Download },
  { id: 'billing-details' as Screen, label: 'Billing-Details', icon: CreditCard },
];

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, onScreenChange }) => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm z-50">
      <div className="p-6">
        <div className="flex items-center mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">VAP</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Virtual Assessment</h1>
        </div>
        
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;