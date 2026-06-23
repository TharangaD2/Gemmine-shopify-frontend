

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material?: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  user_email: string;
}

export const MOCK_USER = {
  email: 'customer@example.com',
  name: 'Gem Mine Customer',
};

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Blue Sapphire Ring',
    category: 'Rings',
    price: 2500,
  },
  {
    id: '2',
    name: 'Timeless Diamond Necklace',
    category: 'Necklaces',
    price: 4800,
  },
  {
    id: '3',
    name: 'Emerald Cut Earrings',
    category: 'Earrings',
    price: 1850,
  },
  {
    id: '4',
    name: 'Classic Gold Bracelet',
    category: 'Bracelets',
    price: 1200,
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [];
