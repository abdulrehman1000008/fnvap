import React, { useState } from 'react'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Toaster } from '@/components/ui/sonner'
import Sidebar from './components/Sidebar'
import Dashboard from './components/screens/Dashboard'
import Masters from './components/screens/Masters'
import { ProjectInputsScreen } from '@/components/inputs/ProjectInputsScreen'
import Outputs from './components/screens/Outputs'
import BillingDetails from './components/screens/BillingDetails'

export type Screen = 'dashboard' | 'masters' | 'inputs' | 'outputs' | 'billing-details'

function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('inputs')

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <Dashboard />
      case 'masters':
        return <Masters />
      case 'inputs':
        return <ProjectInputsScreen />
      case 'outputs':
        return <Outputs />
      case 'billing-details':
        return <BillingDetails />
      default:
        return <Dashboard />
    }
  }

  return (
    <QueryProvider>
      <div className="min-h-screen bg-background flex">
        <Sidebar activeScreen={activeScreen} onScreenChange={setActiveScreen} />
        <main className="flex-1 ml-64">
          <div className="p-8">
            {renderScreen()}
          </div>
        </main>
        <Toaster />
      </div>
    </QueryProvider>
  )
}

export default App