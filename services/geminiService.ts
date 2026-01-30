
import { GoogleGenAI } from "@google/genai";

// Fixed: Use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChefAdvice = async (userPrompt: string, selectedProducts: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Bạn là một đầu bếp chuyên nghiệp về đặc sản Cần Giờ. Hãy tư vấn công thức nấu ăn hoặc cách chế biến ngon nhất cho các loại khô sau: ${selectedProducts.join(', ')}. 
      Câu hỏi của khách hàng: ${userPrompt}. 
      Hãy trả lời bằng tiếng Việt, giọng điệu vui vẻ, nhiệt huyết và gần gũi như người dân vùng biển Cần Giờ.`,
    });
    // Fixed: Correctly using .text property (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ối chao, sóng biển hơi mạnh nên em chưa nghe rõ. Anh chị hỏi lại được không ạ? (Lỗi kết nối AI)";
  }
};
