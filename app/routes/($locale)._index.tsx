import {useLoaderData, type MetaFunction, type LoaderFunctionArgs} from 'react-router';
import {MockShopNotice} from '~/components/MockShopNotice';
import HeroSection from '~/components/HeroSection';
import CollectionsSection from '~/components/CollectionsSection';
import MarqueeSection from '~/components/MarqueeSection';
import FeaturedSection from '~/components/FeaturedSection';
import FeaturesSection from '~/components/FeaturesSection';
import HeritageSection from '~/components/HeritageSection';
import NewsletterSection from '~/components/NewsletterSection';

export const meta: MetaFunction = () => {
  return [{title: 'Gem Mine | Timeless Elegance'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  return {};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home bg-white">
      {data.isShopLinked ? null : <MockShopNotice />}
      <HeroSection />
      <CollectionsSection />
      <MarqueeSection />
      <FeaturedSection />
      <FeaturesSection />
      <HeritageSection />
      <NewsletterSection />
    </div>
  );
}
