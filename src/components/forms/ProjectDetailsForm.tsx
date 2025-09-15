import React, { useEffect, useMemo } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Combobox, ComboboxOption } from '@/components/ui/combobox'
import { useProjectStore } from '@/stores/projectStore'
import { useIndustryTypes, usePlantTypes, useCurrencies } from '@/hooks/useProjects'
import { generateProjectId, debounce } from '@/lib/utils'

export const ProjectDetailsForm: React.FC = () => {
  const {
    currentProject,
    updateProjectField,
    formErrors,
    setFormError,
  } = useProjectStore()

  const { data: industryTypes, isLoading: industryTypesLoading } = useIndustryTypes()
  const { data: plantTypes, isLoading: plantTypesLoading } = usePlantTypes(currentProject.industryType)
  const { data: currencies, isLoading: currenciesLoading } = useCurrencies()

  // Convert data to combobox options
  const industryOptions: ComboboxOption[] = useMemo(() => 
    industryTypes?.map(type => ({
      value: type.id,
      label: `${type.code} - ${type.name}`
    })) || [], [industryTypes]
  )

  const plantOptions: ComboboxOption[] = useMemo(() => 
    plantTypes?.map(type => ({
      value: type.id,
      label: `${type.code} - ${type.name}`
    })) || [], [plantTypes]
  )

  const currencyOptions: ComboboxOption[] = useMemo(() => 
    currencies?.map(currency => ({
      value: currency.code,
      label: `${currency.code} - ${currency.name}`
    })) || [], [currencies]
  )

  // Debounced project ID generation
  const debouncedGenerateProjectId = useMemo(
    () => debounce((industryType: string, plantType: string, date: string) => {
      if (industryType && plantType && date) {
        const industry = industryTypes?.find(i => i.id === industryType)
        const plant = plantTypes?.find(p => p.id === plantType)
        
        if (industry && plant) {
          const projectId = generateProjectId(industry.code, plant.code, new Date(date))
          updateProjectField('projectId', projectId)
        }
      }
    }, 300),
    [industryTypes, plantTypes, updateProjectField]
  )

  // Generate project ID when dependencies change
  useEffect(() => {
    if (currentProject.industryType && currentProject.plantType && currentProject.creationDate) {
      debouncedGenerateProjectId(
        currentProject.industryType,
        currentProject.plantType,
        currentProject.creationDate
      )
    }
  }, [currentProject.industryType, currentProject.plantType, currentProject.creationDate, debouncedGenerateProjectId])

  // Validation
  const validateField = (field: string, value: any) => {
    switch (field) {
      case 'projectName':
        if (!value || value.length < 3) {
          setFormError(field, 'Project name must be at least 3 characters')
        }
        break
      case 'industryType':
        if (!value) {
          setFormError(field, 'Industry type is required')
        }
        break
      case 'plantType':
        if (!value) {
          setFormError(field, 'Plant type is required')
        }
        break
      case 'creationDate':
        if (!value) {
          setFormError(field, 'Creation date is required')
        }
        break
    }
  }

  const handleFieldChange = (field: keyof typeof currentProject, value: any) => {
    updateProjectField(field, value)
    validateField(field, value)
    
    // Clear plant type when industry type changes
    if (field === 'industryType' && currentProject.plantType) {
      updateProjectField('plantType', '')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Industry Type */}
      <div className="space-y-2">
        <Label required>Industry Type</Label>
        <Combobox
          options={industryOptions}
          value={currentProject.industryType || ''}
          onValueChange={(value) => handleFieldChange('industryType', value)}
          placeholder="Select industry type..."
          searchPlaceholder="Search industry types..."
          loading={industryTypesLoading}
          className={formErrors.industryType ? 'border-destructive' : ''}
        />
        {formErrors.industryType && (
          <p className="text-sm text-destructive">{formErrors.industryType}</p>
        )}
      </div>

      {/* Plant Type */}
      <div className="space-y-2">
        <Label required>Plant Type</Label>
        <Combobox
          options={plantOptions}
          value={currentProject.plantType || ''}
          onValueChange={(value) => handleFieldChange('plantType', value)}
          placeholder="Select plant type..."
          searchPlaceholder="Search plant types..."
          loading={plantTypesLoading}
          disabled={!currentProject.industryType}
          className={formErrors.plantType ? 'border-destructive' : ''}
        />
        {formErrors.plantType && (
          <p className="text-sm text-destructive">{formErrors.plantType}</p>
        )}
      </div>

      {/* Base Currency */}
      <div className="space-y-2">
        <Label required>Base Currency</Label>
        <Combobox
          options={currencyOptions}
          value={currentProject.baseCurrency || ''}
          onValueChange={(value) => handleFieldChange('baseCurrency', value)}
          placeholder="Select currency..."
          searchPlaceholder="Search currencies..."
          loading={currenciesLoading}
        />
      </div>

      {/* Project Name */}
      <div className="space-y-2">
        <Label required>Project Name</Label>
        <Input
          value={currentProject.projectName || ''}
          onChange={(e) => handleFieldChange('projectName', e.target.value)}
          placeholder="Enter project name"
          error={formErrors.projectName}
        />
      </div>

      {/* Creation Date */}
      <div className="space-y-2">
        <Label required>Creation Date</Label>
        <Input
          type="date"
          value={currentProject.creationDate || ''}
          onChange={(e) => handleFieldChange('creationDate', e.target.value)}
          error={formErrors.creationDate}
        />
      </div>

      {/* Customer Reference */}
      <div className="space-y-2">
        <Label>Customer Reference</Label>
        <Input
          value={currentProject.customerReference || ''}
          onChange={(e) => handleFieldChange('customerReference', e.target.value)}
          placeholder="Enter customer reference"
        />
      </div>

      {/* Auto-generated Project ID */}
      <div className="md:col-span-2 space-y-2">
        <Label>Project ID (Auto-generated)</Label>
        <Input
          value={currentProject.projectId || ''}
          readOnly
          className="bg-muted"
          placeholder="Project ID will be generated automatically"
        />
        <p className="text-sm text-muted-foreground">
          Format: [INDUSTRY_CODE][PLANT_CODE][DATE_YYYYMMDD]
        </p>
      </div>
    </div>
  )
}