import React from 'react';
import {motion} from 'framer-motion';
import {Diamond} from 'lucide-react';

const words1 = [
  'Luxury',
  'Craftsmanship',
  'Heritage',
  'Excellence',
  'Pure Gold',
  'Diamonds',
];
const words2 = [
  'Elegance',
  'Timeless',
  'Beauty',
  'Royal',
  'Collection',
  'Bespoke',
  'Artistry',
];

export default function MarqueeSection() {
  return (
    <section className="py-12 bg-[#f8f5f0] overflow-hidden">
      {/* First Row - Moving Left */}
      <div className="flex whitespace-nowrap mb-4">
        <motion.div
          className="flex shrink-0"
          animate={{x: [0, -1920]}}
          transition={{duration: 30, repeat: Infinity, ease: 'linear'}}
        >
          {[...words1, ...words1, ...words1, ...words1].map((word, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1a1a1a]/20">
                {word}
              </span>
              {Diamond ? <Diamond className="w-4 h-4 text-[#d4a89a] ml-8" /> : <div className="w-4 h-4 bg-[#d4a89a] rounded-full ml-8" />}
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0"
          animate={{x: [0, -1920]}}
          transition={{duration: 30, repeat: Infinity, ease: 'linear'}}
        >
          {[...words1, ...words1, ...words1, ...words1].map((word, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1a1a1a]/20">
                {word}
              </span>
              {Diamond ? <Diamond className="w-4 h-4 text-[#d4a89a] ml-8" /> : <div className="w-4 h-4 bg-[#d4a89a] rounded-full ml-8" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Second Row - Moving Right */}
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex shrink-0"
          animate={{x: [-1920, 0]}}
          transition={{duration: 25, repeat: Infinity, ease: 'linear'}}
        >
          {[...words2, ...words2, ...words2, ...words2].map((word, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#d4a89a]/30">
                {word}
              </span>
              <Diamond className="w-4 h-4 text-[#1a1a1a]/30 ml-8" />
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex shrink-0"
          animate={{x: [-1920, 0]}}
          transition={{duration: 25, repeat: Infinity, ease: 'linear'}}
        >
          {[...words2, ...words2, ...words2, ...words2].map((word, index) => (
            <div key={index} className="flex items-center mx-8">
              <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#d4a89a]/30">
                {word}
              </span>
              <Diamond className="w-4 h-4 text-[#1a1a1a]/30 ml-8" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
