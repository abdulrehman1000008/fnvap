import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/screens/Dashboard';
import Masters from './components/screens/Masters';
import Inputs from './components/screens/Inputs';
import Outputs from './components/screens/Outputs';
import BillingDetails from './components/screens/BillingDetails';

export type Screen = 'dashboard' | 'masters' | 'inputs' | 'outputs' | 'billing-details';

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('dashboard');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />;
      case 'masters':
        return <Masters />;
      case 'inputs':
        return <Inputs />;
      case 'outputs':
        return <Outputs />;
      case 'billing-details':
        return <BillingDetails />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      <main className="flex-1 ml-64">
        <div className="p-8">
          {renderScreen()}
        </div>
      </main>
    </div>
  );
}

export default App;