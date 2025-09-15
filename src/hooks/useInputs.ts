import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inputService } from '@/services/inputService'
import { EquipmentCost } from '@/types'
import { toast } from 'sonner'

export const useEquipmentCosts = (params?: {
  projectId?: string
  version?: string
  page?: number
  pageSize?: number
}) => {
  return useQuery({
    queryKey: ['equipment-costs', params],
    queryFn: () => inputService.getMockEquipmentCosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCreateEquipmentCost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cost: Omit<EquipmentCost, 'id'>) =>
      inputService.createEquipmentCost(cost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment-costs'] })
      toast.success('Equipment cost added successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add equipment cost')
    },
  })
}

export const useUpdateEquipmentCost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, cost }: { id: string; cost: Partial<EquipmentCost> }) =>
      inputService.updateEquipmentCost(id, cost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment-costs'] })
      toast.success('Equipment cost updated successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update equipment cost')
    },
  })
}

export const useDeleteEquipmentCost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => inputService.deleteEquipmentCost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment-costs'] })
      toast.success('Equipment cost deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete equipment cost')
    },
  })
}