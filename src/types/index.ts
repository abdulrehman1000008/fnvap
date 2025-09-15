export interface Project {
  id: string
  projectId: string
  projectName: string
  industryType: string
  plantType: string
  baseCurrency: string
  creationDate: string
  customerReference?: string
  version: string
  createdAt: string
  updatedAt: string
}

export interface IndustryType {
  id: string
  code: string
  name: string
  description: string
}

export interface PlantType {
  id: string
  code: string
  name: string
  description: string
  industryTypeId: string
}

export interface Currency {
  id: string
  code: string
  name: string
  symbol: string
}

export interface EquipmentCost {
  id: string
  projectId: string
  equipmentCategory: string
  quantity: number
  rate: number
  amount: number
  currency: string
  version: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface FormErrors {
  [key: string]: string | undefined
}

export interface LoadingState {
  [key: string]: boolean
}