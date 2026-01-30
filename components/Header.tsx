
import React from 'react';
import { ShoppingCart, ChefHat, Store, Home, Menu } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
  cartCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, cartCount }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setView('home')}
        >
          <div className="bg-orange-500 p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Store className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold font-fun text-orange-600 hidden sm:block">
            Khô Cần Giờ
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'home', label: 'Trang Chủ', icon: Home },
            { id: 'shop', label: 'Cửa Hàng', icon: Store },
            { id: 'ai-chef', label: 'Bếp Trưởng AI', icon: ChefHat },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className={`flex items-center gap-1.5 font-medium transition-colors ${
                currentView === item.id ? 'text-orange-500' : 'text-slate-600 hover:text-orange-400'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('cart')}
            className="relative p-2 bg-slate-100 rounded-full hover:bg-orange-100 transition-colors"
          >
            <ShoppingCart size={22} className="text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2">
            <Menu size={24} className="text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
};
