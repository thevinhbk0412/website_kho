
import React, { useState } from 'react';
import { Send, Bot, Sparkles, ChefHat, Loader2 } from 'lucide-react';
import { getChefAdvice } from '../services/geminiService';
import { PRODUCTS } from '../constants';

export const AIChefAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'bot', text: string }[]>([
    { role: 'bot', text: 'Chào bà con! Tui là "Bếp Trưởng Cần Giờ" nè. Anh chị em muốn tui bày cách chế biến món nào từ khô nhà mình thì cứ nói tui nghe nghen!' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const productsToContext = selectedProduct ? [selectedProduct] : PRODUCTS.map(p => p.name).slice(0, 3);
    const advice = await getChefAdvice(userMsg, productsToContext);
    
    setChatHistory(prev => [...prev, { role: 'bot', text: advice }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-fun font-bold text-slate-900 mb-2 flex items-center justify-center gap-3">
          <ChefHat className="text-orange-500" size={40} />
          Bếp Trưởng AI Cần Giờ
        </h2>
        <p className="text-slate-600">Hỏi cách chế biến, công thức nấu ăn hoặc cách chọn khô ngon nhất!</p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-orange-100 overflow-hidden flex flex-col h-[600px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {chatHistory.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.role === 'bot' && (
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-orange-400">
                    <Bot size={14} /> BẾP TRƯỞNG AI
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
                <Loader2 className="animate-spin text-orange-500" size={20} />
                <span className="text-xs text-slate-500 font-medium">Bếp Trưởng đang suy nghĩ...</span>
              </div>
            </div>
          )}
        </div>

        {/* Product Selector for Context */}
        <div className="px-6 py-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap pt-1">Gợi ý chủ đề:</span>
          {PRODUCTS.slice(0, 4).map(p => (
            <button 
              key={p.id}
              onClick={() => {
                setSelectedProduct(p.name);
                setInput(`Làm món gì ngon với ${p.name}?`);
              }}
              className={`text-xs px-3 py-1 rounded-full border transition-all whitespace-nowrap ${
                selectedProduct === p.name ? 'bg-orange-100 border-orange-500 text-orange-600' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập câu hỏi của bạn tại đây..."
              className="w-full pl-6 pr-14 py-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-400 outline-none text-slate-800"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 disabled:bg-slate-300 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
