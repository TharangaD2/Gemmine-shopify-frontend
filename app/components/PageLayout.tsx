import { Await, Link } from 'react-router';
import { Suspense, useId, useState, useEffect } from 'react';
import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import { Aside, useAside } from '~/components/Aside';
import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';
import { CartMain } from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import { SearchResultsPredictive } from '~/components/SearchResultsPredictive';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import img1 from '~/assets/img/img1.png';
import img2 from '~/assets/img/img2.png';
import img3 from '~/assets/img/img3.png';
import img4 from '~/assets/img/img4.png';

const SAMPLE_PRODUCTS = [
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

interface LocalCartItem {
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

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      <CartAside />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      <Header />
      <main>{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider>
  );
}

function CartAside() {
  return (
    <Aside type="cart" heading="CART">
      <LocalStorageCartDrawer />
    </Aside>
  );
}

function LocalStorageCartDrawer() {
  const [cartItems, setCartItems] = useState<LocalCartItem[]>([]);
  const { close } = useAside();
  const userEmail = 'customer@example.com';

  const updateCart = () => {
    const stored = localStorage.getItem(`cart_${userEmail}`);
    if (stored) {
      setCartItems(JSON.parse(stored) as LocalCartItem[]);
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    updateCart();
    window.addEventListener('storage', updateCart);
    window.addEventListener('cartUpdated', updateCart);
    return () => {
      window.removeEventListener('storage', updateCart);
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    let updatedCart = [...cartItems];
    const index = updatedCart.findIndex((item) => item.id === id);

    if (index > -1) {
      if (newQuantity <= 0) {
        updatedCart = updatedCart.filter((item) => item.id !== id);
        toast.success('Item removed from cart');
      } else {
        updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
      }
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Item removed from cart');
  };

  const getProduct = (item: LocalCartItem) => {
    if (item.product_name) {
      return {
        id: item.product_id,
        name: item.product_name,
        price: item.product_price || 0,
        image_url: item.product_image || '',
        category: item.product_category || 'Gem Mine Exclusive',
      };
    }
    return SAMPLE_PRODUCTS.find((p) => p.id === item.product_id);
  };

  const cartWithProducts = cartItems
    .map((item) => ({
      ...item,
      product: getProduct(item),
    }))
    .filter((item) => item.product);

  const subtotal = cartWithProducts.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0,
  );

  if (cartWithProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center h-[calc(100vh-120px)]">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-6 animate-bounce" />
        <h3 className="text-xl font-serif text-gray-700 mb-2">Your cart is empty</h3>
        <p className="text-sm text-gray-400 mb-8">Add exquisite pieces to get started</p>
        <Link
          to="/collections/all"
          onClick={close}
          className="bg-gradient-to-r from-[#1e2a47] to-[#2d3e6a] hover:from-[#2d3e6a] hover:to-[#1e2a47] text-white px-8 py-3.5 rounded-full text-sm font-medium transition-all shadow-md flex items-center gap-2"
        >
          Explore Collections
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] justify-between pb-4">
      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {cartWithProducts.map((item) => {
          const product = item.product!;
          return (
            <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100/50">
              <Link to={`/products/${product.id}`} onClick={close} className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-gray-100">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="text-sm font-medium text-gray-800 truncate">{product.name}</h4>
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-0.5">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-[10px] text-amber-600 uppercase tracking-wider font-semibold">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white rounded-full px-2 py-0.5 border border-gray-100">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-4 text-center text-xs font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-sm font-medium text-gray-800">${(product.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer / Summary */}
      <div className="border-t border-gray-100 pt-6 mt-6 bg-white space-y-4">
        <div className="flex justify-between items-center text-gray-600">
          <span className="text-sm">Subtotal</span>
          <span className="text-lg font-serif text-gray-900">${subtotal.toLocaleString()}</span>
        </div>
        <Link to="/pages/checkout" onClick={close} className="w-full bg-[#1e2a47] hover:bg-[#2d3e6a] text-white py-4 rounded-2xl font-medium transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          Proceed to Checkout
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="predictive-search">
        <br />
        <SearchFormPredictive>
          {({ fetchResults, goToSearch, inputRef }) => (
            <>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Search"
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
              />
              &nbsp;
              <button onClick={goToSearch}>Search</button>
            </>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({ items, total, term, state, closeSearch }) => {
            const { articles, collections, pages, products, queries } = items;

            if (state === 'loading' && term.current) {
              return <div>Loading...</div>;
            }

            if (!total) {
              return <SearchResultsPredictive.Empty term={term} />;
            }

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                  >
                    <p>
                      View all results for <q>{term.current}</q>
                      &nbsp; →
                    </p>
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({
  header,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  return null; // The new Header handles mobile menu internally
}
