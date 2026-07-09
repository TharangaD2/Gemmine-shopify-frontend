import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/($locale).blogs.$blogHandle.$articleHandle';
import {Image} from '@shopify/hydrogen';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';
import { motion } from 'framer-motion';
import { Calendar, User, ChevronLeft } from 'lucide-react';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `Gem Mine | ${data?.article.title ?? ''}`}];
};

export async function loader(args: Route.LoaderArgs) {
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
async function loadCriticalData({context, request, params}: Route.LoaderArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  redirectIfHandleIsLocalized(
    request,
    {
      handle: articleHandle,
      data: blog.articleByHandle,
    },
    {
      handle: blogHandle,
      data: blog,
    },
  );

  const article = blog.articleByHandle;

  return {article};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="bg-[#f8f5f0] min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <Link to="/blogs" className="inline-flex items-center text-amber-700 hover:text-amber-800 text-sm font-semibold uppercase tracking-wider mb-10 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Journal
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-6 tracking-wide uppercase font-medium">
             <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-amber-600" /> {publishedDate}</span>
             <span className="w-1 h-1 rounded-full bg-amber-300" />
             <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-amber-600" /> {author?.name || 'Gem Mine'}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-10 leading-tight">
            {title}
          </h1>
        </motion.div>
      </div>

      {image && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-6xl mx-auto px-4 md:px-8 mb-16"
        >
          <div className="aspect-[21/9] md:aspect-[2.5/1] overflow-hidden rounded-3xl shadow-xl">
            <Image data={image} sizes="100vw" loading="eager" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-3xl mx-auto px-6 md:px-12"
      >
        <div
          dangerouslySetInnerHTML={{__html: contentHtml}}
          className="prose prose-lg md:prose-xl prose-stone prose-headings:font-serif prose-headings:text-[#1a1a1a] prose-a:text-amber-700 hover:prose-a:text-amber-800 prose-img:rounded-2xl"
        />
      </motion.div>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      handle
      articleByHandle(handle: $articleHandle) {
        handle
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
