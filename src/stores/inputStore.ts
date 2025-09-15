import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface InputState {
  // Tab state
  activeTab: string
  
  // Column visibility
  visibleColumns: Record<string, boolean>
  
  // Table state
  selectedRows: string[]
  
  // Actions
  setActiveTab: (tab: string) => void
  setColumnVisibility: (column: string, visible: boolean) => void
  toggleAllColumns: (visible: boolean) => void
  setSelectedRows: (rows: string[]) => void
  toggleRowSelection: (rowId: string) => void
  clearSelection: () => void
}

export const useInputStore = create<InputState>()(
  devtools(
    (set, get) => ({
      // Initial state
      activeTab: 'equipment-cost',
      visibleColumns: {
        equipmentCategory: true,
        quantity: true,
        rate: true,
        amount: true,
      },
      selectedRows: [],

      // Actions
      setActiveTab: (tab) => set({ activeTab: tab }),

      setColumnVisibility: (column, visible) =>
        set((state) => ({
          visibleColumns: { ...state.visibleColumns, [column]: visible },
        })),

      toggleAllColumns: (visible) =>
        set((state) => {
          const newVisibleColumns = { ...state.visibleColumns }
          Object.keys(newVisibleColumns).forEach((key) => {
            newVisibleColumns[key] = visible
          })
          return { visibleColumns: newVisibleColumns }
        }),

      setSelectedRows: (rows) => set({ selectedRows: rows }),

      toggleRowSelection: (rowId) =>
        set((state) => {
          const isSelected = state.selectedRows.includes(rowId)
          return {
            selectedRows: isSelected
              ? state.selectedRows.filter((id) => id !== rowId)
              : [...state.selectedRows, rowId],
          }
        }),

      clearSelection: () => set({ selectedRows: [] }),
    }),
    { name: 'input-store' }
  )
)