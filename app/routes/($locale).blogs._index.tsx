import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  User,
  MessageCircle,
  ChevronRight,
  X,
} from 'lucide-react';
import { Link, type MetaFunction } from 'react-router';

// Asset imports

import clean from '~/assets/img/clean.jpeg';
import ringSize from '~/assets/img/ringSize.jpg';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  comments: number;
  image: string;
  excerpt: string;
  content: string[];
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Tips for Buying Gemstones Online',
    date: '19-10-2013',
    author: 'bennu',
    comments: 0,
    image: clean,
    excerpt:
      'Essential guide to navigating the digital gemstone market with confidence and security.',
    category: 'Guide',
    content: [
      'Watch out for stock photographs - ask for real images of the specific stone.',
      'Use a website of an actual store with a physical presence.',
      'Choose a website that has an inspection period and a clear return policy.',
      'Verify the website\'s contact information and customer support.',
      'Look for detailed quality protocols and stone certifications.',
      'Purchase from accredited businesses like GIA certified members.',
    ],
  },
  {
    id: 2,
    title: 'How To Clean Jewelry',
    date: '23-04-2012',
    author: 'GemMine Staff',
    comments: 0,
    image: clean,
    excerpt:
      'Simple tips to maintain the sparkle and shine of your favorite jewelry pieces.',
    category: 'maintenance',
    content: [
      'Over time the natural oils from your skin, air born contaminants, moisture and corrosion will tarnish the shine and luster of your jewelry.',
      'Use a soft-bristled toothbrush and lukewarm soapy water for most metals.',
      'Avoid harsh chemicals or ultrasonic cleaners for porous stones like pearls and opals.',
      'Dry your jewelry thoroughly with a soft, lint-free cloth after cleaning.',
      'Store each piece separately to prevent scratching.',
      'Regular maintenance can drastically improve the condition of your favorite pieces.',
    ],
  },
  {
    id: 3,
    title: 'How To Determine Your Ring Size',
    date: '23-04-2012',
    author: 'Admin',
    comments: 0,
    image: ringSize,
    excerpt:
      'An easy way to find your perfect fit when shopping for yourself or a loved one.',
    category: 'Shopping',
    content: [
      'If you are looking to purchase a ring for yourself or as a gift and you are uncertain of the ring size you need then just follow this simple guide.',
      'Measure your finger at the end of the day when it\'s largest.',
      'Use a piece of string or paper around the base of your finger.',
      'Mark the point where the ends meet and measure the length in millimeters.',
      'Compare your measurement to our standard ring size chart.',
      'When in doubt, it\'s usually better to go one size up for comfort.',
    ],
  },
];

export const meta: MetaFunction = () => {
  return [{ title: 'Gem Mine | Insights & Stories' }];
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="bg-[#f8f5f0] min-h-screen pt-32 pb-24">
      {/* Header Section */}
      <div className="w-full px-6 md:px-12 lg:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
            Our Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mt-4 mb-6 leading-tight">
            Insights & Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
            Discover the art of gemstone selection, jewelry care, and the rich
            heritage behind our collections.
          </p>
        </motion.div>
      </div>

      {/* Blog Grid */}
      <section className="w-full px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-amber-100 h-full flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold uppercase tracking-wider text-amber-700 shadow-sm">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 tracking-wide">
                  <span className="flex items-center gap-1.5 uppercase font-medium">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {post.date}
                  </span>
                  <span className="hidden md:block w-1 h-1 rounded-full bg-amber-200" />
                  <span className="flex items-center gap-1.5 uppercase font-medium">
                    <User className="w-3.5 h-3.5 text-amber-600" />
                    {post.author}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-[#1a1a1a] mb-3 md:mb-4 group-hover:text-amber-800 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 md:mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center text-amber-700 text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-3 transition-all duration-300">
                  Read Story
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white md:text-[#1a1a1a] border border-white/20 transition-all hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="overflow-y-auto">
                <div className="relative h-[40vh] md:h-[50vh]">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-12 left-8 md:left-12 right-12">
                    <span className="px-4 py-2 bg-amber-500 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4 inline-block">
                      {selectedPost.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                      {selectedPost.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-8 mb-10 pb-10 border-b border-gray-100">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Published
                      </span>
                      <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        {selectedPost.date}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Author
                      </span>
                      <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                        <User className="w-4 h-4 text-amber-600" />
                        {selectedPost.author}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                        Engagement
                      </span>
                      <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-amber-600" />
                        {selectedPost.comments} Comments
                      </span>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none">
                    <div className="space-y-6">
                      {selectedPost.content.map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="text-gray-600 leading-relaxed text-lg"
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-16 flex justify-center">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="bg-[#1a1a1a] hover:bg-amber-700 text-white px-12 py-6 rounded-full text-lg transition-colors group flex items-center justify-center"
                    >
                      Continue Reading Our Journal
                      <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
