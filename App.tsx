
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { AIChefAssistant } from './components/AIChefAssistant';
import { PRODUCTS, CATEGORIES } from './constants';
import { Product, CartItem, View } from './types';
// Fixed: Added missing Sparkles and Store imports from lucide-react
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle2, Sparkles, Store } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const filteredProducts = activeCategory === 'Tất cả' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleCheckout = () => {
    setOrderSuccess(true);
    setCart([]);
    setTimeout(() => {
      setOrderSuccess(false);
      setView('home');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <Header currentView={view} setView={setView} cartCount={cartCount} />

      <main className="flex-1">
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-fun font-bold text-slate-900 mb-2">Đặc Sản Nổi Bật</h2>
                  <p className="text-slate-500">Tuyển chọn những loại khô ngon nhất, phơi tự nhiên dưới nắng biển Cần Giờ.</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                        activeCategory === cat 
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' 
                          : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>

              <div className="mt-16 text-center">
                <button 
                  onClick={() => setView('shop')}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
                >
                  Xem Tất Cả Sản Phẩm
                </button>
              </div>
            </section>

            {/* AI Callout Section */}
            <section className="bg-orange-500 py-20 px-4">
              <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 text-white">
                <div className="flex-1">
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles size={32} />
                  </div>
                  <h2 className="text-4xl font-fun font-bold mb-4">Lúng túng không biết nấu món gì?</h2>
                  <p className="text-orange-100 text-lg mb-8">
                    Gặp ngay Bếp Trưởng AI của chúng tôi. Chuyên gia ẩm thực Cần Giờ sẽ hướng dẫn bạn biến tấu các loại cá khô thành những món nhậu, món cơm đỉnh cao.
                  </p>
                  <button 
                    onClick={() => setView('ai-chef')}
                    className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-colors"
                  >
                    Hỏi Ý Kiến Bếp Trưởng
                  </button>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full"></div>
                    <img 
                      src="https://picsum.photos/seed/aichef/500/500" 
                      alt="AI Chef" 
                      className="relative z-10 rounded-[3rem] shadow-2xl rotate-2"
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {view === 'shop' && (
          <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-fun font-bold text-slate-900 mb-8">Cửa Hàng Đặc Sản</h2>
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                    activeCategory === cat 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-100' 
                      : 'bg-white text-slate-600 border border-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </section>
        )}

        {view === 'ai-chef' && <AIChefAssistant />}

        {view === 'cart' && (
          <section className="max-w-4xl mx-auto px-4 py-12">
            {orderSuccess ? (
              <div className="text-center py-20 bg-white rounded-[3rem] shadow-xl border border-green-100 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-4xl font-fun font-bold text-slate-900 mb-2">Đặt Hàng Thành Công!</h2>
                <p className="text-slate-500 mb-8">Cảm ơn bà con đã ủng hộ đặc sản Cần Giờ. <br />Đơn hàng sẽ sớm được giao đến bạn.</p>
                <button 
                  onClick={() => setView('home')}
                  className="px-8 py-4 bg-orange-500 text-white rounded-2xl font-bold"
                >
                  Tiếp Tục Mua Sắm
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                  <h2 className="text-2xl font-fun font-bold text-slate-900">Giỏ Hàng Của Bạn</h2>
                  <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-bold">
                    {cartCount} món
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="py-24 text-center">
                    <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag size={40} />
                    </div>
                    <p className="text-slate-500 font-medium mb-6">Giỏ hàng đang trống trơn...</p>
                    <button 
                      onClick={() => setView('shop')}
                      className="px-8 py-3 bg-orange-500 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors"
                    >
                      Đi mua khô ngay!
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="p-8 space-y-6">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                          <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl shadow-sm" />
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-800 text-lg">{item.name}</h3>
                            <p className="text-orange-500 font-bold">{item.price.toLocaleString('vi-VN')} đ</p>
                          </div>
                          <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-slate-200">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-orange-500"><Minus size={18} /></button>
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-orange-500"><Plus size={18} /></button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-8 bg-slate-50 border-t border-slate-100">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-slate-600 font-medium">Tổng thanh toán:</span>
                        <span className="text-3xl font-bold text-slate-900">{cartTotal.toLocaleString('vi-VN')} đ</span>
                      </div>
                      <button 
                        onClick={handleCheckout}
                        className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all hover:-translate-y-1"
                      >
                        Tiến Hành Thanh Toán
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-500 p-2 rounded-xl">
                <Store className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold font-fun text-white">Khô Cần Giờ</span>
            </div>
            <p className="max-w-md leading-relaxed">
              Chúng tôi mang đến cho bạn những loại đặc sản khô ngon nhất từ vùng biển Cần Giờ. Cam kết không chất bảo quản, phơi nắng tự nhiên, vị đậm đà truyền thống.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Khám Phá</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setView('shop')} className="hover:text-orange-400">Tất cả sản phẩm</button></li>
              <li><button onClick={() => setView('home')} className="hover:text-orange-400">Về chúng tôi</button></li>
              <li><button onClick={() => setView('ai-chef')} className="hover:text-orange-400">Bếp trưởng AI</button></li>
              <li><a href="#" className="hover:text-orange-400">Chính sách vận chuyển</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Liên Hệ</h4>
            <ul className="space-y-4 text-sm">
              <li>📍 Huyện Cần Giờ, TP. Hồ Chí Minh</li>
              <li>📞 Hotline: 0123 456 789</li>
              <li>✉️ Email: info@khocangio.vn</li>
              <li>⏰ 08:00 - 21:00 (Mỗi ngày)</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 Khô Cần Giờ - Vị Biển Nắng Gió. Được thực hiện với niềm đam mê hải sản.
        </div>
      </footer>
    </div>
  );
};

export default App;
