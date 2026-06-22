import { useLoaderData, type MetaFunction, type LoaderFunctionArgs } from 'react-router';
import { MockShopNotice } from '~/components/MockShopNotice';
import HeroSection from '~/components/HeroSection';
import CollectionsSection from '~/components/CollectionsSection';
import MarqueeSection from '~/components/MarqueeSection';
import FeaturedSection from '~/components/FeaturedSection';
import FeaturesSection from '~/components/FeaturesSection';
import HeritageSection from '~/components/HeritageSection';
import NewsletterSection from '~/components/NewsletterSection';

export const meta: MetaFunction = () => {
  return [{ title: 'Gem Mine | Timeless Elegance' }];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({ context }: LoaderFunctionArgs) {
  const [{ page }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: {
        handle: 'home-page',
      },
    }),
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    page,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({ context }: LoaderFunctionArgs) {
  return {};
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      homeHeroTitle1: metafield(namespace: "custom", key: "home_hero_title1") {
        value
      }
      homeHeroTitle2: metafield(namespace: "custom", key: "home_hero_title2") {
        value
      }
      homeHeroTag: metafield(namespace: "custom", key: "home_hero_tag") {
        value
      }
      homeHeroPara: metafield(namespace: "custom", key: "home_hero_para") {
        value
      }
      homeHeroVedio: metafield(namespace: "custom", key: "home_hero_vedio") {
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
      homeSec2Title: metafield(namespace: "custom", key: "home_sec_title") {
        value
      }
      homeSec2Tag: metafield(namespace: "custom", key: "home_sec2_tag") {
        value
      }
      homeSec2CardTitle1: metafield(namespace: "custom", key: "home_sec2_card_title1") {
        value
      }
      homeSec2CardTitle2: metafield(namespace: "custom", key: "home_sec2_card_title2") {
        value
      }
      homeSec2CardTitle3: metafield(namespace: "custom", key: "home_sec2_card_title3") {
        value
      }
      homeSec2CardTitle4: metafield(namespace: "custom", key: "home_sec2_card_title4") {
        value
      }
      homeSec2CardTitle5: metafield(namespace: "custom", key: "home_sec2_card_title5") {
        value
      }
      homeSec2CardImage1: metafield(namespace: "custom", key: "home_sec2_card_image1") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      homeSec2CardImage2: metafield(namespace: "custom", key: "home_sec2_card_image2") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      homeSec2CardImage3: metafield(namespace: "custom", key: "home_sec2_card_image3") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      homeSec2CardImage4: metafield(namespace: "custom", key: "home_sec2_card_image4") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      homeSec2CardImage5: metafield(namespace: "custom", key: "home_sec2_card_image5") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      homeSec2CardPara1: metafield(namespace: "custom", key: "home_sec2_card_para1") {
        value
      }
      homeSec2CardPara2: metafield(namespace: "custom", key: "home_sec2_card_para2") {
        value
      }
      homeSec2CardPara3: metafield(namespace: "custom", key: "home_sec2_card_para3") {
        value
      }
      homeSec2CardPara4: metafield(namespace: "custom", key: "home_sec2_card_para4") {
        value
      }
      homeSec2CardPara5: metafield(namespace: "custom", key: "home_sec2_card_para5") {
        value
      }
      featureSecTitle: metafield(namespace: "custom", key: "feature_sec_title") {
        value
      }
      featureSecTitle1: metafield(namespace: "custom", key: "feature_sec_title1") {
        value
      }
      featureSecTitle2: metafield(namespace: "custom", key: "feature_sec_title2") {
        value
      }
      featureSecTitle3: metafield(namespace: "custom", key: "feature_sec_title3") {
        value
      }
      featureSecTitle4: metafield(namespace: "custom", key: "feature_sec_title4") {
        value
      }
      featureSecTitle5: metafield(namespace: "custom", key: "feature_sec_title5") {
        value
      }
      featureSecTitle6: metafield(namespace: "custom", key: "feature_sec_title6") {
        value
      }
      featureCardPara1: metafield(namespace: "custom", key: "feature_card_para1") {
        value
      }
      featureCardPara2: metafield(namespace: "custom", key: "feature_card_para2") {
        value
      }
      featureCardPara3: metafield(namespace: "custom", key: "feature_card_para3") {
        value
      }
      featureCardPara4: metafield(namespace: "custom", key: "feature_card_para4") {
        value
      }
      featureCardPara5: metafield(namespace: "custom", key: "feature_card_para5") {
        value
      }
      featureCardPara6: metafield(namespace: "custom", key: "feature_card_para6") {
        value
      }
      featureCardImg1: metafield(namespace: "custom", key: "feature_card_img1") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      featureCardImg2: metafield(namespace: "custom", key: "feature_card_img2") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      featureCardImg3: metafield(namespace: "custom", key: "feature_card_img3") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      featureCardImg4: metafield(namespace: "custom", key: "feature_card_img4") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      featureCardImg5: metafield(namespace: "custom", key: "feature_card_img5") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      featureCardImg6: metafield(namespace: "custom", key: "feature_card_img6") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      heritageTag: metafield(namespace: "custom", key: "heritage_tag") {
        value
      }
      heritageTitle: metafield(namespace: "custom", key: "heritage_title") {
        value
      }
      heritagePara: metafield(namespace: "custom", key: "heritage_para") {
        value
      }
      heritageImg: metafield(namespace: "custom", key: "heritage_img") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
      heritageVideo: metafield(namespace: "custom", key: "heritage_vedio") {
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

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home bg-white">
      {data.isShopLinked ? null : <MockShopNotice />}
      <HeroSection page={data.page} />
      <CollectionsSection page={data.page} />
      <MarqueeSection />
      <FeaturedSection page={data.page} />
      <FeaturesSection />
      <HeritageSection page={data.page} />
      <NewsletterSection />
    </div>
  );
}
