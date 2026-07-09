import React from 'react';
import { useParams, Link } from 'react-router';
import { Calendar, User, MessageCircle, ChevronLeft } from 'lucide-react';
import { blogPosts } from '~/lib/blogData';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.id ?? '';
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f5f0]">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-[#1a1a1a] mb-4">Post not found</h1>
          <Link to="/blogs" className="text-amber-600 hover:text-amber-800 underline">
            Return to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5f0] pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto mb-6">
        <Link
          to="/blogs"
          className="inline-flex items-center text-amber-700 hover:text-amber-800 text-sm font-semibold uppercase tracking-wider transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Journal
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] overflow-hidden shadow-xl">
        {/* image section */}
        <div className="relative h-[40vh] md:h-[60vh]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-8 md:left-12 right-12">
            <span className="px-4 py-2 bg-amber-500 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4 inline-block shadow-sm">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* content section */}
        <div className="p-8 md:p-12 md:px-20">
          <div className="flex flex-wrap items-center gap-8 mb-10 pb-10 border-b border-gray-100">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Published
              </span>
              <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                {post.date}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Author
              </span>
              <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                <User className="w-4 h-4 text-amber-600" />
                {post.author}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                Engagement
              </span>
              <span className="text-sm font-semibold text-[#1a1a1a] flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-amber-600" />
                {post.comments} Comments
              </span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-6">
              {post.content.map((paragraph, idx) => (
                <p key={idx} className="text-gray-600 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <Link
              to="/blogs"
              className="bg-[#1a1a1a] hover:bg-amber-700 text-white px-10 py-5 rounded-full text-lg transition-colors group flex items-center justify-center font-medium"
            >
              <ChevronLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Journal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
