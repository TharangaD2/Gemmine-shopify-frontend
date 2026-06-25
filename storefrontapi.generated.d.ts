/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

export type MoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'currencyCode' | 'amount'
>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  parentRelationship?: StorefrontAPI.Maybe<{
    parent: Pick<StorefrontAPI.CartLine, 'id'>;
  }>;
};

export type CartLineComponentFragment = Pick<
  StorefrontAPI.ComponentizableCartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id' | 'vendor'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
  lineComponents: Array<
    Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
      attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
      cost: {
        totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        amountPerQuantity: Pick<
          StorefrontAPI.MoneyV2,
          'currencyCode' | 'amount'
        >;
        compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
      };
      merchandise: Pick<
        StorefrontAPI.ProductVariant,
        'id' | 'availableForSale' | 'requiresShipping' | 'title'
      > & {
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        product: Pick<
          StorefrontAPI.Product,
          'handle' | 'title' | 'id' | 'vendor'
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
      };
      parentRelationship?: StorefrontAPI.Maybe<{
        parent: Pick<StorefrontAPI.CartLine, 'id'>;
      }>;
    }
  >;
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'updatedAt' | 'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  appliedGiftCards: Array<
    Pick<StorefrontAPI.AppliedGiftCard, 'id' | 'lastCharacters'> & {
      amountUsed: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    }
  >;
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      | (Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          parentRelationship?: StorefrontAPI.Maybe<{
            parent: Pick<StorefrontAPI.CartLine, 'id'>;
          }>;
        })
      | (Pick<StorefrontAPI.ComponentizableCartLine, 'id' | 'quantity'> & {
          attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
          cost: {
            totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            amountPerQuantity: Pick<
              StorefrontAPI.MoneyV2,
              'currencyCode' | 'amount'
            >;
            compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
          };
          merchandise: Pick<
            StorefrontAPI.ProductVariant,
            'id' | 'availableForSale' | 'requiresShipping' | 'title'
          > & {
            compareAtPrice?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'url' | 'altText' | 'width' | 'height'
              >
            >;
            product: Pick<
              StorefrontAPI.Product,
              'handle' | 'title' | 'id' | 'vendor'
            >;
            selectedOptions: Array<
              Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
            >;
          };
          lineComponents: Array<
            Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
              attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
              cost: {
                totalAmount: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                amountPerQuantity: Pick<
                  StorefrontAPI.MoneyV2,
                  'currencyCode' | 'amount'
                >;
                compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
              };
              merchandise: Pick<
                StorefrontAPI.ProductVariant,
                'id' | 'availableForSale' | 'requiresShipping' | 'title'
              > & {
                compareAtPrice?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
                product: Pick<
                  StorefrontAPI.Product,
                  'handle' | 'title' | 'id' | 'vendor'
                >;
                selectedOptions: Array<
                  Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                >;
              };
              parentRelationship?: StorefrontAPI.Maybe<{
                parent: Pick<StorefrontAPI.CartLine, 'id'>;
              }>;
            }
          >;
        })
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'currencyCode' | 'amount'>
    >;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type HeaderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type HeaderQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type FooterQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type FooterQuery = {
  menu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type HomePageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type HomePageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      homeHeroTitle1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeHeroTitle2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeHeroTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      homeHeroPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeHeroImages?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<{
            image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
          }>;
        }>;
      }>;
      homeHeroVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
      homeSec2Title?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2Tag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      homeSec2CardTitle1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardTitle2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardTitle3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardTitle4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardTitle5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardImage1?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      homeSec2CardImage2?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      homeSec2CardImage3?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      homeSec2CardImage4?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      homeSec2CardImage5?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      homeSec2CardPara1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardPara2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardPara3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardPara4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      homeSec2CardPara5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureSecTitle6?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardPara1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardPara2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardPara3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardPara4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardPara5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardPara6?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      featureCardImg1?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      featureCardImg2?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      featureCardImg3?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      featureCardImg4?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      featureCardImg5?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      featureCardImg6?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      heritageTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heritageTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      heritagePara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      heritageImg?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      heritageVideo?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
    }
  >;
};

export type ArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticleQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'handle'> & {
      articleByHandle?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.Article,
          'handle' | 'title' | 'contentHtml' | 'publishedAt'
        > & {
          author?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ArticleAuthor, 'name'>
          >;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'altText' | 'url' | 'width' | 'height'
            >
          >;
          seo?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Seo, 'description' | 'title'>
          >;
        }
      >;
    }
  >;
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title' | 'handle'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            author?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ArticleAuthor, 'name'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            blog: Pick<StorefrontAPI.Blog, 'handle'>;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
> & {
  author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  blog: Pick<StorefrontAPI.Blog, 'handle'>;
};

export type MoneyProductItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type ProductItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  variants: {
    nodes: Array<
      Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };
  media: {
    nodes: Array<
      | (Pick<
          StorefrontAPI.ExternalVideo,
          'id' | 'embeddedUrl' | 'mediaContentType'
        > & {
          previewImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText'>
          >;
        })
      | (Pick<StorefrontAPI.MediaImage, 'id' | 'mediaContentType'> & {
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
        })
      | Pick<StorefrontAPI.Model3d, 'mediaContentType'>
      | (Pick<StorefrontAPI.Video, 'id' | 'mediaContentType'> & {
          previewImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText'>
          >;
          sources: Array<Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>>;
        })
    >;
  };
};

export type CollectionQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      heroVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
      products: {
        nodes: Array<
          Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
            featuredImage?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            priceRange: {
              minVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              maxVariantPrice: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
            };
            variants: {
              nodes: Array<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'availableForSale'
                > & {
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                }
              >;
            };
            media: {
              nodes: Array<
                | (Pick<
                    StorefrontAPI.ExternalVideo,
                    'id' | 'embeddedUrl' | 'mediaContentType'
                  > & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                  })
                | (Pick<StorefrontAPI.MediaImage, 'id' | 'mediaContentType'> & {
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'id' | 'url' | 'altText' | 'width' | 'height'
                      >
                    >;
                  })
                | Pick<StorefrontAPI.Model3d, 'mediaContentType'>
                | (Pick<StorefrontAPI.Video, 'id' | 'mediaContentType'> & {
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url' | 'altText'>
                    >;
                    sources: Array<
                      Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                    >;
                  })
              >;
            };
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
        >;
      };
    }
  >;
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id'> & {
      heroVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
    }
  >;
};

export type CollectionFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type CollectionPageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type CollectionPageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      heroTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroPara?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
    }
  >;
};

export type CollectionsQueryVariables = StorefrontAPI.Exact<{
  [key: string]: never;
}>;

export type CollectionsQuery = {
  collections: {
    nodes: Array<Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'>>;
  };
};

export type MoneyCollectionItemFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type CollectionItemFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'handle' | 'title'
> & {
  featuredImage?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  priceRange: {
    minVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    maxVariantPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  };
  variants: {
    nodes: Array<
      Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };
  media: {
    nodes: Array<
      | (Pick<
          StorefrontAPI.ExternalVideo,
          'id' | 'embeddedUrl' | 'mediaContentType'
        > & {
          previewImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText'>
          >;
        })
      | (Pick<StorefrontAPI.MediaImage, 'id' | 'mediaContentType'> & {
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
        })
      | Pick<StorefrontAPI.Model3d, 'mediaContentType'>
      | (Pick<StorefrontAPI.Video, 'id' | 'mediaContentType'> & {
          previewImage?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText'>
          >;
          sources: Array<Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>>;
        })
    >;
  };
};

export type CatalogQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CatalogQuery = {
  products: {
    nodes: Array<
      Pick<StorefrontAPI.Product, 'id' | 'handle' | 'title'> & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        priceRange: {
          minVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          maxVariantPrice: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
        };
        variants: {
          nodes: Array<
            Pick<StorefrontAPI.ProductVariant, 'id' | 'availableForSale'> & {
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        };
        media: {
          nodes: Array<
            | (Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embeddedUrl' | 'mediaContentType'
              > & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url' | 'altText'>
                >;
              })
            | (Pick<StorefrontAPI.MediaImage, 'id' | 'mediaContentType'> & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'id' | 'url' | 'altText' | 'width' | 'height'
                  >
                >;
              })
            | Pick<StorefrontAPI.Model3d, 'mediaContentType'>
            | (Pick<StorefrontAPI.Video, 'id' | 'mediaContentType'> & {
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url' | 'altText'>
                >;
                sources: Array<
                  Pick<StorefrontAPI.VideoSource, 'url' | 'mimeType'>
                >;
              })
          >;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PageDetailsQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageDetailsQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'handle' | 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type PageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      heroTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
      firstContentTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      firstContentPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      firstContentTag?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      firstContentVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
      firstContentImage?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      secondContentTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      secondContentPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      secondContentTag?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      secondContentPara2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      secondcontentTypes?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      secondContentImage?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
        }>;
      }>;
      thirdContentTag?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentFirstCardTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentSecondCardTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentThirdCardTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentFourthCardTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentFirstCardPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentSecondCardPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentThirdCardPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      thirdContentFourthCardPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fourthSectionTag?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fourthSectionTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTag1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTag2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTag3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTag4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTag5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTag6?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTitle1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTitle2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTitle3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTitle4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTitle5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardTitle6?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardPara1?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardPara2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardPara3?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardPara4?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardPara5?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardPara6?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      historyCardImg1?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      historyCardImg2?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      historyCardImg3?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      historyCardImg4?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      historyCardImg5?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      historyCardImg6?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      fifthSecTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      fifthSecTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fifthSecPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fifthSecCounty?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      fifthSecPara2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      aboutChooseUsTag?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      aboutChooseUsTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      aboutChooseUsPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      aboutChooseUsImg?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      witnessTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      witnessTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      witnessPara?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      witnessV1?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
      witnessV1Title?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      witnessV1Para?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      witnessV2?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
      witnessV2Title?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      witnessV2Para?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      soonSecTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      soonSecTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      soonSecPara?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      soonSecPara2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      soonSecImg?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>}
        >;
      }>;
      ourComTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      ourComTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      ourComPara?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      ourComImages?: StorefrontAPI.Maybe<{
        references?: StorefrontAPI.Maybe<{
          nodes: Array<{
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url' | 'altText'>
            >;
          }>;
        }>;
      }>;
    }
  >;
};

export type ContactPageQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type ContactPageQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      heroTitle?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroTag?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      heroPara?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Metafield, 'value'>>;
      firstContentTitle?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      firstContentPara?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      firstContentTag?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Metafield, 'value'>
      >;
      heroVedio?: StorefrontAPI.Maybe<{
        reference?: StorefrontAPI.Maybe<
          | Pick<StorefrontAPI.GenericFile, 'url'>
          | {sources: Array<Pick<StorefrontAPI.VideoSource, 'url'>>}
        >;
      }>;
    }
  >;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyItemFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type ProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'availableForSale' | 'id' | 'sku' | 'title'
> & {
  compareAtPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  image?: StorefrontAPI.Maybe<
    {__typename: 'Image'} & Pick<
      StorefrontAPI.Image,
      'id' | 'url' | 'altText' | 'width' | 'height'
    >
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
  selectedOptions: Array<Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>>;
  unitPrice?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
};

export type ProductFragment = Pick<
  StorefrontAPI.Product,
  | 'id'
  | 'title'
  | 'vendor'
  | 'handle'
  | 'descriptionHtml'
  | 'description'
  | 'encodedVariantExistence'
  | 'encodedVariantAvailability'
> & {
  options: Array<
    Pick<StorefrontAPI.ProductOption, 'name'> & {
      optionValues: Array<
        Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
          firstSelectableVariant?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.ProductVariant,
              'availableForSale' | 'id' | 'sku' | 'title'
            > & {
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              image?: StorefrontAPI.Maybe<
                {__typename: 'Image'} & Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
            }
          >;
          swatch?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
              image?: StorefrontAPI.Maybe<{
                previewImage?: StorefrontAPI.Maybe<
                  Pick<StorefrontAPI.Image, 'url'>
                >;
              }>;
            }
          >;
        }
      >;
    }
  >;
  selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
    }
  >;
  adjacentVariants: Array<
    Pick<
      StorefrontAPI.ProductVariant,
      'availableForSale' | 'id' | 'sku' | 'title'
    > & {
      compareAtPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      image?: StorefrontAPI.Maybe<
        {__typename: 'Image'} & Pick<
          StorefrontAPI.Image,
          'id' | 'url' | 'altText' | 'width' | 'height'
        >
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      selectedOptions: Array<
        Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
      >;
      unitPrice?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
    }
  >;
  seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
};

export type ProductQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  selectedOptions:
    | Array<StorefrontAPI.SelectedOptionInput>
    | StorefrontAPI.SelectedOptionInput;
}>;

export type ProductQuery = {
  product?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Product,
      | 'id'
      | 'title'
      | 'vendor'
      | 'handle'
      | 'descriptionHtml'
      | 'description'
      | 'encodedVariantExistence'
      | 'encodedVariantAvailability'
    > & {
      options: Array<
        Pick<StorefrontAPI.ProductOption, 'name'> & {
          optionValues: Array<
            Pick<StorefrontAPI.ProductOptionValue, 'name'> & {
              firstSelectableVariant?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'availableForSale' | 'id' | 'sku' | 'title'
                > & {
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    {__typename: 'Image'} & Pick<
                      StorefrontAPI.Image,
                      'id' | 'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                }
              >;
              swatch?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.ProductOptionValueSwatch, 'color'> & {
                  image?: StorefrontAPI.Maybe<{
                    previewImage?: StorefrontAPI.Maybe<
                      Pick<StorefrontAPI.Image, 'url'>
                    >;
                  }>;
                }
              >;
            }
          >;
        }
      >;
      selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
      adjacentVariants: Array<
        Pick<
          StorefrontAPI.ProductVariant,
          'availableForSale' | 'id' | 'sku' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
          image?: StorefrontAPI.Maybe<
            {__typename: 'Image'} & Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
          product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
          unitPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
          >;
        }
      >;
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
    }
  >;
};

export type SearchProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'handle' | 'id' | 'publishedAt' | 'title' | 'trackingParameters' | 'vendor'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
      }
    >;
  };

export type SearchPageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type SearchArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'handle' | 'id' | 'title' | 'trackingParameters'
>;

export type PageInfoFragmentFragment = Pick<
  StorefrontAPI.PageInfo,
  'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
>;

export type RegularSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  term: StorefrontAPI.Scalars['String']['input'];
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type RegularSearchQuery = {
  articles: {
    nodes: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  pages: {
    nodes: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'handle' | 'id' | 'title' | 'trackingParameters'
      >
    >;
  };
  products: {
    nodes: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        | 'handle'
        | 'id'
        | 'publishedAt'
        | 'title'
        | 'trackingParameters'
        | 'vendor'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              product: Pick<StorefrontAPI.Product, 'handle' | 'title'>;
            }
          >;
        }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PredictiveArticleFragment = {__typename: 'Article'} & Pick<
  StorefrontAPI.Article,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    blog: Pick<StorefrontAPI.Blog, 'handle'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictiveCollectionFragment = {__typename: 'Collection'} & Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
    >;
  };

export type PredictivePageFragment = {__typename: 'Page'} & Pick<
  StorefrontAPI.Page,
  'id' | 'title' | 'handle' | 'trackingParameters'
>;

export type PredictiveProductFragment = {__typename: 'Product'} & Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'handle' | 'trackingParameters'
> & {
    selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ProductVariant, 'id'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      }
    >;
  };

export type PredictiveQueryFragment = {
  __typename: 'SearchQuerySuggestion';
} & Pick<
  StorefrontAPI.SearchQuerySuggestion,
  'text' | 'styledText' | 'trackingParameters'
>;

export type PredictiveSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  limit: StorefrontAPI.Scalars['Int']['input'];
  limitScope: StorefrontAPI.PredictiveSearchLimitScope;
  term: StorefrontAPI.Scalars['String']['input'];
  types?: StorefrontAPI.InputMaybe<
    | Array<StorefrontAPI.PredictiveSearchType>
    | StorefrontAPI.PredictiveSearchType
  >;
}>;

export type PredictiveSearchQuery = {
  predictiveSearch?: StorefrontAPI.Maybe<{
    articles: Array<
      {__typename: 'Article'} & Pick<
        StorefrontAPI.Article,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          blog: Pick<StorefrontAPI.Blog, 'handle'>;
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    collections: Array<
      {__typename: 'Collection'} & Pick<
        StorefrontAPI.Collection,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'width' | 'height'>
          >;
        }
    >;
    pages: Array<
      {__typename: 'Page'} & Pick<
        StorefrontAPI.Page,
        'id' | 'title' | 'handle' | 'trackingParameters'
      >
    >;
    products: Array<
      {__typename: 'Product'} & Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'handle' | 'trackingParameters'
      > & {
          selectedOrFirstAvailableVariant?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.ProductVariant, 'id'> & {
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            }
          >;
        }
    >;
    queries: Array<
      {__typename: 'SearchQuerySuggestion'} & Pick<
        StorefrontAPI.SearchQuerySuggestion,
        'text' | 'styledText' | 'trackingParameters'
      >
    >;
  }>;
};

interface GeneratedQueryTypes {
  '#graphql\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  query Header(\n    $country: CountryCode\n    $headerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      ...Shop\n    }\n    menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: HeaderQuery;
    variables: HeaderQueryVariables;
  };
  '#graphql\n  query Footer(\n    $country: CountryCode\n    $footerMenuHandle: String!\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  #graphql\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n\n': {
    return: FooterQuery;
    variables: FooterQueryVariables;
  };
  '#graphql\n  query HomePage(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      homeHeroTitle1: metafield(namespace: "custom", key: "home_hero_title1") { value }\n      homeHeroTitle2: metafield(namespace: "custom", key: "home_hero_title2") { value }\n      homeHeroTag: metafield(namespace: "custom", key: "home_hero_tag") { value }\n      homeHeroPara: metafield(namespace: "custom", key: "home_hero_para") { value }\n      homeHeroImages: metafield(namespace: "custom", key: "home_hero_images") {\n        references(first: 10) {\n          nodes {\n            ... on MediaImage {\n              image {\n                url\n              }\n            }\n          }\n        }\n      }\n      homeHeroVedio: metafield(namespace: "custom", key: "home_hero_vedio") {\n        reference {\n          ... on Video { sources { url } }\n          ... on GenericFile { url }\n        }\n      }\n      homeSec2Title: metafield(namespace: "custom", key: "home_sec2_title") { value }\n      homeSec2Tag: metafield(namespace: "custom", key: "home_sec2_tag") { value }\n      homeSec2CardTitle1: metafield(namespace: "custom", key: "home_sec2_card_title1") { value }\n      homeSec2CardTitle2: metafield(namespace: "custom", key: "home_sec2_card_title2") { value }\n      homeSec2CardTitle3: metafield(namespace: "custom", key: "home_sec2_card_title3") { value }\n      homeSec2CardTitle4: metafield(namespace: "custom", key: "home_sec2_card_title4") { value }\n      homeSec2CardTitle5: metafield(namespace: "custom", key: "home_sec2_card_title5") { value }\n      homeSec2CardImage1: metafield(namespace: "custom", key: "home_sec2_card_img1") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      homeSec2CardImage2: metafield(namespace: "custom", key: "home_sec2_card_img2") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      homeSec2CardImage3: metafield(namespace: "custom", key: "home_sec2_card_img3") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      homeSec2CardImage4: metafield(namespace: "custom", key: "home_sec2_card_img4") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      homeSec2CardImage5: metafield(namespace: "custom", key: "home_sec2_card_img5") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      homeSec2CardPara1: metafield(namespace: "custom", key: "home_sec2_card_para1") { value }\n      homeSec2CardPara2: metafield(namespace: "custom", key: "home_sec2_card_para2") { value }\n      homeSec2CardPara3: metafield(namespace: "custom", key: "home_sec2_card_para3") { value }\n      homeSec2CardPara4: metafield(namespace: "custom", key: "home_sec2_card_para4") { value }\n      homeSec2CardPara5: metafield(namespace: "custom", key: "home_sec2_card_para5") { value }\n      featureSecTitle: metafield(namespace: "custom", key: "feature_sec_title") { value }\n      featureSecTitle1: metafield(namespace: "custom", key: "feature_sec_title1") { value }\n      featureSecTitle2: metafield(namespace: "custom", key: "feature_sec_title2") { value }\n      featureSecTitle3: metafield(namespace: "custom", key: "feature_sec_title3") { value }\n      featureSecTitle4: metafield(namespace: "custom", key: "feature_sec_title4") { value }\n      featureSecTitle5: metafield(namespace: "custom", key: "feature_sec_title5") { value }\n      featureSecTitle6: metafield(namespace: "custom", key: "feature_sec_title6") { value }\n      featureCardPara1: metafield(namespace: "custom", key: "feature_card_para1") { value }\n      featureCardPara2: metafield(namespace: "custom", key: "feature_card_para2") { value }\n      featureCardPara3: metafield(namespace: "custom", key: "feature_card_para3") { value }\n      featureCardPara4: metafield(namespace: "custom", key: "feature_card_para4") { value }\n      featureCardPara5: metafield(namespace: "custom", key: "feature_card_para5") { value }\n      featureCardPara6: metafield(namespace: "custom", key: "feature_card_para6") { value }\n      featureCardImg1: metafield(namespace: "custom", key: "feature_card_img1") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      featureCardImg2: metafield(namespace: "custom", key: "feature_card_img2") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      featureCardImg3: metafield(namespace: "custom", key: "feature_card_img3") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      featureCardImg4: metafield(namespace: "custom", key: "feature_card_img4") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      featureCardImg5: metafield(namespace: "custom", key: "feature_card_img5") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      featureCardImg6: metafield(namespace: "custom", key: "feature_card_img6") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      heritageTag: metafield(namespace: "custom", key: "heritage_tag") { value }\n      heritageTitle: metafield(namespace: "custom", key: "heritage_title") { value }\n      heritagePara: metafield(namespace: "custom", key: "heritage_para") { value }\n      heritageImg: metafield(namespace: "custom", key: "heritage_img") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      heritageVideo: metafield(namespace: "custom", key: "heritage_vedio") {\n        reference {\n          ... on Video { sources { url } }\n          ... on GenericFile { url }\n        }\n      }\n    }\n  }\n': {
    return: HomePageQuery;
    variables: HomePageQueryVariables;
  };
  '#graphql\n  query Article(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      handle\n      articleByHandle(handle: $articleHandle) {\n        handle\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n    }\n  }\n': {
    return: ArticleQuery;
    variables: ArticleQueryVariables;
  };
  '#graphql\n  query Blog(\n    $language: LanguageCode\n    $blogHandle: String!\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      title\n      handle\n      seo {\n        title\n        description\n      }\n      articles(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ArticleItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n\n      }\n    }\n  }\n  fragment ArticleItem on Article {\n    author: authorV2 {\n      name\n    }\n    contentHtml\n    handle\n    id\n    image {\n      id\n      altText\n      url\n      width\n      height\n    }\n    publishedAt\n    title\n    blog {\n      handle\n    }\n  }\n': {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  '#graphql\n  fragment MoneyProductItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment ProductItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyProductItem\n      }\n      maxVariantPrice {\n        ...MoneyProductItem\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        id\n        availableForSale\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n    media(first: 20) {\n      nodes {\n        mediaContentType\n        ... on MediaImage {\n          id\n          image {\n            id\n            url\n            altText\n            width\n            height\n          }\n        }\n        ... on Video {\n          id\n          previewImage {\n            url\n            altText\n          }\n          sources {\n            url\n            mimeType\n          }\n        }\n        ... on ExternalVideo {\n          id\n          embeddedUrl\n          previewImage {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n  query Collection(\n    $handle: String!\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {\n        reference {\n          ... on Video {\n            sources {\n              url\n            }\n          }\n          ... on GenericFile {\n            url\n          }\n        }\n      }\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ProductItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n    page(handle: $handle) {\n      id\n      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {\n        reference {\n          ... on Video {\n            sources {\n              url\n            }\n          }\n          ... on GenericFile {\n            url\n          }\n        }\n      }\n    }\n  }\n': {
    return: CollectionQuery;
    variables: CollectionQueryVariables;
  };
  '#graphql\n  fragment Collection on Collection {\n    id\n    title\n    handle\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n  }\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...Collection\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n': {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  '#graphql\n  query CollectionPage(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      heroTitle: metafield(namespace: "custom", key: "page_hero_title") {\n        value\n      }\n      heroTag: metafield(namespace: "custom", key: "page_hero_tag") {\n        value\n      }\n      heroPara: metafield(namespace: "custom", key: "page_hero_para") {\n        value\n      }\n      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {\n        reference {\n          ... on Video {\n            sources {\n              url\n            }\n          }\n          ... on GenericFile {\n            url\n          }\n        }\n      }\n    }\n  }\n': {
    return: CollectionPageQuery;
    variables: CollectionPageQueryVariables;
  };
  '#graphql\n  query Collections {\n    collections(first: 20) {\n      nodes {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: CollectionsQuery;
    variables: CollectionsQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment MoneyCollectionItem on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment CollectionItem on Product {\n    id\n    handle\n    title\n    featuredImage {\n      id\n      altText\n      url\n      width\n      height\n    }\n    priceRange {\n      minVariantPrice {\n        ...MoneyCollectionItem\n      }\n      maxVariantPrice {\n        ...MoneyCollectionItem\n      }\n    }\n    variants(first: 1) {\n      nodes {\n        id\n        availableForSale\n        price {\n          amount\n          currencyCode\n        }\n      }\n    }\n    media(first: 20) {\n      nodes {\n        mediaContentType\n        ... on MediaImage {\n          id\n          image {\n            id\n            url\n            altText\n            width\n            height\n          }\n        }\n        ... on Video {\n          id\n          previewImage {\n            url\n            altText\n          }\n          sources {\n            url\n            mimeType\n          }\n        }\n        ... on ExternalVideo {\n          id\n          embeddedUrl\n          previewImage {\n            url\n            altText\n          }\n        }\n      }\n    }\n  }\n\n  query Catalog(\n    $country: CountryCode\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(country: $country, language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      nodes {\n        ...CollectionItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n': {
    return: CatalogQuery;
    variables: CatalogQueryVariables;
  };
  '#graphql\n  query PageDetails(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      handle\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageDetailsQuery;
    variables: PageDetailsQueryVariables;
  };
  '#graphql\n  query Page(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      heroTitle: metafield(namespace: "custom", key: "page_hero_title") {\n        value\n      }\n      heroTag: metafield(namespace: "custom", key: "page_hero_tag") {\n        value\n      }\n      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {\n        reference {\n          ... on Video {\n            sources {\n              url\n            }\n          }\n          ... on GenericFile {\n            url\n          }\n        }\n      }\n      firstContentTitle: metafield(namespace: "custom", key: "first_content_title") {\n        value\n      }\n      firstContentPara: metafield(namespace: "custom", key: "first_content_para") {\n        value\n      }\n      firstContentTag: metafield(namespace: "custom", key: "first_content_tag") {\n        value\n      }\n      firstContentVedio: metafield(namespace: "custom", key: "first_content_vedio") {\n        reference {\n          ... on Video {\n            sources {\n              url\n            }\n          }\n          ... on GenericFile {\n            url\n          }\n        }\n      }\n      firstContentImage: metafield(namespace: "custom", key: "first_content_image") {\n        reference {\n          ... on MediaImage {\n            image {\n              url\n            }\n          }\n        }\n      } \n      secondContentTitle: metafield(namespace: "custom", key: "second_content_title") {\n        value\n      }\n      secondContentPara: metafield(namespace: "custom", key: "second_content_para") {\n        value\n      }\n      secondContentTag: metafield(namespace: "custom", key: "second_content_tag") {\n        value\n      }\n      secondContentPara2: metafield(namespace: "custom", key: "second_content_para2") {\n        value\n      }\n      secondcontentTypes: metafield(namespace: "custom", key: "second_content_types") {\n        value\n      }\n      secondContentImage: metafield(namespace: "custom", key: "second_content_image") {\n        reference { ... on MediaImage { image { url } } }\n      }\n      thirdContentTag: metafield(namespace: "custom", key: "third_content_tag") { value }\n      thirdContentTitle: metafield(namespace: "custom", key: "third_content_title") { value }\n      thirdContentFirstCardTitle: metafield(namespace: "custom", key: "third_content_first_card_title") { value }\n      thirdContentSecondCardTitle: metafield(namespace: "custom", key: "third_content_second_card_title") { value }\n      thirdContentThirdCardTitle: metafield(namespace: "custom", key: "third_content_third_card_title") { value }\n      thirdContentFourthCardTitle: metafield(namespace: "custom", key: "third_content_fourth_card_title") { value }\n      thirdContentFirstCardPara: metafield(namespace: "custom", key: "third_content_first_card_para") { value }\n      thirdContentSecondCardPara: metafield(namespace: "custom", key: "third_content_second_card_para") { value }\n      thirdContentThirdCardPara: metafield(namespace: "custom", key: "third_content_third_card_para") { value }\n      thirdContentFourthCardPara: metafield(namespace: "custom", key: "third_content_fourth_card_para") { value }\n      fourthSectionTag: metafield(namespace: "custom", key: "fourth_section_tag") { value }\n      fourthSectionTitle: metafield(namespace: "custom", key: "fourth_section_title") { value }\n      historyCardTag1: metafield(namespace: "custom", key: "history_card_tag1") { value }\n      historyCardTag2: metafield(namespace: "custom", key: "history_card_tag2") { value }\n      historyCardTag3: metafield(namespace: "custom", key: "history_card_tag3") { value }\n      historyCardTag4: metafield(namespace: "custom", key: "history_card_tag4") { value }\n      historyCardTag5: metafield(namespace: "custom", key: "history_card_tag5") { value }\n      historyCardTag6: metafield(namespace: "custom", key: "history_card_tag6") { value }\n      historyCardTitle1: metafield(namespace: "custom", key: "history_card_title1") { value }\n      historyCardTitle2: metafield(namespace: "custom", key: "history_card_title2") { value }\n      historyCardTitle3: metafield(namespace: "custom", key: "history_card_title3") { value }\n      historyCardTitle4: metafield(namespace: "custom", key: "history_card_title4") { value }\n      historyCardTitle5: metafield(namespace: "custom", key: "history_card_title5") { value }\n      historyCardTitle6: metafield(namespace: "custom", key: "history_card_title6") { value }\n      historyCardPara1: metafield(namespace: "custom", key: "history_card_para1") { value }\n      historyCardPara2: metafield(namespace: "custom", key: "history_card_para2") { value }\n      historyCardPara3: metafield(namespace: "custom", key: "history_card_para3") { value }\n      historyCardPara4: metafield(namespace: "custom", key: "history_card_para4") { value }\n      historyCardPara5: metafield(namespace: "custom", key: "history_card_para5") { value }\n      historyCardPara6: metafield(namespace: "custom", key: "history_card_para6") { value }\n      historyCardImg1: metafield(namespace: "custom", key: "history_card_img1") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      historyCardImg2: metafield(namespace: "custom", key: "history_card_img2") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      historyCardImg3: metafield(namespace: "custom", key: "history_card_img3") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      historyCardImg4: metafield(namespace: "custom", key: "history_card_img4") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      historyCardImg5: metafield(namespace: "custom", key: "history_card_img5") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      historyCardImg6: metafield(namespace: "custom", key: "history_card_img6") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      fifthSecTag: metafield(namespace: "custom", key: "fifth_sec_tag") { value }\n      fifthSecTitle: metafield(namespace: "custom", key: "fifth_sec_title") { value }\n      fifthSecPara: metafield(namespace: "custom", key: "fifth_sec_para") { value }\n      fifthSecCounty: metafield(namespace: "custom", key: "fifth_sec_county") { value }\n      fifthSecPara2: metafield(namespace: "custom", key: "fifth_sec_para2") { value }\n      aboutChooseUsTag: metafield(namespace: "custom", key: "about_choose_us_tag") { value }\n      aboutChooseUsTitle: metafield(namespace: "custom", key: "about_choose_us_title") { value }\n      aboutChooseUsPara: metafield(namespace: "custom", key: "about_choose_us_para") { value }\n      aboutChooseUsImg: metafield(namespace: "custom", key: "about_choose_us_img") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      witnessTag: metafield(namespace: "custom", key: "witness_tag") { value }\n      witnessTitle: metafield(namespace: "custom", key: "witness_title") { value }\n      witnessPara: metafield(namespace: "custom", key: "witness_para") { value }\n      witnessV1: metafield(namespace: "custom", key: "witness_v1") {\n        reference { ... on Video { sources { url } } ... on GenericFile { url } }\n      }\n      witnessV1Title: metafield(namespace: "custom", key: "witness_v1_title") { value }\n      witnessV1Para: metafield(namespace: "custom", key: "witness_v1_para") { value }\n      witnessV2: metafield(namespace: "custom", key: "witness_v2") {\n        reference { ... on Video { sources { url } } ... on GenericFile { url } }\n      }\n      witnessV2Title: metafield(namespace: "custom", key: "witness_v2_title") { value }\n      witnessV2Para: metafield(namespace: "custom", key: "witness_v2_para") { value }\n      soonSecTag: metafield(namespace: "custom", key: "soon_sec_tag") { value }\n      soonSecTitle: metafield(namespace: "custom", key: "soon_sec_title") { value }\n      soonSecPara: metafield(namespace: "custom", key: "soon_sec_para") { value }\n      soonSecPara2: metafield(namespace: "custom", key: "soon_sec_para2") { value }\n      soonSecImg: metafield(namespace: "custom", key: "soon_sec_img") {\n        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }\n      }\n      ourComTag: metafield(namespace: "custom", key: "our_com_tag") { value }\n      ourComTitle: metafield(namespace: "custom", key: "our_com_title") { value }\n      ourComPara: metafield(namespace: "custom", key: "our_com_para") { value }\n      ourComImages: metafield(namespace: "custom", key: "our_com_images") {\n        references(first: 20) {\n          nodes {\n            ... on MediaImage {\n              image { url altText }\n            }\n          }\n        }\n      }\n    }\n  }\n': {
    return: PageQuery;
    variables: PageQueryVariables;
  };
  '#graphql\n  query ContactPage(\n    $language: LanguageCode,\n    $country: CountryCode,\n    $handle: String!\n  )\n  @inContext(language: $language, country: $country) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      heroTitle: metafield(namespace: "custom", key: "page_hero_title") {\n        value\n      }\n      heroTag: metafield(namespace: "custom", key: "page_hero_tag") {\n        value\n      }\n      heroPara: metafield(namespace: "custom", key: "page_hero_para") {\n        value\n      }\n       firstContentTitle: metafield(namespace: "custom", key: "first_content_title") {\n        value\n      }\n      firstContentPara: metafield(namespace: "custom", key: "first_content_para") {\n        value\n      }\n      firstContentTag: metafield(namespace: "custom", key: "first_content_tag") {\n        value\n      }\n      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {\n        reference {\n          ... on Video {\n            sources {\n              url\n            }\n          }\n          ... on GenericFile {\n            url\n          }\n        }\n      }\n    }\n      \n  }\n': {
    return: ContactPageQuery;
    variables: ContactPageQueryVariables;
  };
  '#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n  fragment PolicyItem on ShopPolicy {\n    id\n    title\n    handle\n  }\n  query Policies ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      privacyPolicy {\n        ...PolicyItem\n      }\n      shippingPolicy {\n        ...PolicyItem\n      }\n      termsOfService {\n        ...PolicyItem\n      }\n      refundPolicy {\n        ...PolicyItem\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: PoliciesQuery;
    variables: PoliciesQueryVariables;
  };
  '#graphql\n  query Product(\n    $country: CountryCode\n    $handle: String!\n    $language: LanguageCode\n    $selectedOptions: [SelectedOptionInput!]!\n  ) @inContext(country: $country, language: $language) {\n    product(handle: $handle) {\n      ...Product\n    }\n  }\n  #graphql\n  fragment Product on Product {\n    id\n    title\n    vendor\n    handle\n    descriptionHtml\n    description\n    encodedVariantExistence\n    encodedVariantAvailability\n    options {\n      name\n      optionValues {\n        name\n        firstSelectableVariant {\n          ...ProductVariant\n        }\n        swatch {\n          color\n          image {\n            previewImage {\n              url\n            }\n          }\n        }\n      }\n    }\n    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {\n      ...ProductVariant\n    }\n    adjacentVariants (selectedOptions: $selectedOptions) {\n      ...ProductVariant\n    }\n    seo {\n      description\n      title\n    }\n  }\n  #graphql\n  fragment ProductVariant on ProductVariant {\n    availableForSale\n    compareAtPrice {\n      amount\n      currencyCode\n    }\n    id\n    image {\n      __typename\n      id\n      url\n      altText\n      width\n      height\n    }\n    price {\n      amount\n      currencyCode\n    }\n    product {\n      title\n      handle\n    }\n    selectedOptions {\n      name\n      value\n    }\n    sku\n    title\n    unitPrice {\n      amount\n      currencyCode\n    }\n  }\n\n\n': {
    return: ProductQuery;
    variables: ProductQueryVariables;
  };
  '#graphql\n  query RegularSearch(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $term: String!\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    articles: search(\n      query: $term,\n      types: [ARTICLE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Article {\n          ...SearchArticle\n        }\n      }\n    }\n    pages: search(\n      query: $term,\n      types: [PAGE],\n      first: $first,\n    ) {\n      nodes {\n        ...on Page {\n          ...SearchPage\n        }\n      }\n    }\n    products: search(\n      after: $endCursor,\n      before: $startCursor,\n      first: $first,\n      last: $last,\n      query: $term,\n      sortKey: RELEVANCE,\n      types: [PRODUCT],\n      unavailableProducts: HIDE,\n    ) {\n      nodes {\n        ...on Product {\n          ...SearchProduct\n        }\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  #graphql\n  fragment SearchProduct on Product {\n    __typename\n    handle\n    id\n    publishedAt\n    title\n    trackingParameters\n    vendor\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n      compareAtPrice {\n        amount\n        currencyCode\n      }\n      selectedOptions {\n        name\n        value\n      }\n      product {\n        handle\n        title\n      }\n    }\n  }\n\n  #graphql\n  fragment SearchPage on Page {\n     __typename\n     handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment SearchArticle on Article {\n    __typename\n    handle\n    id\n    title\n    trackingParameters\n  }\n\n  #graphql\n  fragment PageInfoFragment on PageInfo {\n    hasNextPage\n    hasPreviousPage\n    startCursor\n    endCursor\n  }\n\n': {
    return: RegularSearchQuery;
    variables: RegularSearchQueryVariables;
  };
  '#graphql\n  query PredictiveSearch(\n    $country: CountryCode\n    $language: LanguageCode\n    $limit: Int!\n    $limitScope: PredictiveSearchLimitScope!\n    $term: String!\n    $types: [PredictiveSearchType!]\n  ) @inContext(country: $country, language: $language) {\n    predictiveSearch(\n      limit: $limit,\n      limitScope: $limitScope,\n      query: $term,\n      types: $types,\n    ) {\n      articles {\n        ...PredictiveArticle\n      }\n      collections {\n        ...PredictiveCollection\n      }\n      pages {\n        ...PredictivePage\n      }\n      products {\n        ...PredictiveProduct\n      }\n      queries {\n        ...PredictiveQuery\n      }\n    }\n  }\n  #graphql\n  fragment PredictiveArticle on Article {\n    __typename\n    id\n    title\n    handle\n    blog {\n      handle\n    }\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveCollection on Collection {\n    __typename\n    id\n    title\n    handle\n    image {\n      url\n      altText\n      width\n      height\n    }\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictivePage on Page {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n  }\n\n  #graphql\n  fragment PredictiveProduct on Product {\n    __typename\n    id\n    title\n    handle\n    trackingParameters\n    selectedOrFirstAvailableVariant(\n      selectedOptions: []\n      ignoreUnknownOptions: true\n      caseInsensitiveMatch: true\n    ) {\n      id\n      image {\n        url\n        altText\n        width\n        height\n      }\n      price {\n        amount\n        currencyCode\n      }\n    }\n  }\n\n  #graphql\n  fragment PredictiveQuery on SearchQuerySuggestion {\n    __typename\n    text\n    styledText\n    trackingParameters\n  }\n\n': {
    return: PredictiveSearchQuery;
    variables: PredictiveSearchQueryVariables;
  };
}

interface GeneratedMutationTypes {}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
