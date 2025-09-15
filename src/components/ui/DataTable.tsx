import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  header: string;
  width?: string;
  render?: (item: any) => React.ReactNode;
}

interface Pagination {
  pageSize: number;
  total: number;
  current: number;
  onChange: (page: number, pageSize: number) => void;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  loading?: boolean;
  pagination?: Pagination;
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  loading = false,
  pagination,
  className = '',
}) => {
  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.id || index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {column.render ? column.render(item) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Items per page:
            </span>
            <select
              value={pagination.pageSize}
              onChange={(e) => pagination.onChange(1, parseInt(e.target.value))}
              className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              Showing 1-{Math.min(pagination.pageSize, pagination.total)} of {pagination.total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
                disabled={pagination.current <= 1}
                className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded border border-blue-200">
                {pagination.current}
              </span>
              <button
                onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
                disabled={pagination.current * pagination.pageSize >= pagination.total}
                className="p-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;