import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Link, type MetaFunction } from 'react-router';
import { toast } from 'sonner';
import {getStoredSession} from '~/components/CartAuthFlow';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  material?: string;
  image_url?: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  user_email: string;
  product_name?: string;
  product_price?: number;
  product_image?: string;
  product_category?: string;
  product_material?: string;
}

interface CartItemWithProduct extends CartItem {
  product: Product;
}

// Mock Data (Consistent with Wishlist)
const MOCK_USER = {
  email: 'customer@example.com',
  name: 'Gem Mine Customer',
};

export const meta: MetaFunction = () => {
  return [{ title: 'Gem Mine | Shopping Cart' }];
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Determine email key from session
  const session = typeof window !== 'undefined' ? getStoredSession() : null;
  const userEmail = session?.email || 'guest';

  const loadCart = () => {
    // Merge guest + logged-in user carts for display
    const allItems: CartItem[] = [];
    const keys = Array.from(new Set(['guest', userEmail]));
    keys.forEach((key) => {
      try {
        const raw = localStorage.getItem(`cart_${key}`);
        if (raw) {
          const items = JSON.parse(raw) as CartItem[];
          allItems.push(...items);
        }
      } catch {}
    });
    setCartItems(allItems);
    setIsLoading(false);
  };

  useEffect(() => {
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
    return () => window.removeEventListener('cartUpdated', loadCart);
  }, [userEmail]);

  const updateQuantity = (id: string, newQuantity: number) => {
    const updatedAll = [...cartItems];
    const index = updatedAll.findIndex((item) => item.id === id);

    if (index > -1) {
      const itemEmail = updatedAll[index].user_email || 'guest';
      if (newQuantity <= 0) {
        updatedAll.splice(index, 1);
        toast.success('Item removed from cart');
      } else {
        updatedAll[index] = { ...updatedAll[index], quantity: newQuantity };
      }
      // Write back only the items for that user's key
      const keyItems = updatedAll.filter((i) => (i.user_email || 'guest') === itemEmail);
      localStorage.setItem(`cart_${itemEmail}`, JSON.stringify(keyItems));
      setCartItems(updatedAll);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    const itemEmail = item?.user_email || 'guest';
    const updatedAll = cartItems.filter((i) => i.id !== id);
    const keyItems = updatedAll.filter((i) => (i.user_email || 'guest') === itemEmail);
    localStorage.setItem(`cart_${itemEmail}`, JSON.stringify(keyItems));
    setCartItems(updatedAll);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const getProduct = (item: CartItem) => {
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
    return undefined;
  };

  const cartWithProducts: CartItemWithProduct[] = cartItems
    .map((item) => ({
      ...item,
      product: getProduct(item) as Product,
    }))
    .filter((item) => item.product);

  const subtotal = cartWithProducts.reduce(
    (sum: number, item: CartItemWithProduct) =>
      sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] pt-32 pb-20 px-6">
        <div className="w-full">
          <div className="animate-pulse space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-8 bg-gray-200 rounded w-1/5" />
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
          Shopping Cart
        </motion.h1>

        {cartWithProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
          >
            <ShoppingBag className="w-20 h-20 mx-auto text-gray-200 mb-6" />
            <h2 className="text-2xl font-serif text-gray-600 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Discover our exquisite collections
            </p>
            <Link to="/collections/all">
              <button className="bg-gradient-to-r from-[#1e2a47] to-[#2d3e6a] hover:from-[#2d3e6a] hover:to-[#1e2a47] text-white px-10 py-6 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                Explore Collections
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cartWithProducts.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-6">
                      <Link to={`/products/${item.product.id}`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center"
                        >
                          {item.product.image_url ? (
                            <img
                              src={item.product.image_url}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ShoppingBag className="w-8 h-8 text-gray-300" />
                          )}
                        </motion.div>
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-xs text-amber-600 uppercase tracking-wider font-semibold">
                                {item.product.category}
                              </span>
                              <Link to={`/products/${item.product.id}`}>
                                <h3 className="text-lg font-medium text-[#1a1a1a] hover:text-amber-600 transition-colors">
                                  {item.product.name}
                                </h3>
                              </Link>
                              {item.product.material && (
                                <p className="text-sm text-gray-500">
                                  {item.product.material}
                                </p>
                              )}
                            </div>
                            <button
                              className="text-gray-400 hover:text-red-500 p-2 -mr-2 -mt-2 transition-colors"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                            <button
                              className="h-8 w-8 rounded-full hover:bg-white flex items-center justify-center transition-colors"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              {Minus ? <Minus className="w-3 h-3" /> : <span>-</span>}
                            </button>
                            <span className="w-6 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              className="h-8 w-8 rounded-full hover:bg-white flex items-center justify-center transition-colors"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              {Plus ? <Plus className="w-3 h-3" /> : <span>+</span>}
                            </button>
                          </div>

                          <p className="text-xl font-light text-[#1a1a1a]">
                            $
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-sm sticky top-32 border border-gray-50"
              >
                <h2 className="text-xl font-serif text-[#1a1a1a] mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#1a1a1a]">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-[#1a1a1a]">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-amber-600">
                      Free shipping on orders over $5,000
                    </p>
                  )}
                </div>

                <div className="border-t my-6" />

                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total</span>
                  <span className="font-serif text-2xl text-[#1a1a1a]">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <Link to="/pages/checkout">
                  <button className="w-full mt-8 bg-[#1e2a47] hover:bg-[#2d3e6a] text-white h-14 rounded-full text-lg font-medium transition-all shadow-lg shadow-[#1e2a47]/20 flex items-center justify-center gap-2">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>

                <div className="mt-6 p-4 bg-amber-50 rounded-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    Each piece comes with a certificate of authenticity and
                    complimentary gift packaging.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
