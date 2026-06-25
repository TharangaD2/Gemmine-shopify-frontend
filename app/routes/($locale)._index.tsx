import React, { useRef, useState, useEffect } from 'react';
import { useLoaderData, type MetaFunction } from 'react-router';
import { Link } from 'react-router';
import type { Route } from './+types/($locale)._index';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ArrowUpRight,
  Diamond,
  Award,
  Globe,
  Users,
  PenTool,
  Settings,
  Leaf,
  Shield,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

export const meta: MetaFunction = () => {
  return [{ title: 'Gem Mine | Timeless Elegance' }];
};

export async function loader({ context }: Route.LoaderArgs) {
  const data = await context.storefront.query(PAGE_QUERY, {
    variables: { handle: 'home-page' },
  });

  if (!data?.page) {
    throw new Response('Page not found', { status: 404 });
  }

  return { page: data.page };
}

const PAGE_QUERY = `#graphql
  query HomePage(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      homeHeroTitle1: metafield(namespace: "custom", key: "home_hero_title1") { value }
      homeHeroTitle2: metafield(namespace: "custom", key: "home_hero_title2") { value }
      homeHeroTag: metafield(namespace: "custom", key: "home_hero_tag") { value }
      homeHeroPara: metafield(namespace: "custom", key: "home_hero_para") { value }
      homeHeroImages: metafield(namespace: "custom", key: "home_hero_images") {
        references(first: 10) {
          nodes {
            ... on MediaImage {
              image {
                url
              }
            }
          }
        }
      }
      homeHeroVedio: metafield(namespace: "custom", key: "home_hero_vedio") {
        reference {
          ... on Video { sources { url } }
          ... on GenericFile { url }
        }
      }
      homeSec2Title: metafield(namespace: "custom", key: "home_sec2_title") { value }
      homeSec2Tag: metafield(namespace: "custom", key: "home_sec2_tag") { value }
      homeSec2CardTitle1: metafield(namespace: "custom", key: "home_sec2_card_title1") { value }
      homeSec2CardTitle2: metafield(namespace: "custom", key: "home_sec2_card_title2") { value }
      homeSec2CardTitle3: metafield(namespace: "custom", key: "home_sec2_card_title3") { value }
      homeSec2CardTitle4: metafield(namespace: "custom", key: "home_sec2_card_title4") { value }
      homeSec2CardTitle5: metafield(namespace: "custom", key: "home_sec2_card_title5") { value }
      homeSec2CardImage1: metafield(namespace: "custom", key: "home_sec2_card_img1") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      homeSec2CardImage2: metafield(namespace: "custom", key: "home_sec2_card_img2") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      homeSec2CardImage3: metafield(namespace: "custom", key: "home_sec2_card_img3") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      homeSec2CardImage4: metafield(namespace: "custom", key: "home_sec2_card_img4") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      homeSec2CardImage5: metafield(namespace: "custom", key: "home_sec2_card_img5") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      homeSec2CardPara1: metafield(namespace: "custom", key: "home_sec2_card_para1") { value }
      homeSec2CardPara2: metafield(namespace: "custom", key: "home_sec2_card_para2") { value }
      homeSec2CardPara3: metafield(namespace: "custom", key: "home_sec2_card_para3") { value }
      homeSec2CardPara4: metafield(namespace: "custom", key: "home_sec2_card_para4") { value }
      homeSec2CardPara5: metafield(namespace: "custom", key: "home_sec2_card_para5") { value }
      featureSecTitle: metafield(namespace: "custom", key: "feature_sec_title") { value }
      featureSecTitle1: metafield(namespace: "custom", key: "feature_sec_title1") { value }
      featureSecTitle2: metafield(namespace: "custom", key: "feature_sec_title2") { value }
      featureSecTitle3: metafield(namespace: "custom", key: "feature_sec_title3") { value }
      featureSecTitle4: metafield(namespace: "custom", key: "feature_sec_title4") { value }
      featureSecTitle5: metafield(namespace: "custom", key: "feature_sec_title5") { value }
      featureSecTitle6: metafield(namespace: "custom", key: "feature_sec_title6") { value }
      featureCardPara1: metafield(namespace: "custom", key: "feature_card_para1") { value }
      featureCardPara2: metafield(namespace: "custom", key: "feature_card_para2") { value }
      featureCardPara3: metafield(namespace: "custom", key: "feature_card_para3") { value }
      featureCardPara4: metafield(namespace: "custom", key: "feature_card_para4") { value }
      featureCardPara5: metafield(namespace: "custom", key: "feature_card_para5") { value }
      featureCardPara6: metafield(namespace: "custom", key: "feature_card_para6") { value }
      featureCardImg1: metafield(namespace: "custom", key: "feature_card_img1") {
        reference { ... on MediaImage { image { url } } }
      }
      featureCardImg2: metafield(namespace: "custom", key: "feature_card_img2") {
        reference { ... on MediaImage { image { url } } }
      }
      featureCardImg3: metafield(namespace: "custom", key: "feature_card_img3") {
        reference { ... on MediaImage { image { url } } }
      }
      featureCardImg4: metafield(namespace: "custom", key: "feature_card_img4") {
        reference { ... on MediaImage { image { url } } }
      }
      featureCardImg5: metafield(namespace: "custom", key: "feature_card_img5") {
        reference { ... on MediaImage { image { url } } }
      }
      featureCardImg6: metafield(namespace: "custom", key: "feature_card_img6") {
        reference { ... on MediaImage { image { url } } }
      }
      heritageTag: metafield(namespace: "custom", key: "heritage_tag") { value }
      heritageTitle: metafield(namespace: "custom", key: "heritage_title") { value }
      heritagePara: metafield(namespace: "custom", key: "heritage_para") { value }
      heritageImg: metafield(namespace: "custom", key: "heritage_img") {
        reference { ... on MediaImage { image { url } } }
      }
      heritageVideo: metafield(namespace: "custom", key: "heritage_vedio") {
        reference {
          ... on Video { sources { url } }
          ... on GenericFile { url }
        }
      }
    }
  }
` as const;



