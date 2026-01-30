
import React from 'react';
import { Star, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-100 transition-all duration-300">
      <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isPopular && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
            <Star size={12} fill="currentColor" /> BÁN CHẠY
          </span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold text-orange-500 uppercase tracking-wider">{product.category}</p>
        <h3 className="font-bold text-slate-800 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
          ))}
          <span className="text-xs text-slate-400 ml-1">({product.rating})</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div>
          <span className="text-lg font-bold text-slate-900">
            {product.price.toLocaleString('vi-VN')}
          </span>
          <span className="text-[10px] font-bold text-slate-500 ml-1">VND</span>
        </div>
        <button 
          onClick={() => onAddToCart(product)}
          className="bg-orange-100 text-orange-600 p-2.5 rounded-xl hover:bg-orange-500 hover:text-white transition-all active:scale-95"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};
