export function createPageUrl(page: string) {
  const handle = page.toLowerCase();
  if (handle === 'collections') return '/collections/all';
  if (handle === 'blog') return '/blogs';
  if (handle === 'wishlist') return '/pages/wishlist';
  if (handle === 'cart') return '/cart';
  if (handle === 'checkout') return '/pages/checkout';
  if (handle === 'productdetail') return '/products';
  return `/pages/${handle}`;
}
