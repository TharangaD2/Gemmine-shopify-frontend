import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ChevronRight } from 'lucide-react';
import { Link, useLoaderData, type MetaFunction } from 'react-router';
import type { Route } from './+types/($locale).blogs._index';
import { Image } from '@shopify/hydrogen';

export const meta: MetaFunction = () => {
  return [{ title: 'Gem Mine | Insights & Stories' }];
};

export async function loader({ context, request }: Route.LoaderArgs) {
  // Fetch hero page content + all blog articles from the "news" blog in parallel
  const [{ page }, { blog }] = await Promise.all([
    context.storefront.query(PAGE_QUERY, {
      variables: { handle: 'blog-page' },
    }),
    context.storefront.query(BLOG_ARTICLES_QUERY, {
      variables: { blogHandle: 'news', first: 50 },
    }),
  ]);

  return { page, articles: blog?.articles?.nodes ?? [] };
}

const PAGE_QUERY = `#graphql
  query BlogPage(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      heroTitle: metafield(namespace: "custom", key: "page_hero_title") {
        value
      }
      heroTag: metafield(namespace: "custom", key: "page_hero_tag") {
        value
      }
      heroPara: metafield(namespace: "custom", key: "page_hero_para") {
        value
      }
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
          ... on MediaImage {
            image {
              url
            }
          }
        }
      }
    }
  }
` as const;

const BLOG_ARTICLES_QUERY = `#graphql
  query BlogArticles(
    $blogHandle: String!
    $first: Int!
    $language: LanguageCode
    $country: CountryCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
        nodes {
          id
          handle
          title
          publishedAt
          excerpt
          image {
            id
            altText
            url
            width
            height
          }
          author: authorV2 {
            name
          }
          blog {
            handle
          }
          tags
        }
      }
    }
  }
` as const;

export default function BlogPage() {
  const { page, articles } = useLoaderData<typeof loader>();

  const heroVedioUrl =
    (page?.heroVedio?.reference as any)?.sources?.[0]?.url ||
    (page?.heroVedio?.reference as any)?.url;

  return (
    <div className="bg-[#f8f5f0] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] md:h-[75vh] bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
        {heroVedioUrl ? (
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
        ) : (
          <div className="absolute inset-0 bg-[#1a1a1a] opacity-50" />
        )}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-4"
          >
            <span className="text-amber-500 tracking-[0.3em] uppercase text-sm font-medium block mb-4">
              {page?.heroTag?.value || 'INSIGHTS & STORIES'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4">
              {page?.heroTitle?.value || 'The Gem Mine Journal'}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
              {page?.heroPara?.value || 'Discover the fascinating world of gemstones, industry news, and our latest collections.'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Blog Grid */}
      <section className="w-full px-6 md:px-12 lg:px-24 py-16 md:py-24">
        {articles.length === 0 ? (
          <div className="text-center py-24 text-gray-400 text-lg">No articles found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article: any, index: number) => {
              const publishedDate = new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }).format(new Date(article.publishedAt));

              const category = article.tags?.[0] || 'Article';

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-amber-100 h-full flex flex-col"
                >
                  <Link
                    to={`/blogs/${article.blog.handle}/${article.handle}`}
                    className="flex flex-col h-full cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      {article.image ? (
                        <Image
                          data={article.image}
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                          <span className="text-5xl">💎</span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-amber-700 shadow-sm">
                          {category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 tracking-wide">
                        <span className="flex items-center gap-1.5 uppercase font-medium">
                          <Calendar className="w-3.5 h-3.5 text-amber-600" />
                          {publishedDate}
                        </span>
                        <span className="hidden md:block w-1 h-1 rounded-full bg-amber-200" />
                        <span className="flex items-center gap-1.5 uppercase font-medium">
                          <User className="w-3.5 h-3.5 text-amber-600" />
                          {article.author?.name || 'Gem Mine'}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif text-[#1a1a1a] mb-3 md:mb-4 group-hover:text-amber-800 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 md:mb-6 line-clamp-3">
                        {article.excerpt || 'Read the full article to learn more...'}
                      </p>
                      <div className="mt-auto flex items-center gap-1 text-amber-700 text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-3 transition-all duration-300">
                        Read Story
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
