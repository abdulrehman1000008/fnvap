import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import { ApiResponse } from '@/types'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('auth_token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Log requests in development
        if (import.meta.env.DEV) {
          console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data)
        }

        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log responses in development
        if (import.meta.env.DEV) {
          console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data)
        }
        return response
      },
      (error: AxiosError) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        } else if (error.response?.status === 403) {
          // Forbidden
          console.error('Access forbidden')
        } else if (error.response?.status >= 500) {
          // Server error
          console.error('Server error:', error.response.data)
        }

        // Log errors in development
        if (import.meta.env.DEV) {
          console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, error.response?.data)
        }

        return Promise.reject(error)
      }
    )
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await this.client.get(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.post(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.put(url, data)
    return response.data
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    const response = await this.client.patch(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete(url)
    return response.data
  }
}

export const apiClient = new ApiClient()