function Btn({
  variant = 'default',
  className = '',
  children,
  onClick,
}: {
  variant?: 'default' | 'outline' | 'dark';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const base =
    'inline-flex items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 font-medium';
  const variants = {
    default:
      'bg-gradient-to-r from-[#d4a89a] to-[#c9a88a] hover:from-[#e8c4b5] hover:to-[#d4a89a] text-white shadow-[0_0_30px_rgba(212,168,154,0.3)] hover:shadow-[0_0_50px_rgba(212,168,154,0.5)]',
    outline: 'border border-[#d4a89a]/50 text-[#d4a89a] hover:bg-[#d4a89a]/20 hover:text-[#e8c4b5]',
    dark: 'bg-[#1e2a47] text-white hover:bg-[#2d3e6a]',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}


function HeroSection({ page }: { page?: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [isMounted, setIsMounted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = page?.homeHeroImages?.references?.nodes?.map((n: any) => n?.image?.url).filter(Boolean) || [];

  useEffect(() => {
    setIsMounted(true);
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

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
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [-20, -500], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 5 + i * 0.5, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
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
              {page?.homeHeroTitle2?.value}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto lg:mx-0 mt-8 leading-relaxed whitespace-pre-line"
          >
            {page?.homeHeroPara?.value}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start"
          >
            <Link to="/collections/all">
              <Btn className="group px-8 py-6 text-lg">
                Explore Collections
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Btn>
            </Link>
            <Link to="/pages/about">
              <Btn variant="outline" className="px-8 py-6 text-lg">
                Our Story
              </Btn>
            </Link>
          </motion.div>
        </div>

        {/* Right Content — 3D Image Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="lg:w-1/2 relative"
        >
          <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] mx-auto">
            {/* Glowing rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border border-[#d4a89a]/20" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute inset-4 rounded-full border border-[#d4a89a]/30" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute inset-8 rounded-full border border-[#d4a89a]/20" />

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
                  initial={{ opacity: 0, scale: 1.2, rotate: 5, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -5, filter: 'blur(10px)' }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => {
                    if (heroImages.length > 0) {
                      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {heroImages.length > 0 ? (
                    <img
                      src={heroImages[currentImageIndex]}
                      alt={`Carousel image ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1e2a47] flex items-center justify-center text-white/50 text-sm">No images</div>
                  )}
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#d4a89a] rounded-full"
                style={{ top: `${20 + i * 15}%`, left: `${i % 2 === 0 ? 5 : 90}%` }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
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


function CollectionsSection({ page }: { page?: any }) {
  const collectionsData = [
    { name: page?.homeSec2CardTitle1?.value, description: page?.homeSec2CardPara1?.value, image: page?.homeSec2CardImage1?.reference?.image?.url || page?.homeSec2CardImage1?.reference?.url, category: 'bridal' },
    { name: page?.homeSec2CardTitle2?.value, description: page?.homeSec2CardPara2?.value, image: page?.homeSec2CardImage2?.reference?.image?.url || page?.homeSec2CardImage2?.reference?.url, category: 'rings' },
    { name: page?.homeSec2CardTitle3?.value, description: page?.homeSec2CardPara3?.value, image: page?.homeSec2CardImage3?.reference?.image?.url || page?.homeSec2CardImage3?.reference?.url, category: 'necklaces' },
    { name: page?.homeSec2CardTitle4?.value, description: page?.homeSec2CardPara4?.value, image: page?.homeSec2CardImage4?.reference?.image?.url || page?.homeSec2CardImage4?.reference?.url, category: 'earring' },
    { name: page?.homeSec2CardTitle5?.value, description: page?.homeSec2CardPara5?.value, image: page?.homeSec2CardImage5?.reference?.image?.url || page?.homeSec2CardImage5?.reference?.url, category: 'gem-stones' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0f0f0f] to-[#f8f5f0] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-center mb-16"
        >
          <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
            {page?.homeSec2Tag?.value}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mt-4">
            {page?.homeSec2Title?.value}
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 px-6 md:px-12 lg:px-24 pb-4">
        {collectionsData.map((collection, index) => (
          <motion.div
            key={collection.name ?? index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link to={`/collections/${collection.category}`}>
              <motion.div whileHover={{ y: -10 }} className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden relative">
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${collection.image})` }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base md:text-xl font-semibold text-white">{collection.name}</h3>
                      <p className="text-white/70 text-[10px] md:text-sm mt-0.5 md:mt-1">{collection.description}</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
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


const marqueeWords1 = ['Luxury', 'Craftsmanship', 'Heritage', 'Excellence', 'Pure Gold', 'Diamonds'];
const marqueeWords2 = ['Elegance', 'Timeless', 'Beauty', 'Royal', 'Collection', 'Bespoke', 'Artistry'];

function MarqueeSection() {
  return (
    <section className="py-12 bg-[#f8f5f0] overflow-hidden">
      {/* Row 1 — Left */}
      <div className="flex whitespace-nowrap mb-4">
        {[0, 1].map((clone) => (
          <motion.div
            key={clone}
            className="flex shrink-0"
            animate={{ x: [0, -1920] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            {[...marqueeWords1, ...marqueeWords1, ...marqueeWords1, ...marqueeWords1].map((word, i) => (
              <div key={i} className="flex items-center mx-8">
                <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#1a1a1a]/20">{word}</span>
                <Diamond className="w-4 h-4 text-[#d4a89a] ml-8" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Row 2 — Right */}
      <div className="flex whitespace-nowrap">
        {[0, 1].map((clone) => (
          <motion.div
            key={clone}
            className="flex shrink-0"
            animate={{ x: [-1920, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          >
            {[...marqueeWords2, ...marqueeWords2, ...marqueeWords2, ...marqueeWords2].map((word, i) => (
              <div key={i} className="flex items-center mx-8">
                <span className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#d4a89a]/30">{word}</span>
                <Diamond className="w-4 h-4 text-[#1a1a1a]/30 ml-8" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// SECTION 4 — Featured / Curated Categories
// ─────────────────────────────────────────────────────────
const featuredIcons = [Diamond, Award, Users, Globe, PenTool, Settings];

function FeaturedSection({ page }: { page?: any }) {
  const sectionTitle = page?.featureSecTitle?.value;

  const curatedCategories = [
    { id: 'feature-0', title: page?.featureSecTitle1?.value, description: page?.featureCardPara1?.value, image: page?.featureCardImg1?.reference?.image?.url || '', icon: featuredIcons[0] },
    { id: 'feature-1', title: page?.featureSecTitle2?.value, description: page?.featureCardPara2?.value, image: page?.featureCardImg2?.reference?.image?.url || '', icon: featuredIcons[1] },
    { id: 'feature-2', title: page?.featureSecTitle3?.value, description: page?.featureCardPara3?.value, image: page?.featureCardImg3?.reference?.image?.url || '', icon: featuredIcons[2] },
    { id: 'feature-3', title: page?.featureSecTitle4?.value, description: page?.featureCardPara4?.value, image: page?.featureCardImg4?.reference?.image?.url || '', icon: featuredIcons[3] },
    { id: 'feature-4', title: page?.featureSecTitle5?.value, description: page?.featureCardPara5?.value, image: page?.featureCardImg5?.reference?.image?.url || '', icon: featuredIcons[4] },
    { id: 'feature-5', title: page?.featureSecTitle6?.value, description: page?.featureCardPara6?.value, image: page?.featureCardImg6?.reference?.image?.url || '', icon: featuredIcons[5] },
  ];

  return (
    <section className="py-24 bg-[#f8f5f0] overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mt-4">{sectionTitle}</h2>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative group">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 px-4 shrink-0"
            animate={{ x: [0, -curatedCategories.length * 344] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          >
            {[...curatedCategories, ...curatedCategories].map((cat, index) => (
              <div key={`${cat.id}-${index}`} className="w-[280px] md:w-[320px] flex-shrink-0">
                <div
                  className="relative rounded-[2rem] p-8 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#d4a89a]/20 group/card h-full flex flex-col"
                  style={{ backgroundImage: `url(${cat.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-white/85 group-hover/card:bg-white/75 transition-all duration-500" />
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#d4a89a]/10 flex items-center justify-center group-hover/card:bg-[#d4a89a] group-hover/card:text-white transition-all duration-500">
                        {cat.icon ? <cat.icon className="w-6 h-6" /> : <div className="w-6 h-6 bg-gray-500 rounded-full" />}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-serif text-gray-900 mb-3 group-hover/card:text-[#d4a89a] transition-colors">{cat.title}</h3>
                      <p className="text-gray-800 text-xs md:text-sm leading-relaxed">{cat.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f5f0] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f5f0] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}


const trustFeatures = [
  { icon: Diamond, title: 'Certified Diamonds', description: 'Every diamond is GIA certified for quality and authenticity' },
  { icon: Award, title: 'Royal Craftsmanship', description: 'Handcrafted by master artisans with decades of experience' },
  { icon: Leaf, title: 'Ethically Sourced', description: 'Responsibly sourced gemstones from trusted partners' },
  { icon: Shield, title: 'Lifetime Warranty', description: 'Comprehensive warranty and complimentary maintenance' },
];

function FeaturesSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#1e2a47] via-[#2d3e6a] to-[#1e2a47]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
        {trustFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#d4a89a]/10 border border-[#d4a89a]/30 flex items-center justify-center"
            >
              {feature.icon ? <feature.icon className="w-10 h-10 text-[#d4a89a]" /> : <div className="w-10 h-10 bg-gray-500 rounded-full" />}
            </motion.div>
            <h3 className="text-xl font-medium text-white mb-3">{feature.title}</h3>
            <p className="text-white text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


function HeritageSection({ page }: { page?: any }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoUrl = page?.heritageVideo?.reference?.sources?.[0]?.url || page?.heritageVideo?.reference?.url;
  const imgUrl = page?.heritageImg?.reference?.image?.url;
  const tagText = page?.heritageTag?.value;
  const titleText = page?.heritageTitle?.value;
  const paraText = page?.heritagePara?.value;

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.5;
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-[#f8f5f0] to-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        {/* Media */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative">
            <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              <video ref={videoRef} src={videoUrl} autoPlay loop muted playsInline className="w-full h-[400px] md:h-[500px] object-cover" />
            </motion.div>

            {/* Floating smaller image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 md:-right-12 w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
            >
              <img src={imgUrl} alt="Jewellery Detail" className="w-full h-full object-cover" />
            </motion.div>
          </div>
          <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#d4a89a]/30 rounded-2xl -z-10" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:pl-12"
        >
          <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">{tagText}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4 leading-tight">{titleText}</h2>

          <div className="mt-8 space-y-6 text-gray-600 leading-relaxed whitespace-pre-line">
            {paraText && <p>{paraText}</p>}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[{ value: '6+', label: 'Years' }, { value: '10K+', label: 'Pieces' }, { value: '50+', label: 'Artisans' }].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-light text-[#d4a89a]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <Link to="/pages/about">
            <Btn variant="dark" className="px-10 py-6 text-lg shadow-xl shadow-[#1e2a47]/20 group mt-10">
              Discover Our Heritage
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Btn>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}


function NewsletterSection() {
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
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1e2a47]/10 border border-[#1e2a47]/20 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-[#1e2a47]" />
          <span className="text-[#1e2a47] text-sm font-medium">Stay Connected</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mb-4">Join the Aurum Circle</h2>
        <p className="text-[#1e2a47]/70 mb-10">
          Be the first to discover new collections, exclusive events, and special offers from the world of Aurum.
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
            <Send className="ml-2 w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </section>
  );
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home bg-white">
      {/* <MockShopNotice /> was removed as isShopLinked is no longer passed */}
      <HeroSection page={data.page} />
      <CollectionsSection page={data.page} />
      <MarqueeSection />
      <FeaturedSection page={data.page} />
      <FeaturesSection />
      <HeritageSection page={data.page} />
      <NewsletterSection />
    </div>
  );
}
