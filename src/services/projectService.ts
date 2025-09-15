import { apiClient } from '@/lib/api'
import { Project, IndustryType, PlantType, Currency, PaginatedResponse } from '@/types'

export const projectService = {
  // Projects
  async getProjects(params?: {
    page?: number
    pageSize?: number
    search?: string
    industryType?: string
    plantType?: string
  }): Promise<PaginatedResponse<Project>> {
    const response = await apiClient.get<PaginatedResponse<Project>>('/projects', params)
    return response.data
  },

  async getProject(id: string): Promise<Project> {
    const response = await apiClient.get<Project>(`/projects/${id}`)
    return response.data
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const response = await apiClient.post<Project>('/projects', project)
    return response.data
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await apiClient.put<Project>(`/projects/${id}`, project)
    return response.data
  },

  async deleteProject(id: string): Promise<void> {
    await apiClient.delete(`/projects/${id}`)
  },

  // Industry Types
  async getIndustryTypes(search?: string): Promise<IndustryType[]> {
    const response = await apiClient.get<IndustryType[]>('/industry-types', { search })
    return response.data
  },

  // Plant Types
  async getPlantTypes(industryTypeId?: string, search?: string): Promise<PlantType[]> {
    const response = await apiClient.get<PlantType[]>('/plant-types', { 
      industryTypeId, 
      search 
    })
    return response.data
  },

  // Currencies
  async getCurrencies(search?: string): Promise<Currency[]> {
    const response = await apiClient.get<Currency[]>('/currencies', { search })
    return response.data
  },

  // Mock data for development
  async getMockIndustryTypes(): Promise<IndustryType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', code: 'MFG', name: 'Manufacturing', description: 'Manufacturing Industry' },
          { id: '2', code: 'CHM', name: 'Chemical Processing', description: 'Chemical Processing Industry' },
          { id: '3', code: 'PWR', name: 'Power Generation', description: 'Power Generation Industry' },
          { id: '4', code: 'OIL', name: 'Oil & Gas', description: 'Oil & Gas Industry' },
          { id: '5', code: 'PHR', name: 'Pharmaceutical', description: 'Pharmaceutical Industry' },
          { id: '6', code: 'FBV', name: 'Food & Beverage', description: 'Food & Beverage Industry' },
        ])
      }, 500)
    })
  },

  async getMockPlantTypes(industryTypeId?: string): Promise<PlantType[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const allPlantTypes = [
          { id: '1', code: 'REF', name: 'Refinery', description: 'Oil Refinery Plant', industryTypeId: '4' },
          { id: '2', code: 'PCH', name: 'Petrochemical', description: 'Petrochemical Plant', industryTypeId: '2' },
          { id: '3', code: 'PWR', name: 'Power Plant', description: 'Power Generation Plant', industryTypeId: '3' },
          { id: '4', code: 'WTR', name: 'Water Treatment', description: 'Water Treatment Plant', industryTypeId: '1' },
          { id: '5', code: 'STL', name: 'Steel Mill', description: 'Steel Manufacturing Plant', industryTypeId: '1' },
          { id: '6', code: 'CEM', name: 'Cement Plant', description: 'Cement Manufacturing Plant', industryTypeId: '1' },
          { id: '7', code: 'PHR', name: 'Pharmaceutical Plant', description: 'Pharmaceutical Manufacturing', industryTypeId: '5' },
          { id: '8', code: 'FBV', name: 'Food Processing', description: 'Food Processing Plant', industryTypeId: '6' },
        ]
        
        const filtered = industryTypeId 
          ? allPlantTypes.filter(pt => pt.industryTypeId === industryTypeId)
          : allPlantTypes
          
        resolve(filtered)
      }, 300)
    })
  },

  async getMockCurrencies(): Promise<Currency[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', code: 'USD', name: 'United States Dollar', symbol: '$' },
          { id: '2', code: 'EUR', name: 'Euro', symbol: '€' },
          { id: '3', code: 'GBP', name: 'British Pound Sterling', symbol: '£' },
          { id: '4', code: 'AZN', name: 'Azerbaijani Manat', symbol: '₼' },
          { id: '5', code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
          { id: '6', code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
          { id: '7', code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
          { id: '8', code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
        ])
      }, 200)
    })
  },
}