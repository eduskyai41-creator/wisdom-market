export interface Product {
  id: number;
  name: string;
  producer: string;
  category: 'ของใช้' | 'อาหาร' | 'เครื่องแต่งกาย' | 'ของตกแต่ง' | 'เครื่องประดับ';
  province: string;
  story: string;
  longStory: string;
  price: string;
  images: string[];
  rating: number;
  reviewCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Page = 'home' | 'all-products' | 'product-detail' | 'cart' | 'stories' | 'about' | 'confirmation';

export type SortOption = 'default' | 'price-asc' | 'price-desc';

export interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}