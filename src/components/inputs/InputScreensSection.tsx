import React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { EquipmentCostTable } from '@/components/tables/EquipmentCostTable'
import { useInputStore } from '@/stores/inputStore'
import { RefreshCw, Save } from 'lucide-react'

const tabs = [
  { id: 'equipment-cost', label: 'Equipment Cost' },
  { id: 'plant-cost', label: 'Plant Cost' },
  { id: 'project-basis', label: 'Project Basis' },
  { id: 'variable-cost', label: 'Variable Cost' },
  { id: 'fixed-cost', label: 'Fixed Cost' },
  { id: 'sales-revenue', label: 'Sales Revenue' },
  { id: 'project-data-cost', label: 'Project Data Cost' },
]

export const InputScreensSection: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    visibleColumns,
    setColumnVisibility,
    toggleAllColumns,
  } = useInputStore()

  const handleRefreshTable = () => {
    console.log('Refreshing table data...')
  }

  const handleSaveData = () => {
    console.log('Saving table data...')
  }

  const allColumnsVisible = Object.values(visibleColumns).every(Boolean)
  const someColumnsVisible = Object.values(visibleColumns).some(Boolean)

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="text-xs">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Column Visibility Controls */}
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Select Columns to Display</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={allColumnsVisible}
                onCheckedChange={(checked) => toggleAllColumns(!!checked)}
                className={!allColumnsVisible && someColumnsVisible ? 'data-[state=checked]:bg-primary/50' : ''}
              />
              <Label htmlFor="select-all" className="font-medium">
                Select All
              </Label>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pl-6">
              {Object.entries(visibleColumns).map(([column, visible]) => (
                <div key={column} className="flex items-center space-x-2">
                  <Checkbox
                    id={column}
                    checked={visible}
                    onCheckedChange={(checked) => setColumnVisibility(column, !!checked)}
                  />
                  <Label htmlFor={column} className="capitalize">
                    {column.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleRefreshTable}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Table
            </Button>
            <Select defaultValue="sum">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="average">Average</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="sum">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sum">Sum</SelectItem>
                <SelectItem value="weighted">Weighted Average</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSaveData}>
            <Save className="w-4 h-4 mr-2" />
            Save Data
          </Button>
        </div>

        {/* Tab Content */}
        <TabsContent value="equipment-cost" className="mt-6">
          <EquipmentCostTable />
        </TabsContent>

        {tabs.slice(1).map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <h3 className="text-lg font-medium mb-2">{tab.label}</h3>
              <p>This module is coming soon...</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}