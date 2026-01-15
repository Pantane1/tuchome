import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  MessageSquare, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react';
import { View, Product, Order, OrderStatus, SalesData } from './types.ts';
import Dashboard from './components/Dashboard.tsx';
import Inventory from './components/Inventory.tsx';
import OrderList from './components/OrderList.tsx';
import AIAssistant from './components/AIAssistant.tsx';

// Mock Data
const MOCK_SALES_DATA: SalesData[] = [
  { name: 'Jan', revenue: 4000, orders: 240 },
  { name: 'Feb', revenue: 3000, orders: 198 },
  { name: 'Mar', revenue: 5000, orders: 305 },
  { name: 'Apr', revenue: 4500, orders: 275 },
  { name: 'May', revenue: 6000, orders: 400 },
  { name: 'Jun', revenue: 7500, orders: 480 },
  { name: 'Jul', revenue: 8000, orders: 510 },
];

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Wireless Headset', category: 'Electronics', price: 129.99, stock: 45, description: 'Noise cancelling, 20h battery life.', imageUrl: 'https://picsum.photos/200?random=1' },
  { id: '2', name: 'Ergonomic Office Chair', category: 'Furniture', price: 249.99, stock: 8, description: 'Lumbar support with breathable mesh.', imageUrl: 'https://picsum.photos/200?random=2' },
  { id: '3', name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 120, description: 'RGB backlit, blue switches.', imageUrl: 'https://picsum.photos/200?random=3' },
  { id: '4', name: 'Stainless Steel Water Bottle', category: 'Accessories', price: 24.50, stock: 200, description: 'Insulated, keeps cold for 24h.', imageUrl: 'https://picsum.photos/200?random=4' },
];

const MOCK_ORDERS_INIT: Order[] = [
  { id: '1001', customerName: 'Alex Johnson', date: '2023-10-24', total: 154.49, status: OrderStatus.SHIPPED, items: 2 },
  { id: '1002', customerName: 'Sarah Smith', date: '2023-10-25', total: 249.99, status: OrderStatus.PROCESSING, items: 1 },
  { id: '1003', customerName: 'Michael Brown', date: '2023-10-25', total: 49.00, status: OrderStatus.PENDING, items: 2 },
  { id: '1004', customerName: 'Emily Davis', date: '2023-10-23', total: 89.99, status: OrderStatus.DELIVERED, items: 1 },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS_INIT);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handlers
  const handleStatusChange = (id: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Navigation Items
  const navItems = [
    { view: View.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { view: View.ORDERS, label: 'Orders', icon: <ShoppingCart size={20} /> },
    { view: View.INVENTORY, label: 'Inventory', icon: <Package size={20} /> },
    { view: View.AI_ASSISTANT, label: 'AI Coach', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">V</div>
          <span className="text-xl font-bold text-gray-900">VendorNexus</span>
          <button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.view}
              onClick={() => {
                setCurrentView(item.view);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.view 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 px-4 py-3">
            <img src="https://picsum.photos/40" alt="Vendor" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Pro Vendor</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <Menu size={24} />
          </button>
          
          <div className="flex-1 max-w-lg mx-4 hidden sm:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, products..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {currentView === View.DASHBOARD && <Dashboard data={MOCK_SALES_DATA} />}
          {currentView === View.INVENTORY && <Inventory products={products} setProducts={setProducts} />}
          {currentView === View.ORDERS && <OrderList orders={orders} onStatusChange={handleStatusChange} />}
          {currentView === View.AI_ASSISTANT && <AIAssistant />}
        </main>
      </div>
    </div>
  );
};

export default App;