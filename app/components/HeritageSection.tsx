import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import {Link} from 'react-router';

// Asset imports
import ringp from '~/assets/img/ringp.jpeg';
import pinkgem from '~/assets/vedio/pinkgem.mp4';

const Button = ({
  className = '',
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 font-medium';
  return (
    <button className={`${baseStyles} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default function HeritageSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#f8f5f0] to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Images */}
        <motion.div
          initial={{opacity: 0, x: -50}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="relative"
        >
          <div className="relative">
            <motion.div
              whileHover={{scale: 1.02}}
              className="rounded-2xl overflow-hidden shadow-2xl bg-gray-200"
            >
              <video
                ref={videoRef}
                src={pinkgem}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </motion.div>

            {/* Floating smaller image */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8, delay: 0.3}}
              className="absolute -bottom-8 -right-8 md:-right-12 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <img
                src={ringp}
                alt="Jewellery Detail"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Decorative element */}
          <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#d4a89a]/30 rounded-2xl -z-10" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{opacity: 0, x: 50}}
          whileInView={{opacity: 1, x: 0}}
          viewport={{once: true}}
          transition={{duration: 0.8}}
          className="lg:pl-12"
        >
          <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
            Our Heritage
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4 leading-tight">
            A Legacy of Excellence
          </h2>

          <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
            <p>
              Since 2018, Gem Mine has been synonymous with exceptional
              craftsmanship and timeless design in Sri Lanka. Our master artisans
              blend traditional techniques with contemporary innovation.
            </p>
            <p>
              Each piece that leaves our atelier carries the soul of its maker, a
              testament to the dedication and passion that defines our brand.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              {value: '6+', label: 'Years'},
              {value: '10K+', label: 'Pieces'},
              {value: '50+', label: 'Artisans'},
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{duration: 0.5, delay: index * 0.1}}
              >
                <div className="text-3xl md:text-4xl font-light text-[#d4a89a]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <Link to="/pages/about">
            <Button className="bg-[#1e2a47] text-white hover:bg-[#2d3e6a] px-10 py-6 text-lg shadow-xl shadow-[#1e2a47]/20 group">
              Discover Our Heritage
              {ArrowRight ? <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /> : <div className="ml-2 w-5 h-5 bg-white rounded-full" />}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
