import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router';

// Asset imports
import n1_crop from '~/assets/img/n1_crop.jpeg';
import r1 from '~/assets/img/r1.jpeg';
import green2 from '~/assets/img/green2.jpeg';
import rounde2 from '~/assets/img/rounde2.jpeg';
import ringp from '~/assets/img/ringp.jpeg';
import e1 from '~/assets/img/e1.jpeg';
import bluering from '~/assets/img/bluering.jpeg';

const carouselImages = [bluering, n1_crop, r1, green2, rounde2, ringp, e1];

const Button = ({
  variant = 'default',
  className = '',
  children,
  onClick,
}: {
  variant?: 'default' | 'outline';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 font-medium';
  const variants = {
    default:
      'bg-gradient-to-r from-[#d4a89a] to-[#c9a88a] hover:from-[#e8c4b5] hover:to-[#d4a89a] text-white shadow-[0_0_30px_rgba(212,168,154,0.3)] hover:shadow-[0_0_50px_rgba(212,168,154,0.5)]',
    outline:
      'border border-[#d4a89a]/50 text-[#d4a89a] hover:bg-[#d4a89a]/20 hover:text-[#e8c4b5]',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function HeroSection({ page }: { page?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1e2a47] via-[#2d3e6a] to-[#0f0f0f]"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {isMounted &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#d4a89a]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -500],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.3,
              }}
            />
          ))}
      </div>

      {/* Rose gold gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d4a89a]/10 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 md:px-12 lg:px-24 pt-32 pb-20"
      >
        {/* Left Content */}
        <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4a89a]/20 border border-[#d4a89a]/30 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#d4a89a]" />
            <span className="text-[#d4a89a] text-sm tracking-[0.2em] uppercase">
              {page?.homeHeroTag?.value}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif"
          >

            <span className="block text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-tight">
              {page?.homeHeroTitle1?.value}
            </span>
            <span className="inline-block text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#d4a89a] via-[#e8c4b5] to-[#d4a89a] font-light italic mt-2 pb-4">
              {page?.homeHeroTitle2?.value || "Elegance"}
            </span>

          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mt-8 leading-relaxed whitespace-pre-line"
          >
            {page?.homeHeroPara?.value || "Discover handcrafted luxury jewellery that tells your unique story.\nEach piece is a masterwork of artistry and passion."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start"
          >
            <Link to="/collections/all">
              <Button className="group bg-gradient-to-r from-[#d4a89a] to-[#c9a88a] hover:from-[#e8c4b5] hover:to-[#d4a89a] text-white font-medium px-8 py-6 text-lg rounded-full transition-all duration-500 shadow-[0_0_30px_rgba(212,168,154,0.3)] hover:shadow-[0_0_50px_rgba(212,168,154,0.5)]">
                Explore Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/pages/about">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Our Story
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right Content - 3D Image Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] mx-auto">
            {/* Glowing rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-[#d4a89a]/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 rounded-full border border-[#d4a89a]/30"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full border border-[#d4a89a]/20"
            />

            {/* Main Image Container */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-12 rounded-full overflow-hidden shadow-[0_0_100px_rgba(212,168,154,0.2)] border-2 border-[#d4a89a]/30"
              style={{ perspective: '1000px' }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImageIndex}
                  initial={{
                    opacity: 0,
                    scale: 1.2,
                    rotate: 5,
                    filter: 'blur(10px)',
                  }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    rotate: -5,
                    filter: 'blur(10px)',
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev + 1) % carouselImages.length,
                    )
                  }
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={carouselImages[currentImageIndex]}
                    alt={`Carousel image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#d4a89a] rounded-full"
                style={{
                  top: `${20 + i * 15}%`,
                  left: `${i % 2 === 0 ? 5 : 90}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#d4a89a]/50 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#d4a89a] rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
