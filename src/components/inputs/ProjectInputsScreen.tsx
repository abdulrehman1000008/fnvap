import React from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { ProjectDetailsForm } from '@/components/forms/ProjectDetailsForm'
import { InputScreensSection } from '@/components/inputs/InputScreensSection'
import { useProjectStore } from '@/stores/projectStore'
import { useCreateProject, useUpdateProject } from '@/hooks/useProjects'
import { Plus, Save } from 'lucide-react'

export const ProjectInputsScreen: React.FC = () => {
  const {
    currentProject,
    accordionValue,
    setAccordionValue,
    resetProject,
    isFormDirty,
    formErrors,
  } = useProjectStore()

  const createProjectMutation = useCreateProject()
  const updateProjectMutation = useUpdateProject()

  const handleSaveProject = async () => {
    // Validate required fields
    const requiredFields = ['projectName', 'industryType', 'plantType', 'creationDate']
    const hasErrors = requiredFields.some(field => !currentProject[field as keyof typeof currentProject])
    
    if (hasErrors || Object.keys(formErrors).length > 0) {
      return
    }

    try {
      if (currentProject.id) {
        await updateProjectMutation.mutateAsync({
          id: currentProject.id,
          project: currentProject,
        })
      } else {
        await createProjectMutation.mutateAsync(currentProject as any)
      }
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }

  const handleAddNewProject = () => {
    resetProject()
    setAccordionValue('project-details')
  }

  const isLoading = createProjectMutation.isPending || updateProjectMutation.isPending

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Inputs</h1>
          <p className="text-muted-foreground">Manage project data and financial inputs</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="all-projects">
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filter Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-projects">All Projects</SelectItem>
              <SelectItem value="manufacturing">Manufacturing Projects</SelectItem>
              <SelectItem value="chemical">Chemical Projects</SelectItem>
              <SelectItem value="power">Power Projects</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleAddNewProject}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
          <Button 
            onClick={handleSaveProject}
            disabled={!isFormDirty || isLoading}
            loading={isLoading}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Project
          </Button>
        </div>
      </div>

      {/* Accordion Sections */}
      <Accordion 
        type="single" 
        value={accordionValue} 
        onValueChange={setAccordionValue}
        className="space-y-4"
      >
        {/* Project Details */}
        <AccordionItem value="project-details" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <h2 className="text-lg font-semibold">PROJECT DETAILS</h2>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <ProjectDetailsForm />
          </AccordionContent>
        </AccordionItem>

        {/* Input Screens */}
        <AccordionItem value="input-screens" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <h2 className="text-lg font-semibold">INPUT SCREENS</h2>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <InputScreensSection />
          </AccordionContent>
        </AccordionItem>

        {/* Additional Currency */}
        <AccordionItem value="additional-currency" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <h2 className="text-lg font-semibold">SET ADDITIONAL CURRENCY</h2>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="text-center py-8 text-muted-foreground">
              Additional currency configuration coming soon...
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Add Versions */}
        <AccordionItem value="add-versions" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <h2 className="text-lg font-semibold">ADD VERSIONS</h2>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="text-center py-8 text-muted-foreground">
              Version management coming soon...
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Manage Data */}
        <AccordionItem value="manage-data" className="border rounded-lg bg-card">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <h2 className="text-lg font-semibold">MANAGE DATA</h2>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="text-center py-8 text-muted-foreground">
              Data management tools coming soon...
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}