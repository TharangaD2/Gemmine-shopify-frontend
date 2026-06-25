import React, { useState, useMemo } from 'react';
import {
  useLoaderData,
  Link,
  useLocation,
  useNavigate,
  type MetaFunction,
  type LoaderFunctionArgs,
} from 'react-router';
import {
  getPaginationVariables,
  Image,
  Money,
  Analytics,
} from '@shopify/hydrogen';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Eye,
  Grid,
  List,
  SlidersHorizontal,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
// import type {Route} from './+types/collections.$handle';
import type { ProductItemFragment } from 'storefrontapi.generated';
import { PaginatedResourceSection } from '~/components/PaginatedResourceSection';
import { toast } from 'sonner';
import { CartAuthFlow, type UserSession, type InquiryData } from '~/components/CartAuthFlow';






export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Gem Mine | ${data?.collection?.title ?? ''} Collection` }];
};

export async function loader({ context, params, request }: LoaderFunctionArgs) {
  const { storefront } = context;
  const { handle } = params;

  console.log('Requested handle:', handle);

  const result = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle: handle || '',
      ...getPaginationVariables(request, { pageBy: 24 }),
    },
  });

  console.log(JSON.stringify(result, null, 2));

  const { collection, page } = result;

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }

  return { collection, page };
}

export default function Collection() {
  const { collection, page } = useLoaderData<typeof loader>();

  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItemFragment | null>(null);

  const heroVedioUrl =
    (collection?.heroVedio?.reference as any)?.sources?.[0]?.url ||
    (collection?.heroVedio?.reference as any)?.url ||
    (page?.heroVedio?.reference as any)?.sources?.[0]?.url ||
    (page?.heroVedio?.reference as any)?.url;

  const categories = [
    { id: 'all', name: 'All Jewellery', path: '/collections/all' },
    { id: 'rings', name: 'Rings', path: '/collections/rings' },
    { id: 'necklaces', name: 'Necklaces', path: '/collections/necklaces' },
    { id: 'earrings', name: 'Earrings', path: '/collections/earring' },
    { id: 'bracelets', name: 'Bracelets', path: '/collections/bracelets' },
    { id: 'bridal', name: 'Bridal', path: '/collections/bridal' },
    { id: 'gem-stones', name: 'Gem Stones', path: '/collections/gem-stones' },
  ];

  const activeCategoryId = useMemo(() => {
    const active = categories.find((cat) => location.pathname.includes(cat.path));
    return active ? active.id : 'all';
  }, [location.pathname]);



  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[75vh] bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
        <video
          key={heroVedioUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={heroVedioUrl} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4">
              {collection.title}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto px-6 font-light tracking-wide">
              {collection.description ||
                'Discover exquisite pieces crafted with passion and precision'}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-6 py-12">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.path}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeCategoryId === cat.id
                ? 'bg-[#1e2a47] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                }`}
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="block"
              >
                {cat.name}
              </motion.span>
            </Link>
          ))}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            <span className="text-gray-400 text-sm font-light">
              Showing {collection.products.nodes.length} products
            </span>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-full px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e2a47]/20 appearance-none cursor-pointer pr-10 relative"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem',
              }}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>

            <div className="hidden md:flex items-center gap-1 bg-gray-50 rounded-full p-1 border border-gray-100">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-full transition-all ${viewMode === 'grid'
                  ? 'bg-white text-[#1e2a47] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-full transition-all ${viewMode === 'list'
                  ? 'bg-white text-[#1e2a47] shadow-sm'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <PaginatedResourceSection<ProductItemFragment>
          connection={collection.products}
          resourcesClassName={
            viewMode === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8'
              : 'flex flex-col gap-6'
          }
        >
          {({ node: product, index }) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
              index={index}
              onQuickView={() => setSelectedProduct(product)}
            />
          )}
        </PaginatedResourceSection>
      </div>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <QuickView
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>

      {/* Filter Sidebar */}
      <AnimatePresence>
        {isFilterOpen && (
          <FilterSidebar onClose={() => setIsFilterOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Shared auth helpers (mirrors Header.tsx logic) ───────────────────────────
const SESSION_STORE = 'gemmine_session';
type StoredSession = { type: 'guest' | 'customer'; name: string; email: string };
function readSession(): StoredSession | null {
  if (typeof window === 'undefined') return null;
  try { const r = sessionStorage.getItem(SESSION_STORE); return r ? JSON.parse(r) as StoredSession : null; } catch { return null; }
}

function addProductToCart(
  product: ProductItemFragment,
  session: StoredSession,
  firstVariant: { price?: { amount?: string } } | undefined,
) {
  const userEmail = session.email || 'guest';
  const stored = localStorage.getItem(`cart_${userEmail}`);
  const cartItems = stored ? (JSON.parse(stored) as any[]) : [];
  const productId = product.id.split('/').pop() || '1';
  const existingIndex = cartItems.findIndex((item: any) => item.product_id === productId);
  if (existingIndex > -1) {
    cartItems[existingIndex].quantity += 1;
  } else {
    cartItems.push({
      id: `c_${Date.now()}`,
      product_id: productId,
      quantity: 1,
      user_email: userEmail,
      user_name: session.name,
      user_type: session.type,
      product_name: product.title,
      product_price: parseFloat(firstVariant?.price?.amount || product.priceRange?.minVariantPrice?.amount || '0'),
      product_image: product.featuredImage?.url,
      product_category: 'Gem Mine Exclusive',
    });
  }
  localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
  window.dispatchEvent(new Event('cartUpdated'));
}

// Reusing helper components from all.tsx for consistency
function ProductCard({
  product,
  viewMode,
  index,
  onQuickView,
}: {
  product: ProductItemFragment;
  viewMode: 'grid' | 'list';
  index: number;
  onQuickView: () => void;
}) {
  const firstVariant = product.variants?.nodes?.[0];
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAuthOpen(true);
  };

  const handleAuthConfirm = (session: UserSession, inquiry: InquiryData) => {
    // Save inquiry
    try {
      const key = `inquiries_${session.email || 'guest'}`;
      const arr = (() => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) as any[] : []; } catch { return []; } })();
      arr.push({ ...inquiry, productId: product.id, productName: product.title, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
    addProductToCart(product, session as StoredSession, firstVariant);
    toast.success('Added to cart! 🛒', { description: `Inquiry submitted by ${session.name}` });
    setAuthOpen(false);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const session = readSession();
    const userEmail = session?.email || 'guest';
    const stored = localStorage.getItem(`wishlist_${userEmail}`);
    const wishlistItems = stored ? (JSON.parse(stored) as any[]) : [];
    const productId = product.id.split('/').pop() || '1';
    if (wishlistItems.some((item: any) => item.product_id === productId)) {
      toast.error('Item already in wishlist'); return;
    }
    wishlistItems.push({
      id: `w_${Date.now()}`, product_id: productId, user_email: userEmail,
      product_name: product.title,
      product_price: parseFloat(product.priceRange?.minVariantPrice?.amount || '0'),
      product_image: product.featuredImage?.url, product_category: 'Gem Mine Exclusive',
    });
    localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(wishlistItems));
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast.success('Added to wishlist');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
        className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}
      >
        <div className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-72 flex-shrink-0' : 'aspect-[4/5]'}`}>
          <Link to={`/products/${product.handle}`} className="block h-full w-full">
            {product.featuredImage && (
              <Image
                data={product.featuredImage}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(min-width: 45em) 400px, 100vw"
              />
            )}
          </Link>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center pointer-events-none">
            <button
              onClick={(e) => { e.preventDefault(); onQuickView(); }}
              className="bg-white/90 backdrop-blur-md text-[#1e2a47] px-6 py-2.5 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg flex items-center gap-2 pointer-events-auto"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
          <button
            onClick={handleAddToWishlist}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-300 shadow-sm z-10"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="mb-auto">
            <p className="text-[#d4a89a] text-xs uppercase tracking-widest mb-2 font-medium">Gem Mine Exclusive</p>
            <Link to={`/products/${product.handle}`}>
              <h3 className="text-lg font-serif text-[#1e2a47] mb-2 group-hover:text-[#d4a89a] transition-colors line-clamp-2">{product.title}</h3>
            </Link>
            <div className="text-xl font-light text-[#1e2a47]/80 mb-4">
              <Money data={product.priceRange.minVariantPrice} />
            </div>
          </div>

          <div ref={triggerRef} style={{ position: 'relative' }}>
            {firstVariant ? (
              <button
                onClick={handleAddToCartClick}
                className="w-full bg-[#1e2a47] text-white py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#2d3e6a] transition-all duration-300 font-medium"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
            ) : (
              <button disabled className="w-full bg-gray-100 text-gray-400 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-not-allowed font-medium">
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Auth + Inquiry Flow */}
      <CartAuthFlow
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onConfirm={handleAuthConfirm}
        triggerRef={triggerRef}
      />
    </>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (dir: number) => ({
    zIndex: 0,
    x: dir < 0 ? '100%' : dir > 0 ? '-100%' : 0,
    opacity: 0
  })
};

function QuickView({ product, onClose }: { product: ProductItemFragment; onClose: () => void }) {
  const firstVariant = product.variants?.nodes?.[0];
  const quickViewTriggerRef = React.useRef<HTMLDivElement>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  // Unified media items: images + videos in display order
  const mediaItems = useMemo(() => {
    const nodes = product.media?.nodes || [];
    const items: Array<{ type: 'image'; data: any } | { type: 'video'; sources: { url: string; mimeType: string }[]; preview?: { url: string; altText?: string | null } } | { type: 'external'; embeddedUrl: string; preview?: { url: string; altText?: string | null } }> = [];
    for (const node of nodes as any[]) {
      if (node.image) {
        items.push({ type: 'image', data: node.image });
      } else if (node.sources && node.sources.length > 0) {
        items.push({ type: 'video', sources: node.sources, preview: node.previewImage });
      } else if (node.embeddedUrl) {
        items.push({ type: 'external', embeddedUrl: node.embeddedUrl, preview: node.previewImage });
      }
    }
    if (items.length === 0 && product.featuredImage) {
      items.push({ type: 'image', data: product.featuredImage });
    }
    return items;
  }, [product.media, product.featuredImage]);

  const hasMultiple = mediaItems.length > 1;

  const handlePrev = () => {
    if (!hasMultiple) return;
    setDirection(-1);
    setCurrentImage((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const handleNext = () => {
    if (!hasMultiple) return;
    setDirection(1);
    setCurrentImage((prev) => (prev + 1) % mediaItems.length);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAuthOpen(true);
  };

  const handleAuthConfirm = (session: UserSession, inquiry: InquiryData) => {
    try {
      const key = `inquiries_${session.email || 'guest'}`;
      const arr = (() => { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) as any[] : []; } catch { return []; } })();
      arr.push({ ...inquiry, productId: product.id, productName: product.title, timestamp: new Date().toISOString() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch {}
    addProductToCart(product, session as StoredSession, firstVariant);
    toast.success('Added to cart! 🛒', { description: `Inquiry submitted by ${session.name}` });
    setAuthOpen(false);
    onClose();
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const session = readSession();
    const userEmail = session?.email || 'guest';
    const stored = localStorage.getItem(`wishlist_${userEmail}`);
    const wishlistItems = stored ? (JSON.parse(stored) as any[]) : [];
    const productId = product.id.split('/').pop() || '1';
    if (wishlistItems.some((item: any) => item.product_id === productId)) {
      toast.error('Item already in wishlist'); return;
    }
    wishlistItems.push({
      id: `w_${Date.now()}`, product_id: productId, user_email: userEmail,
      product_name: product.title,
      product_price: parseFloat(product.priceRange?.minVariantPrice?.amount || '0'),
      product_image: product.featuredImage?.url, product_category: 'Gem Mine Exclusive',
    });
    localStorage.setItem(`wishlist_${userEmail}`, JSON.stringify(wishlistItems));
    window.dispatchEvent(new Event('wishlistUpdated'));
    toast.success('Added to wishlist');
  };

  return (
    <>
      {authOpen && (
        <CartAuthFlow
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          onConfirm={handleAuthConfirm}
          triggerRef={quickViewTriggerRef}
        />
      )}
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1e2a47] hover:bg-white transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="md:w-1/2 relative bg-gray-50 flex flex-col justify-between overflow-hidden">
            {/* Main Viewport */}
            <div className="relative flex-grow flex-shrink min-h-0 w-full aspect-[4/5] overflow-hidden">
              {mediaItems.length > 0 ? (
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentImage}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag={mediaItems[currentImage]?.type !== 'video' && hasMultiple ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.5}
                    onDragEnd={(_e, info) => {
                      const swipeThreshold = 50;
                      if (info.offset.x < -swipeThreshold) handleNext();
                      else if (info.offset.x > swipeThreshold) handlePrev();
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-black"
                  >
                    {(() => {
                      const item = mediaItems[currentImage];
                      if (!item) return null;
                      if (item.type === 'image') {
                        return (
                          <Link to={`/products/${product.handle}`} className="block w-full h-full select-none cursor-grab active:cursor-grabbing">
                            <Image
                              data={item.data}
                              className="w-full h-full object-cover select-none pointer-events-none"
                            />
                          </Link>
                        );
                      }
                      if (item.type === 'video') {
                        const mp4 = item.sources.find((s) => s.mimeType === 'video/mp4') || item.sources[0];
                        return (
                          <video
                            key={mp4?.url}
                            src={mp4?.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="w-full h-full object-contain"
                            poster={item.preview?.url}
                          />
                        );
                      }
                      if (item.type === 'external') {
                        return (
                          <iframe
                            src={item.embeddedUrl}
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            className="w-full h-full border-0"
                            title="Product video"
                          />
                        );
                      }
                      return null;
                    })()}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Media Available
                </div>
              )}

              {/* Navigation Controls */}
              {hasMultiple && (
                <>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1e2a47] hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#1e2a47] hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium tracking-wider select-none">
                    {currentImage + 1} / {mediaItems.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasMultiple && (
              <div className="p-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto justify-center">
                {mediaItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > currentImage ? 1 : -1); setCurrentImage(idx); }}
                    className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      idx === currentImage ? 'border-[#1e2a47] scale-105 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    {item.type === 'image' ? (
                      <Image data={item.data} className="w-full h-full object-cover pointer-events-none" />
                    ) : (
                      <>
                        {(item.type === 'video' || item.type === 'external') && item.preview?.url ? (
                          <img src={item.preview.url} alt={item.preview.altText || 'Video'} className="w-full h-full object-cover pointer-events-none" />
                        ) : (
                          <div className="w-full h-full bg-gray-800" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <p className="text-[#d4a89a] text-sm uppercase tracking-[0.2em] mb-4 font-medium">
              New Arrival
            </p>
            <Link to={`/products/${product.handle}`}>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1e2a47] mb-6 hover:text-[#d4a89a] transition-colors">
                {product.title}
              </h2>
            </Link>
            <div className="text-2xl text-[#1e2a47]/90 mb-8 font-light">
              <Money data={product.priceRange.minVariantPrice} />
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-gray-500 leading-relaxed font-light">
                This exquisite piece from Gem Mine embodies the perfect harmony of
                traditional craftsmanship and contemporary design. Hand-selected
                for its brilliance and clarity.
              </p>
            </div>

            <div className="flex gap-4" ref={quickViewTriggerRef}>
              {firstVariant ? (
                <button
                  onClick={handleAddToCartClick}
                  className="flex-1 bg-[#1e2a47] text-white py-4 rounded-2xl font-medium hover:bg-[#2d3e6a] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1e2a47]/10"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Bag
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-gray-100 text-gray-400 py-4 rounded-2xl font-medium cursor-not-allowed flex items-center justify-center gap-2"
                >
                Out of Stock
              </button>
              )}
              <button
                onClick={handleAddToWishlist}
                className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all"
              >
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function FilterSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="absolute top-0 left-0 bottom-0 w-full max-w-sm bg-white shadow-2xl p-8"
      >
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif text-[#1e2a47]">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-10">
          <div>
            <h4 className="font-medium text-[#1e2a47] mb-6 uppercase tracking-wider text-sm">
              Price Range
            </h4>
            <div className="space-y-4">
              <div className="h-1.5 bg-gray-100 rounded-full relative">
                <div className="absolute left-0 right-1/4 top-0 bottom-0 bg-[#d4a89a] rounded-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#d4a89a] rounded-full shadow-sm cursor-pointer" />
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#d4a89a] rounded-full shadow-sm cursor-pointer" />
              </div>
              <div className="flex justify-between text-sm text-gray-500 font-light">
                <span>$0</span>
                <span>$35,000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8">
          <button
            onClick={onClose}
            className="w-full bg-[#1e2a47] text-white py-4 rounded-2xl font-medium shadow-lg shadow-[#1e2a47]/10"
          >
            Apply Filters
          </button>
        </div>
      </motion.div>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  fragment MoneyProductItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment ProductItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyProductItem
      }
      maxVariantPrice {
        ...MoneyProductItem
      }
    }
    variants(first: 1) {
      nodes {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
      }
    }
    media(first: 20) {
      nodes {
        mediaContentType
        ... on MediaImage {
          id
          image {
            id
            url
            altText
            width
            height
          }
        }
        ... on Video {
          id
          previewImage {
            url
            altText
          }
          sources {
            url
            mimeType
          }
        }
        ... on ExternalVideo {
          id
          embeddedUrl
          previewImage {
            url
            altText
          }
        }
      }
    }
  }
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {
        reference {
          ... on Video {
            sources {
              url
            }
          }
          ... on GenericFile {
            url
          }
        }
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ProductItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
    page(handle: $handle) {
      id
      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {
        reference {
          ... on Video {
            sources {
              url
            }
          }
          ... on GenericFile {
            url
          }
        }
      }
    }
  }
` as const;
