import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectService } from '@/services/projectService'
import { Project } from '@/types'
import { toast } from 'sonner'

export const useProjects = (params?: {
  page?: number
  pageSize?: number
  search?: string
  industryType?: string
  plantType?: string
}) => {
  return useQuery({
    queryKey: ['projects', params],
    queryFn: () => projectService.getProjects(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => projectService.getProject(id),
    enabled: !!id,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
      projectService.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project created successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create project')
    },
  })
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<Project> }) =>
      projectService.updateProject(id, project),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      queryClient.setQueryData(['project', data.id], data)
      toast.success('Project updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update project')
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
      toast.success('Project deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete project')
    },
  })
}

// Master data hooks
export const useIndustryTypes = (search?: string) => {
  return useQuery({
    queryKey: ['industry-types', search],
    queryFn: () => projectService.getMockIndustryTypes(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const usePlantTypes = (industryTypeId?: string, search?: string) => {
  return useQuery({
    queryKey: ['plant-types', industryTypeId, search],
    queryFn: () => projectService.getMockPlantTypes(industryTypeId),
    enabled: !!industryTypeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCurrencies = (search?: string) => {
  return useQuery({
    queryKey: ['currencies', search],
    queryFn: () => projectService.getMockCurrencies(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}