import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link, type MetaFunction } from 'react-router';
import { toast } from 'sonner';



interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material?: string;
}

interface WishlistItem {
  id: string;
  product_id: string;
  user_email: string;
  product_name?: string;
  product_price?: number;
  product_image?: string;
  product_category?: string;
  product_material?: string;
}

interface WishlistItemWithProduct extends WishlistItem {
  product: Product;
}

// Mock Data
const MOCK_USER = {
  email: 'customer@example.com',
  name: 'Gem Mine Customer',
};

const SAMPLE_PRODUCTS: Product[] = [
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

export const meta: MetaFunction = () => {
  return [{ title: 'Gem Mine | My Wishlist' }];
};

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = MOCK_USER;

  useEffect(() => {
    const stored = localStorage.getItem(`wishlist_${user?.email}`);
    if (stored) {
      setWishlistItems(JSON.parse(stored) as WishlistItem[]);
    }
    setIsLoading(false);
  }, [user?.email]);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    localStorage.setItem(`wishlist_${user?.email}`, JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
    toast.success('Removed from wishlist');
  };

  const addToCart = (product: Product) => {
    const userEmail = 'customer@example.com';
    const stored = localStorage.getItem(`cart_${userEmail}`);
    const cartItems = stored ? (JSON.parse(stored) as any[]) : [];

    const existingIndex = cartItems.findIndex((item: any) => item.product_id === product.id);

    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += 1;
    } else {
      const newItem = {
        id: `c_${Date.now()}`,
        product_id: product.id,
        quantity: 1,
        user_email: userEmail,
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
        product_material: product.material,
      };
      cartItems.push(newItem);
    }

    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart');
  };

  const getProduct = (item: WishlistItem) => {
    if (item.product_name) {
      return {
        id: item.product_id,
        name: item.product_name,
        price: item.product_price || 0,
        image_url: item.product_image || '',
        category: item.product_category || 'Gem Mine Exclusive',
        material: item.product_material,
      };
    }
    return SAMPLE_PRODUCTS.find((p) => p.id === item.product_id);
  };

  const wishlistWithProducts: WishlistItemWithProduct[] = wishlistItems
    .map((item) => ({
      ...item,
      product: getProduct(item) as Product,
    }))
    .filter((item) => item.product);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] pt-32 pb-20 px-6">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="aspect-square bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-5 bg-gray-200 rounded w-2/3" />
                  <div className="h-6 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] pt-32 pb-20">
      <div className="w-full px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-12"
        >
          My Wishlist
        </motion.h1>

        {wishlistWithProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <Heart className="w-20 h-20 mx-auto text-gray-200 mb-6" />
            <h2 className="text-2xl font-serif text-gray-600 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Save your favorite pieces for later
            </p>
            <Link to="/collections/all">
              <button className="bg-gradient-to-r from-[#1e2a47] to-[#2d3e6a] hover:from-[#2d3e6a] hover:to-[#1e2a47] text-white px-8 py-6 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                Explore Collections
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {wishlistWithProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    <Link to={`/products/${item.product.id}`}>
                      <div className="aspect-square overflow-hidden relative bg-gray-50">


                        <button
                          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-red-50 hover:text-red-500 rounded-full shadow-md z-10 transition-colors p-2"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFromWishlist(item.id);
                          }}
                        >
                          {Trash2 ? <Trash2 className="w-4 h-4" /> : <div className="w-4 h-4 bg-red-500 rounded-full" />}
                        </button>
                      </div>
                    </Link>

                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[10px] text-amber-600 uppercase tracking-[0.2em] font-bold">
                        {item.product.category}
                      </span>
                      <Link to={`/products/${item.product.id}`}>
                        <h3 className="text-lg font-serif text-[#1a1a1a] mt-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xl font-medium text-[#1a1a1a] mt-2">
                        ${item.product.price?.toLocaleString()}
                      </p>

                      <button
                        className="w-full mt-auto bg-[#1e2a47] hover:bg-[#2d3e6a] text-white rounded-full transition-all shadow-md hover:shadow-lg h-11 flex items-center justify-center gap-2"
                        onClick={() => addToCart(item.product)}
                      >
                        {ShoppingBag ? <ShoppingBag className="w-4 h-4" /> : <div className="w-4 h-4 bg-white rounded-full" />}
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
