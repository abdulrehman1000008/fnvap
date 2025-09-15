import { apiClient } from '@/lib/api'
import { EquipmentCost, PaginatedResponse } from '@/types'

export const inputService = {
  // Equipment Cost
  async getEquipmentCosts(params?: {
    projectId?: string
    version?: string
    page?: number
    pageSize?: number
  }): Promise<PaginatedResponse<EquipmentCost>> {
    const response = await apiClient.get<PaginatedResponse<EquipmentCost>>('/equipment-costs', params)
    return response.data
  },

  async createEquipmentCost(cost: Omit<EquipmentCost, 'id'>): Promise<EquipmentCost> {
    const response = await apiClient.post<EquipmentCost>('/equipment-costs', cost)
    return response.data
  },

  async updateEquipmentCost(id: string, cost: Partial<EquipmentCost>): Promise<EquipmentCost> {
    const response = await apiClient.put<EquipmentCost>(`/equipment-costs/${id}`, cost)
    return response.data
  },

  async deleteEquipmentCost(id: string): Promise<void> {
    await apiClient.delete(`/equipment-costs/${id}`)
  },

  // Mock data for development
  async getMockEquipmentCosts(): Promise<EquipmentCost[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            projectId: 'proj-1',
            equipmentCategory: 'Pumps',
            quantity: 5,
            rate: 15000,
            amount: 75000,
            currency: 'USD',
            version: '1.0',
          },
          {
            id: '2',
            projectId: 'proj-1',
            equipmentCategory: 'Compressors',
            quantity: 3,
            rate: 25000,
            amount: 75000,
            currency: 'USD',
            version: '1.0',
          },
          {
            id: '3',
            projectId: 'proj-1',
            equipmentCategory: 'Heat Exchangers',
            quantity: 8,
            rate: 8000,
            amount: 64000,
            currency: 'USD',
            version: '1.0',
          },
          {
            id: '4',
            projectId: 'proj-1',
            equipmentCategory: 'Vessels',
            quantity: 4,
            rate: 12000,
            amount: 48000,
            currency: 'USD',
            version: '1.0',
          },
          {
            id: '5',
            projectId: 'proj-1',
            equipmentCategory: 'Piping',
            quantity: 1,
            rate: 85000,
            amount: 85000,
            currency: 'USD',
            version: '1.0',
          },
        ])
      }, 400)
    })
  },
}