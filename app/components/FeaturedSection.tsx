import React from 'react';
import {motion} from 'framer-motion';
import {Diamond, Award, Globe, Users, PenTool, Settings} from 'lucide-react';

// Asset imports
import gemstone from '~/assets/img/gemstone.jpg';
import n1 from '~/assets/img/n1.jpeg';
import bluering from '~/assets/img/bluering.jpeg';
import diamond from '~/assets/img/diamond.jpg';
import rounde1 from '~/assets/img/rounde1.jpeg';
import img7 from '~/assets/img/img7.png';

const curatedCategories = [
  {
    id: 'precious-gemstones',
    title: 'Precious Gemstones',
    description:
      'Ceylon sapphires in an array of colours—royal blue, pastel pink, golden yellow, vivid green, and the coveted padparadscha—are at the heart of our collection. We also feature rare and radiant rubies, brilliant white and champagne diamonds, and stunning emeralds.',
    image: gemstone,
    icon: Diamond,
  },
  {
    id: 'semi-precious',
    title: 'Semi-Precious Gemstones',
    description:
      'We source and cut exceptional garnets, amethysts, aquamarines, topaz, tourmalines, spinels, moonstones, peridots, and more, each piece handpicked for its unique hue, brilliance, and authenticity.',
    image: n1,
    icon: Award,
  },
  {
    id: 'exquisite-jewellery',
    title: 'Exquisite Jewellery',
    description:
      "Intricately designed rings, earrings, pendants, necklaces, bracelets, and chains, from traditional heirlooms to sleek, contemporary pieces. Whether you're looking for a solitaire engagement ring or a gemstone-studded statement piece.",
    image: bluering,
    icon: Users,
  },
  {
    id: 'diamond-sets',
    title: 'Diamond Jewellery Sets',
    description:
      'Premium diamond sets feature conflict-free, GIA-certified stones. Designed to radiate elegance and sophistication, these sets are ideal for weddings, high-end gifting, or legacy investments. Cut and polished to maximize brilliance.',
    image: diamond,
    icon: Globe,
  },
  {
    id: 'bespoke-designs',
    title: 'Bespoke and Custom Designs',
    description:
      'Personalized design services to turn your vision into a wearable masterpiece. From selecting stones to sketching the design and executing the final craft, we collaborate closely with clients to create meaningful pieces.',
    image: rounde1,
    icon: PenTool,
  },
  {
    id: 'expert-repairs',
    title: 'Expert Repairs & Redesigns',
    description:
      'Our in-house artisans provide meticulous jewellery repairs, resizing, polishing, and gemstone replacements, ensuring that your cherished pieces are well cared for and restored to perfection.',
    image: img7,
    icon: Settings,
  },
];

export default function FeaturedSection() {
  return (
    <section className="py-24 bg-[#f8f5f0] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mt-4">
              Our curated range includes:
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative group">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 px-4 shrink-0"
            animate={{x: [0, -curatedCategories.length * 344]}}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
          >
            {[...curatedCategories, ...curatedCategories].map((cat, index) => (
              <div
                key={`${cat.id}-${index}`}
                className="w-[280px] md:w-[320px] flex-shrink-0"
              >
                <div
                  className="relative rounded-[2rem] p-8 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#d4a89a]/20 group/card h-full flex flex-col"
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Subtle overlay to show background image while keeping text clear */}
                  <div className="absolute inset-0 bg-white/85 group-hover/card:bg-white/75 transition-all duration-500" />

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#d4a89a]/10 flex items-center justify-center group-hover/card:bg-[#d4a89a] group-hover/card:text-white transition-all duration-500">
                        {cat.icon ? (
                          <cat.icon className="w-6 h-6" />
                        ) : (
                          <div className="w-6 h-6 bg-gray-500 rounded-full" />
                        )}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-serif text-gray-900 mb-3 group-hover/card:text-[#d4a89a] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-gray-800 text-xs md:text-sm leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fades for Marquee */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f5f0] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f5f0] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
