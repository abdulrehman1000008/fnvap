import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useEquipmentCosts } from '@/hooks/useInputs'
import { useInputStore } from '@/stores/inputStore'
import { formatCurrency } from '@/lib/utils'
import { Edit2, Trash2, Plus } from 'lucide-react'

export const EquipmentCostTable: React.FC = () => {
  const { data: equipmentCosts, isLoading } = useEquipmentCosts()
  const { visibleColumns, selectedRows, toggleRowSelection, clearSelection } = useInputStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleEdit = (id: string) => {
    console.log('Edit equipment cost:', id)
  }

  const handleDelete = (id: string) => {
    console.log('Delete equipment cost:', id)
  }

  const handleAdd = () => {
    console.log('Add new equipment cost')
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = equipmentCosts?.map(item => item.id) || []
      // Set all IDs as selected (this would need to be implemented in the store)
    } else {
      clearSelection()
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted-foreground">Loading equipment costs...</span>
      </div>
    )
  }

  const displayedData = equipmentCosts || []
  const totalItems = displayedData.length
  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)
  const currentData = displayedData.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === currentData.length && currentData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {visibleColumns.equipmentCategory && (
                <TableHead>Equipment Category</TableHead>
              )}
              {visibleColumns.quantity && (
                <TableHead className="text-right">Quantity</TableHead>
              )}
              {visibleColumns.rate && (
                <TableHead className="text-right">Rate (USD)</TableHead>
              )}
              {visibleColumns.amount && (
                <TableHead className="text-right">Amount (USD)</TableHead>
              )}
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={Object.values(visibleColumns).filter(Boolean).length + 2} 
                  className="text-center py-8 text-muted-foreground"
                >
                  No equipment costs found
                </TableCell>
              </TableRow>
            ) : (
              currentData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(item.id)}
                      onCheckedChange={() => toggleRowSelection(item.id)}
                    />
                  </TableCell>
                  {visibleColumns.equipmentCategory && (
                    <TableCell className="font-medium">
                      {item.equipmentCategory}
                    </TableCell>
                  )}
                  {visibleColumns.quantity && (
                    <TableCell className="text-right">
                      {item.quantity.toLocaleString()}
                    </TableCell>
                  )}
                  {visibleColumns.rate && (
                    <TableCell className="text-right">
                      {formatCurrency(item.rate)}
                    </TableCell>
                  )}
                  {visibleColumns.amount && (
                    <TableCell className="text-right font-medium">
                      {formatCurrency(item.amount)}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(item.id)}
                        className="h-8 w-8"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleAdd}
                        className="h-8 w-8 text-green-600 hover:text-green-600"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Items per page:
            </span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(parseInt(e.target.value))
                setCurrentPage(1)
              }}
              className="border border-input rounded px-2 py-1 text-sm bg-background"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{endIndex} of {totalItems}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
                {currentPage}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}