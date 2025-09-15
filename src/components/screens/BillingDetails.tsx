import React from 'react';
import { CreditCard, FileText, Clock, DollarSign } from 'lucide-react';

const BillingDetails: React.FC = () => {
  const billingData = [
    { period: 'January 2025', amount: '$2,450.00', status: 'Paid', date: '2025-01-15' },
    { period: 'February 2025', amount: '$2,450.00', status: 'Paid', date: '2025-02-15' },
    { period: 'March 2025', amount: '$2,450.00', status: 'Pending', date: '2025-03-15' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing Details</h1>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Current</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">$2,450.00</p>
          <p className="text-gray-600 text-sm">Monthly Subscription</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">Due</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">Mar 15</p>
          <p className="text-gray-600 text-sm">Next Payment</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-purple-600 font-medium">Active</span>
          </div>
          <p className="text-lg font-bold text-gray-900 mb-1">•••• 4532</p>
          <p className="text-gray-600 text-sm">Payment Method</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 text-orange-600" />
            <span className="text-sm text-orange-600 font-medium">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-1">12</p>
          <p className="text-gray-600 text-sm">Invoices Sent</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {billingData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {item.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <button className="hover:text-blue-800">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingDetails;