import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { SalesData } from '../types.ts';

interface DashboardProps {
  data: SalesData[];
}

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend?: string }> = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      {trend && <p className="text-xs font-medium text-green-600 mt-1">{trend}</p>}
    </div>
    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
      {icon}
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$54,230" 
          trend="+12% from last month" 
          icon={<DollarSign size={24} />} 
        />
        <StatCard 
          title="Total Orders" 
          value="1,245" 
          trend="+5% from last month" 
          icon={<ShoppingBag size={24} />} 
        />
        <StatCard 
          title="Inventory Items" 
          value="342" 
          icon={<Package size={24} />} 
        />
        <StatCard 
          title="Growth Rate" 
          value="24.5%" 
          trend="+2.1% from last month" 
          icon={<TrendingUp size={24} />} 
        />
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h2>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => [`$${value}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;