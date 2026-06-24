import React, {useState, useRef} from 'react';
import {Link, useNavigate} from 'react-router';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {type FetcherWithComponents} from 'react-router';
import {useAside} from './Aside';
import type {ProductFragment} from 'storefrontapi.generated';
import {toast} from 'sonner';
import {CartAuthFlow, getStoredSession, type UserSession, type InquiryData} from './CartAuthFlow';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const navigate = useNavigate();
  const {open} = useAside();
  const addToCartBtnRef = useRef<HTMLDivElement>(null);

  const [authFlowOpen, setAuthFlowOpen] = useState(false);
  // Pending cart lines to add after auth + inquiry
  const [pendingLines, setPendingLines] = useState<Array<OptimisticCartLineInput>>([]);

  // Called when the user clicks the Add to Cart button
  const handleCartButtonClick = () => {
    if (!selectedVariant) return;

    // Check if user is already authenticated (customer session)
    const existingSession = getStoredSession();

    if (existingSession) {
      // Already logged in — skip straight to inquiry
      setAuthFlowOpen(true);
    } else {
      // Need to authenticate first
      setAuthFlowOpen(true);
    }

    setPendingLines([
      {
        merchandiseId: selectedVariant.id,
        quantity: 1,
        selectedVariant,
      },
    ]);
  };

  const handleAuthConfirm = (session: UserSession, inquiry: InquiryData) => {
    if (!selectedVariant) return;

    // Save inquiry to localStorage keyed by session email or "guest"
    const storageKey = session.email || 'guest';
    const inquiries = (() => {
      try {
        const raw = localStorage.getItem(`inquiries_${storageKey}`);
        return raw ? (JSON.parse(raw) as any[]) : [];
      } catch {
        return [];
      }
    })();

    inquiries.push({
      ...inquiry,
      productId: selectedVariant.id,
      productName: (selectedVariant as any).product?.title || 'Selected Product',
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(`inquiries_${storageKey}`, JSON.stringify(inquiries));

    // Add item to local cart
    const userEmail = session.email || 'guest';
    const stored = localStorage.getItem(`cart_${userEmail}`);
    const cartItems = stored ? (JSON.parse(stored) as any[]) : [];

    const productId = selectedVariant.id.split('/').pop() || '1';
    const existingIndex = cartItems.findIndex(
      (item: any) => item.product_id === productId,
    );

    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += 1;
    } else {
      const newItem = {
        id: `c_${Date.now()}`,
        product_id: productId,
        quantity: 1,
        user_email: userEmail,
        user_name: session.name,
        user_type: session.type,
        product_name:
          (selectedVariant as any).product?.title || 'Selected Product',
        product_price: parseFloat(
          (selectedVariant as any).price?.amount || '0',
        ),
        product_image: (selectedVariant as any).image?.url,
        product_category: 'Gem Mine Exclusive',
        inquiry,
      };
      cartItems.push(newItem);
    }

    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));

    toast.success('Item added to cart! 🛒', {
      description: `Inquiry submitted by ${session.name}`,
    });

    // Open cart aside
    open('cart');
    setAuthFlowOpen(false);
  };

  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options" key={option.name}>
            <h5>{option.name}</h5>
            <div className="product-options-grid">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  return (
                    <Link
                      className="product-options-item"
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </Link>
                  );
                } else {
                  return (
                    <button
                      type="button"
                      className={`product-options-item${
                        exists && !selected ? ' link' : ''
                      }`}
                      key={option.name + name}
                      style={{
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
                        opacity: available ? 1 : 0.3,
                      }}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                    </button>
                  );
                }
              })}
            </div>
            <br />
          </div>
        );
      })}

      {/* Add to Cart Button — wraps CartForm but intercepts the click */}
      <div ref={addToCartBtnRef} style={{position: 'relative', display: 'inline-block', width: '100%'}}>
        <CartForm
          route="/cart"
          inputs={{lines: pendingLines.length ? pendingLines : (selectedVariant ? [{merchandiseId: selectedVariant.id, quantity: 1, selectedVariant}] : [])}}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher: FetcherWithComponents<any>) => (
            <>
              <input name="analytics" type="hidden" value={JSON.stringify({})} />
              <button
                type="button"
                disabled={!selectedVariant || !selectedVariant.availableForSale}
                onClick={handleCartButtonClick}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: !selectedVariant || !selectedVariant.availableForSale
                    ? 'rgba(100,100,100,0.4)'
                    : 'linear-gradient(135deg, #d4a89a, #c17f72)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  cursor: !selectedVariant || !selectedVariant.availableForSale ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s, transform 0.1s',
                }}
                onMouseEnter={(e) => {
                  if (selectedVariant?.availableForSale) {
                    (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.opacity = '1';
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
                }}
              >
                {selectedVariant?.availableForSale ? '🛒 Add to Cart' : 'Sold Out'}
              </button>
            </>
          )}
        </CartForm>
      </div>

      {/* Auth & Inquiry Flow */}
      <CartAuthFlow
        isOpen={authFlowOpen}
        onClose={() => setAuthFlowOpen(false)}
        onConfirm={handleAuthConfirm}
        triggerRef={addToCartBtnRef}
      />
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
}) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return name;

  return (
    <div
      aria-label={name}
      className="product-option-label-swatch"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} />}
    </div>
  );
}
