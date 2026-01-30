
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Khô Cá Dứa 1 Nắng',
    price: 450000,
    image: 'https://picsum.photos/seed/dua/400/400',
    category: 'Cá Khô',
    description: 'Đặc sản trứ danh Cần Giờ, thịt cá béo ngậy, thơm ngon, chỉ cần chiên vàng là tuyệt nhất.',
    rating: 5,
    isPopular: true
  },
  {
    id: '2',
    name: 'Khô Mực Câu Loại 1',
    price: 850000,
    image: 'https://picsum.photos/seed/squid/400/400',
    category: 'Mực Khô',
    description: 'Mực được đánh bắt trực tiếp, phơi nắng tự nhiên trên tàu, ngọt thịt và dai thơm.',
    rating: 4.8,
    isPopular: true
  },
  {
    id: '3',
    name: 'Khô Cá Đù Xẻ',
    price: 180000,
    image: 'https://picsum.photos/seed/fish3/400/400',
    category: 'Cá Khô',
    description: 'Cá đù tươi xẻ bướm, tẩm ướp gia vị vừa ăn, phơi đủ nắng.',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Tôm Khô Đất Rạch Gốc',
    price: 1200000,
    image: 'https://picsum.photos/seed/shrimp/400/400',
    category: 'Tôm Khô',
    description: 'Tôm đất tự nhiên, ngọt lịm, màu đỏ tự nhiên, không phẩm màu.',
    rating: 5,
    isPopular: true
  },
  {
    id: '5',
    name: 'Khô Cá Khoai',
    price: 220000,
    image: 'https://picsum.photos/seed/khoai/400/400',
    category: 'Cá Khô',
    description: 'Món nhắm tuyệt vời cho các buổi tiệc, giòn tan khi nướng.',
    rating: 4.2
  },
  {
    id: '6',
    name: 'Khô Cá Lù Đù 1 Nắng',
    price: 160000,
    image: 'https://picsum.photos/seed/ludu/400/400',
    category: 'Cá Khô',
    description: 'Thịt chắc, vị mặn nhẹ, ăn kèm với cơm trắng thì hết sảy.',
    rating: 4.7
  }
];

export const CATEGORIES = ['Tất cả', 'Cá Khô', 'Mực Khô', 'Tôm Khô'];
