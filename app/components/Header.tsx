import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Link, NavLink} from 'react-router';
import {
  Heart,
  ShoppingBag,
  Menu,
  X,
} from 'lucide-react';
import type {HeaderQuery} from 'storefrontapi.generated';
import logo from '~/assets/img/logo.png';

const createPageUrl = (path: string) => {
  const handle = path.toLowerCase();
  if (handle === 'collections') return '/collections/all';
  if (handle === 'blog') return '/blogs';
  if (handle === 'wishlist') return '/pages/wishlist';
  if (handle === 'cart') return '/cart';
  return `/pages/${handle}`;
};

// Local UI Components to match the design
const Button = ({
  variant = 'ghost',
  size = 'icon',
  className = '',
  children,
  onClick,
}: {
  variant?: 'ghost' | 'outline';
  size?: 'icon' | 'default';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    ghost: 'hover:bg-transparent',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  };
  const sizes = {
    icon: 'h-10 w-10',
    default: 'h-10 px-4 py-2',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Badge = ({className = '', children}: {className?: string; children: React.ReactNode}) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

export function HeaderMenu() {
  return null; // The new Header handles navigation internally
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const userEmail = 'customer@example.com';
    const storedCart = localStorage.getItem(`cart_${userEmail}`);
    const storedWishlist = localStorage.getItem(`wishlist_${userEmail}`);

    if (storedCart) {
      const items = JSON.parse(storedCart) as any[];
      setCartCount(items.reduce((acc: number, item: any) => acc + item.quantity, 0));
    } else {
      setCartCount(0);
    }

    if (storedWishlist) {
      const items = JSON.parse(storedWishlist) as any[];
      setWishlistCount(items.length);
    } else {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateCounts();

    // Listen for custom events and storage changes
    window.addEventListener('storage', updateCounts);
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('wishlistUpdated', updateCounts);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('wishlistUpdated', updateCounts);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    {name: 'Collections', path: 'Collections'},
    {name: 'Blog', path: 'Blog'},
    {name: 'About', path: 'About'},
    {name: 'Contact', path: 'Contact'},
  ];

  return (
    <>
      <motion.nav
        initial={{y: -100}}
        animate={{y: 0}}
        transition={{duration: 0.6}}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-[#1e2a47]/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Gem Mine" className="h-20 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={createPageUrl(link.path)}
                  className={({ isActive }) =>
                    `text-sm tracking-wider uppercase transition-colors duration-300 ${
                      isActive
                        ? 'underline underline-offset-8 decoration-[#d4a89a] text-white'
                        : 'text-white hover:text-[#d4a89a]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <Link to={createPageUrl('Wishlist')}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#d4a89a] hover:bg-transparent relative"
                >
                  <Heart className="w-5 h-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#d4a89a] text-white text-xs border-none">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to={createPageUrl('Cart')}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#d4a89a] hover:bg-transparent relative"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#d4a89a] text-white text-xs border-none">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:text-amber-400 hover:bg-transparent"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-[60] bg-[#1a1a1a]"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center">
                <img src={logo} alt="Gem Mine" className="h-20 w-auto" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex flex-col items-center justify-center flex-1 space-y-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{delay: index * 0.1}}
                  >
                    <NavLink
                      to={createPageUrl(link.path)}
                      className={({isActive}) =>
                        `text-2xl transition-colors ${
                          isActive ? 'text-white font-bold' : 'text-white hover:text-[#d4a89a]'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

