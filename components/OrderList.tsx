import React, { useState } from 'react';
import { Eye, Filter, Download } from 'lucide-react';
import { Order, OrderStatus } from '../types.ts';

interface OrderListProps {
  orders: Order[];
  onStatusChange: (id: string, newStatus: OrderStatus) => void;
}

const statusColors: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [OrderStatus.PROCESSING]: 'bg-blue-100 text-blue-800',
  [OrderStatus.SHIPPED]: 'bg-indigo-100 text-indigo-800',
  [OrderStatus.DELIVERED]: 'bg-green-100 text-green-800',
  [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
};

const OrderList: React.FC<OrderListProps> = ({ orders, onStatusChange }) => {
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');

  const filteredOrders = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
        <div className="flex gap-2">
           <div className="relative">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16}/>
             <select 
                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
                value={filter}
                onChange={(e) => setFilter(e.target.value as OrderStatus | 'All')}
             >
               <option value="All">All Status</option>
               {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
             </select>
           </div>
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
             <Download size={16} />
             <span>Export</span>
           </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-sm text-indigo-600 font-medium">#{order.id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.items} items</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block max-w-[150px]">
                      <select
                        value={order.status}
                        onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
                        className={`w-full appearance-none cursor-pointer pl-3 pr-8 py-1.5 text-xs font-medium rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-shadow ${statusColors[order.status]}`}
                      >
                        {Object.values(OrderStatus).map((s) => (
                          <option key={s} value={s} className="bg-white text-gray-900 py-1">
                            {s}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current opacity-75">
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-indigo-600"><Eye size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOrders.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;