
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type View = 'home' | 'shop' | 'cart' | 'ai-chef';
