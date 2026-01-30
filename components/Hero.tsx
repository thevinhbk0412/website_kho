
import React from 'react';
import { ChevronRight, Sun, Waves } from 'lucide-react';
import { View } from '../types';

interface HeroProps {
  setView: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-blue-50 py-16 px-4">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 text-orange-200 opacity-50 animate-float">
        <Sun size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-blue-200 opacity-50 animate-float" style={{ animationDelay: '1.5s' }}>
        <Waves size={120} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block px-4 py-1 bg-orange-100 text-orange-600 rounded-full font-semibold text-sm mb-4">
            🌊 Đặc Sản Cần Giờ 100% Tự Nhiên
          </span>
          <h1 className="text-5xl md:text-7xl font-fun font-bold text-slate-900 leading-tight mb-6">
            Đậm Vị Biển, <br />
            <span className="text-orange-500 underline decoration-wavy decoration-blue-400">Rạng Nắng Gió</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto md:mx-0">
            Khám phá hương vị biển Cần Giờ qua từng thớ cá khô thơm lừng, mực một nắng béo ngậy. Giao hàng tận nơi, bao ngon bao ghiền!
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => setView('shop')}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Mua Ngay <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setView('ai-chef')}
              className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-orange-200 text-slate-700 rounded-2xl font-bold transition-all"
            >
              Hỏi Đầu Bếp AI
            </button>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="blob bg-orange-400 w-64 h-64 sm:w-80 sm:h-80 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 blur-2xl opacity-20"></div>
          <img 
            src="https://picsum.photos/seed/seafoodhero/600/600" 
            alt="Khô Cần Giờ" 
            className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};
