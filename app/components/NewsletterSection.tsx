import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {Sparkles, Send} from 'lucide-react';
import {toast} from 'sonner';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f5f0] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4a89a]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d4a89a]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{opacity: 0, y: 30}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.8}}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e2a47]/10 border border-[#1e2a47]/20 rounded-full mb-6">
          {Sparkles ? <Sparkles className="w-4 h-4 text-[#1e2a47]" /> : <div className="w-4 h-4 bg-[#1e2a47] rounded-full" />}
          <span className="text-[#1e2a47] text-sm font-medium">Stay Connected</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mb-4">
          Join the Aurum Circle
        </h2>

        <p className="text-[#1e2a47]/70 mb-10">
          Be the first to discover new collections, exclusive events, and
          special offers from the world of Aurum.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white border border-[#1e2a47]/20 text-[#1e2a47] placeholder:text-[#1e2a47]/40 h-14 rounded-full px-6 focus:outline-none focus:ring-2 focus:ring-[#1e2a47]/20 transition-all"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#1e2a47] to-[#2d3e6a] hover:from-[#2d3e6a] hover:to-[#1e2a47] text-white font-medium h-14 px-8 rounded-full shadow-lg shadow-[#1e2a47]/20 flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            Subscribe
            {Send ? <Send className="ml-2 w-4 h-4" /> : <div className="ml-2 w-4 h-4 bg-white rounded-full" />}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
