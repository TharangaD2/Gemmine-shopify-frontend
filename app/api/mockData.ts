import img1 from '~/assets/img/img1.png';
import img2 from '~/assets/img/img2.png';
import img3 from '~/assets/img/img3.png';
import img4 from '~/assets/img/img4.png';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
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
    image_url: img1,
  },
  {
    id: '2',
    name: 'Timeless Diamond Necklace',
    category: 'Necklaces',
    price: 4800,
    image_url: img2,
  },
  {
    id: '3',
    name: 'Emerald Cut Earrings',
    category: 'Earrings',
    price: 1850,
    image_url: img3,
  },
  {
    id: '4',
    name: 'Classic Gold Bracelet',
    category: 'Bracelets',
    price: 1200,
    image_url: img4,
  },
];

export const INITIAL_CART_ITEMS: CartItem[] = [];
