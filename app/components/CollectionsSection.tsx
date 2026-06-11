import React from 'react';
import {motion} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';
import {Link} from 'react-router';

// Asset imports
import wedding_img from '~/assets/img/wedding_img.png';
import diamondring from '~/assets/img/diamondring.jpeg';
import n1 from '~/assets/img/n1.jpeg';
import e1 from '~/assets/img/e1.jpeg';
import gemstone from '~/assets/img/gemstone.jpg';


const Collections = [
  {
    name: 'Bridal Collection',
    description: 'Timeless pieces for your special day',
    image: wedding_img,
    category: 'bridal',
  },
  {
    name: 'Diamond Rings',
    description: 'Brilliance in every facet',
    image: diamondring,
    category: 'rings',
  },
  {
    name: 'Gold Necklaces',
    description: 'Elegance that adorns',
    image: n1,
    category: 'necklaces',
  },
  {
    name: 'Royal Earrings',
    description: 'Grace in every movement',
    image: e1,
    category: 'earring',
  },
  {
    name: 'Gem Stones',
    description: 'Grace in every movement',
    image: gemstone,
    category: 'gem-stones',
  },
];

export default function CollectionsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#f8f5f0] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="text-center md:text-center mb-16"
        >
          <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
            Curated Excellence
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mt-4">
            Our Collections
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 px-6 md:px-12 lg:px-24 pb-4">
        {Collections.map((Collection, index) => (
          <motion.div
            key={Collection.name}
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6, delay: index * 0.1}}
          >
            <Link
              to={`/collections/${Collection.category}`}
            >
              <motion.div
                whileHover={{y: -10}}
                className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={Collection.image}
                    alt={Collection.name}
                    className="w-full h-full object-cover"
                    whileHover={{scale: 1.1}}
                    transition={{duration: 0.6}}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base md:text-xl font-semibold text-white">
                        {Collection.name}
                      </h3>
                      <p className="text-white/70 text-[10px] md:text-sm mt-0.5 md:mt-1">
                        {Collection.description}
                      </p>
                    </div>
                    <motion.div
                      initial={{opacity: 0, x: -10}}
                      whileHover={{opacity: 1, x: 0}}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#d4a89a] flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity"
                    >
                      <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
                    </motion.div>
                  </div>
                </div>

                <motion.div className="absolute inset-0 border-2 border-[#d4a89a]/0 group-hover:border-[#d4a89a]/50 rounded-2xl transition-all duration-500" />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
