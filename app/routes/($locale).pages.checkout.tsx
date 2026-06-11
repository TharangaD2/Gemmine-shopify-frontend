import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {
  CreditCard,
  Truck,
  Shield,
  Check,
  ArrowLeft,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import {Link, useNavigate, type MetaFunction} from 'react-router';
import {toast} from 'sonner';

// Asset imports
import img1 from '~/assets/img/img1.png';
import img2 from '~/assets/img/img2.png';
import img3 from '~/assets/img/img3.png';
import img4 from '~/assets/img/img4.png';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
  material?: string;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  user_email: string;
}

interface CartItemWithProduct extends CartItem {
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

export const meta: MetaFunction = () => {
  return [{title: 'Gem Mine | Checkout'}];
};

// Local UI Components
const Input = ({
  className = '',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({
  className = '',
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-sm font-semibold text-gray-700 mb-2 block ${className}`}
    {...props}
  />
);

const Button = ({
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
    card_number: '',
    expiry: '',
    cvv: '',
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = MOCK_USER;

  useEffect(() => {
    const stored = localStorage.getItem(`cart_${user?.email}`);
    if (stored) {
      setCartItems(JSON.parse(stored) as CartItem[]);
    }
    setIsLoading(false);
  }, [user?.email]);

  const getProduct = (productId: string) =>
    SAMPLE_PRODUCTS.find((p) => p.id === productId);

  const cartWithProducts: CartItemWithProduct[] = cartItems
    .map((item) => ({
      ...item,
      product: getProduct(item.product_id) as Product,
    }))
    .filter((item) => item.product);

  const subtotal = cartWithProducts.reduce(
    (sum: number, item: CartItemWithProduct) =>
      sum + item.product.price * item.quantity,
    0,
  );

  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 50;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      setIsSubmitting(true);
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderId = Math.random().toString(36).substr(2, 9);
      const order = {
        id: orderId,
        items: cartWithProducts.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total,
        shipping_address: {
          name: formData.name,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postal_code,
          country: formData.country,
          phone: formData.phone,
        },
        user_email: user?.email,
        status: 'confirmed',
        created_at: new Date().toISOString(),
      };

      // Save order
      const orders = JSON.parse(
        localStorage.getItem(`orders_${user?.email}`) || '[]',
      ) as any[];
      orders.push(order);
      localStorage.setItem(`orders_${user?.email}`, JSON.stringify(orders));

      // Clear cart
      localStorage.setItem(`cart_${user?.email}`, JSON.stringify([]));

      toast.success('Order placed successfully!');
      setIsSubmitting(false);
      navigate('/');
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#f8f5f0]" />;

  if (cartWithProducts.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8f5f0] pt-32 pb-20 px-6">
        <div className="w-full text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-gray-300 mb-6" />
          <h1 className="text-3xl font-serif text-[#1a1a1a] mb-4">
            Your cart is empty
          </h1>
          <Link to="/collections/all">
            <Button className="bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white px-8 py-6 rounded-full transition-all">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] pt-32 pb-20">
      <div className="w-full px-6">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-10">
              {['Shipping', 'Payment'].map((label, idx) => (
                <React.Fragment key={label}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm ${
                        step > idx + 1
                          ? 'bg-green-500 text-white'
                          : step === idx + 1
                          ? 'bg-[#1a1a1a] text-white'
                          : 'bg-white text-gray-400 border border-gray-200'
                      }`}
                    >
                      {step > idx + 1 ? <Check className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span
                      className={`text-sm tracking-wide uppercase ${
                        step === idx + 1
                          ? 'font-semibold text-[#1a1a1a]'
                          : 'text-gray-400 font-medium'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {idx < 1 && <div className="flex-1 h-px bg-gray-200 mx-2" />}
                </React.Fragment>
              ))}
            </div>

            <motion.div
              key={step}
              initial={{opacity: 0, x: 20}}
              animate={{opacity: 1, x: 0}}
              className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100"
            >
              {step === 1 ? (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-serif text-[#1a1a1a]">
                      Shipping Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || user?.email || ''}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="+94 77 000 0000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Sri Lanka"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="Colombo"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal_code">Postal Code</Label>
                      <Input
                        id="postal_code"
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        required
                        className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
                        placeholder="00100"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-10 bg-[#1a1a1a] hover:bg-amber-700 text-white h-14 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl"
                  >
                    Continue to Payment
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-amber-600" />
                    </div>
                    <h2 className="text-2xl font-serif text-[#1a1a1a]">
                      Secure Payment
                    </h2>
                  </div>

                  <div className="space-y-7">
                    <div className="space-y-2">
                      <Label htmlFor="card_number">Card Number</Label>
                      <Input
                        id="card_number"
                        name="card_number"
                        placeholder="0000 0000 0000 0000"
                        value={formData.card_number}
                        onChange={handleInputChange}
                        required
                        className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 font-mono tracking-widest"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          required
                          className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 uppercase tracking-widest"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV Code</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          placeholder="000"
                          type="password"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          className="h-14 bg-gray-50 border-gray-200 rounded-xl focus:ring-amber-500 focus:border-amber-500 tracking-widest"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-8 p-5 bg-green-50 rounded-2xl border border-green-100">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-800 font-medium">
                      Your payment is secured with industry-standard AES-256
                      encryption. We never store your full card details.
                    </span>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <Button
                      type="button"
                      className="flex-1 h-14 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                      onClick={() => setStep(1)}
                    >
                      Previous Step
                    </Button>
                    <Button
                      type="submit"
                      className="flex-[2] bg-[#1a1a1a] hover:bg-amber-700 text-white h-14 rounded-full text-lg font-medium transition-all shadow-lg hover:shadow-xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing Order...
                        </>
                      ) : (
                        `Complete Purchase - $${total.toLocaleString()}`
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-serif text-[#1a1a1a] mb-8 pb-4 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartWithProducts.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 py-1">
                      <h4 className="font-semibold text-sm text-[#1a1a1a] truncate mb-1">
                        {item.product.name}
                      </h4>
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                        {item.product.category}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-medium text-[#1a1a1a]">
                          $
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 mt-8 pt-8 space-y-4">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-[#1a1a1a]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium pb-4 border-b border-gray-100">
                  <span>Standard Shipping</span>
                  <span
                    className={
                      shipping === 0 ? 'text-green-600' : 'text-[#1a1a1a]'
                    }
                  >
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#1a1a1a] uppercase tracking-widest mb-1">
                      Total Amount
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      Including all taxes
                    </span>
                  </div>
                  <span className="font-serif text-3xl text-[#1a1a1a]">
                    ${total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[11px] text-gray-400 text-center leading-relaxed font-medium">
                  By completing your purchase, you agree to our{' '}
                  <span className="text-amber-600 hover:underline cursor-pointer">
                    Terms of Service
                  </span>{' '}
                  and{' '}
                  <span className="text-amber-600 hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8f5f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}} />
    </div>
  );
}
