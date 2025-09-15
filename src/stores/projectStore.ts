import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Project, FormErrors } from '@/types'

interface ProjectState {
  // Current project data
  currentProject: Partial<Project>
  
  // Form state
  formErrors: FormErrors
  isFormDirty: boolean
  
  // UI state
  accordionValue: string
  isProjectDialogOpen: boolean
  
  // Actions
  setCurrentProject: (project: Partial<Project>) => void
  updateProjectField: (field: keyof Project, value: any) => void
  setFormErrors: (errors: FormErrors) => void
  setFormError: (field: string, error: string | undefined) => void
  clearFormErrors: () => void
  setFormDirty: (dirty: boolean) => void
  setAccordionValue: (value: string) => void
  setProjectDialogOpen: (open: boolean) => void
  resetProject: () => void
}

export const useProjectStore = create<ProjectState>()(
  devtools(
    (set, get) => ({
      // Initial state
      currentProject: {
        projectName: '',
        industryType: '',
        plantType: '',
        baseCurrency: 'USD',
        creationDate: new Date().toISOString().split('T')[0],
        customerReference: '',
        version: '1.0',
      },
      formErrors: {},
      isFormDirty: false,
      accordionValue: 'project-details',
      isProjectDialogOpen: false,

      // Actions
      setCurrentProject: (project) =>
        set({ currentProject: project, isFormDirty: false }),

      updateProjectField: (field, value) =>
        set((state) => ({
          currentProject: { ...state.currentProject, [field]: value },
          isFormDirty: true,
          formErrors: { ...state.formErrors, [field]: undefined },
        })),

      setFormErrors: (errors) => set({ formErrors: errors }),

      setFormError: (field, error) =>
        set((state) => ({
          formErrors: { ...state.formErrors, [field]: error },
        })),

      clearFormErrors: () => set({ formErrors: {} }),

      setFormDirty: (dirty) => set({ isFormDirty: dirty }),

      setAccordionValue: (value) => set({ accordionValue: value }),

      setProjectDialogOpen: (open) => set({ isProjectDialogOpen: open }),

      resetProject: () =>
        set({
          currentProject: {
            projectName: '',
            industryType: '',
            plantType: '',
            baseCurrency: 'USD',
            creationDate: new Date().toISOString().split('T')[0],
            customerReference: '',
            version: '1.0',
          },
          formErrors: {},
          isFormDirty: false,
        }),
    }),
    { name: 'project-store' }
  )
)