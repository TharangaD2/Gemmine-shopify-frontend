import React, {useRef, useEffect} from 'react';
import {motion} from 'framer-motion';
import {Diamond, Award, Users, Globe, ArrowRight} from 'lucide-react';
import {Link, type MetaFunction} from 'react-router';

// Asset imports - Images
import building from '~/assets/img/building.jpeg';
import img1 from '~/assets/img/img1.png';
import img2 from '~/assets/img/img2.png';
import e1 from '~/assets/img/e1.jpeg';
import img3 from '~/assets/img/img3.png';
import img4 from '~/assets/img/img4.png';
import img5new from '~/assets/img/img5new.jpeg';
import diamond from '~/assets/img/diamond.jpg';
import diamondring from '~/assets/img/diamondring.jpeg';
import gemstone from '~/assets/img/gemstone.jpg';
import img6 from '~/assets/img/img6.jpeg';
import img7 from '~/assets/img/img7.png';
import r2 from '~/assets/img/r2.jpeg';

// Asset imports - Videos
import diamond_earrings from '~/assets/vedio/diamond_earrings.mp4';
import blue_ring from '~/assets/vedio/blue_ring.mp4';
import clip1 from '~/assets/vedio/clip1.mp4';
import clip2 from '~/assets/vedio/clip2.mp4';

const milestones = [
  {
    year: '1988',
    title: 'First Showroom in Galle',
    description:
      'We opened our first showroom in Galle and established ourselves as providers of high quality gemstones and exquisitely designed jewelry.',
    image: building,
  },
  {
    year: '2000',
    title: 'Expansion to Colombo',
    description:
      'Gem Mine opened its first showroom in Colombo, quickly becoming a household name for fashionable jewelry with highly experienced in-house designers.',
    image: img2,
  },
  {
    year: '2002',
    title: 'Jewelry Design Award',
    description:
      'Our commitment to quality, creativity and service won us the prestigious Sri Lanka Jewelry Design Award for our innovative and timeless masterpieces.',
    image: e1,
  },
  {
    year: '2013',
    title: 'Celebrating 25 Years',
    description:
      'Grown from a small family firm to an award-winning leader in Sri Lanka and internationally, serving satisfied customers from around the world.',
    image: img3,
  },
  {
    year: '2023',
    title: '35 Years of Excellence',
    description:
      'Celebrating three and a half decades of delivering superior quality, enduring value, and unmatched craftsmanship.',
    image: img4,
  },
  {
    year: '2025',
    title: 'Future of Luxury',
    description:
      'Preparing to introduce ethically produced lab-grown diamonds to our collection, bridging tradition with modern innovation.',
    image: diamond,
  },
];

const team = [
  {
    name: 'M.N.P.Ariz',
    role: 'Chairman',
    description:
      'With over three decades in the gem industry, Mr. Ariz is a respected figure across Sri Lanka’s key gem-trading regions, including Colombo, Beruwala, Galle, Kandy, and Ratnapura. His leadership continues to inspire the company’s strategic direction and core values.',
  },
  {
    name: 'M.S.K.Rahman',
    role: 'Managing Director',
    description:
      'A GIA-certified gemologist, Mr. Kaleel brings more than 30  years of experience and deep technical expertise. His personalized client service and gem consultancy are hallmarks of the company’s reputation.',
  },
  {
    name: 'M.Yousuf Faraz',
    role: 'Director, Strategy & Finance',
    description:
      'Leveraging international experience gained in the UK, Mr. Faraz oversees procurement, logistics, and overall operations. He has played a pivotal role in the company’s growth over the past 20 years.',
  },
  {
    name: 'M.A.Nilamdeen',
    role: 'Director, Consultant',
    description:
      'A CIMA (UK)-qualified accountant with over 35  years of regional and international experience, Mr. Nilamdeen leads financial planning, investment, and strategic development. He holds memberships with FCMA, ACPA (Botswana), and CGMA (USA).',
  },
];

const products = [
  {
    title: 'Precious Gemstones',
    description:
      'Ceylon sapphires (royal blue, padparadscha), rare rubies, brilliant diamonds, and stunning emeralds.',
    icon: Diamond,
  },
  {
    title: 'Semi-Precious Gemstones',
    description:
      'Handpicked garnets, amethysts, aquamarines, topaz, tourmalines, and moonstones.',
    icon: Award,
  },
  {
    title: 'Exquisite Jewellery',
    description:
      'Intricately designed rings, earrings, pendants, and necklaces, from heirlooms to contemporary pieces.',
    icon: Users,
  },
  {
    title: 'Bespoke Services',
    description:
      'Custom designs and expert repairs, turning your vision into a wearable masterpiece.',
    icon: Globe,
  },
];

export const meta: MetaFunction = () => {
  return [{title: 'Gem Mine | Our Story & Heritage'}];
};

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
    if (storyVideoRef.current) {
      storyVideoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={diamond_earrings} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center z-20">
          <div className="w-full px-6 md:px-12 w-full">
            <motion.div
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.8}}
            >
              <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
                Our Story
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 max-w-3xl leading-tight">
                A Legacy of Excellence
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{opacity: 0, x: -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
            >
              <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
                Est. 1988
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mt-4">
                Our Heritage & Vision
              </h2>
              <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 1988, Gem Mine has earned a distinguished
                  reputation in Sri Lanka’s gem and jewellery industry. Guided
                  by a vision to elevate the nation’s global presence in the gem
                  trade, we uphold the highest standards of quality, integrity,
                  and customer care.
                </p>
                <p>
                  Our centrally located showroom in Colombo showcases a curated
                  selection of fine jewellery, crafted to meet international
                  benchmarks. We pride ourselves on delivering superior quality,
                  personalized service, and enduring value to clients around the
                  world.
                </p>
                <p>
                  Our strength lies in our experienced and multilingual team,
                  specializing in gemology, stone identification, and
                  traditional jewellery design. We stay attuned to global trends
                  while preserving the rich heritage of Sri Lankan
                  craftsmanship.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <video
                  ref={storyVideoRef}
                  src={blue_ring}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={diamondring}
                  alt="Jewellery Detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{opacity: 0, scale: 0.9}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={gemstone}
                  alt="Our Offerings"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a47]/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="order-1 lg:order-2"
            >
              <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
                Excellence & Variety
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mt-4 mb-8">
                What We Offer
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                <p>
                  Well known for our excellent quality, value and unmatched
                  service, we offer a wide range of jewelry types, stones and
                  styles at prices to match your every need.
                </p>
                <p className="bg-[#f8f5f0] p-8 rounded-3xl border-l-4 border-[#d4a89a] italic text-[#1e2a47]">
                  "We are especially known for our fine quality rubies, pearls,
                  emeralds and other colored stones in various settings."
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {[
                    'Rubies',
                    'Pearls',
                    'Emeralds',
                    'Sapphires',
                    'Diamonds',
                  ].map((stone) => (
                    <span
                      key={stone}
                      className="px-6 py-2 bg-[#f8f5f0] rounded-full text-sm font-medium text-[#1e2a47] border border-[#d4a89a]/20"
                    >
                      {stone}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#1e2a47] via-[#2d3e6a] to-[#1e2a47]">
        <div className="w-full">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
              Our Offerings
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
              Products & Expertise
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                whileHover={{y: -10, scale: 1.02}}
                viewport={{once: true}}
                transition={{
                  opacity: {duration: 0.5, delay: index * 0.1},
                  y: {duration: 0.5, delay: index * 0.1},
                  scale: {duration: 0.3},
                }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 hover:border-[#d4a89a]/30 hover:shadow-2xl hover:shadow-[#d4a89a]/10 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 mb-6 rounded-2xl bg-[#d4a89a]/20 flex items-center justify-center group-hover:bg-[#d4a89a]/30 transition-colors">
                  {product.icon ? (
                    <product.icon className="w-6 h-6 text-[#d4a89a]" />
                  ) : (
                    <div className="w-6 h-6 bg-gray-500 rounded-full" />
                  )}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  {product.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {product.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="w-full px-6 md:px-12">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-[#d4a89a]/10 text-[#d4a89a] text-sm font-medium mb-4 tracking-[0.2em] uppercase">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47]">
              Milestones & Achievements
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-[#d4a89a]/20 hidden lg:block" />

            <div className="space-y-24 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{opacity: 0, y: 30}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{delay: index * 0.1}}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`flex-1 w-full ${
                      index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                    }`}
                  >
                    <div
                      className={`relative p-8 md:p-10 rounded-[2rem] bg-[#f8f5f0] border border-[#d4a89a]/10 hover:border-[#d4a89a]/30 transition-all ${
                        index % 2 === 0 ? 'lg:ml-auto' : ''
                      } max-w-lg shadow-sm hover:shadow-xl group z-10`}
                    >
                      {/* Decorative Corner Image */}
                      <div
                        className={`absolute w-32 h-32  md:w-40 md:h-40 opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none z-20 
                                                 ${
                                                   index % 2 === 0
                                                     ? '-top-12 -left-12 lg:-left-20'
                                                     : '-top-12 -right-12 lg:-right-20'
                                                 }`}
                      >
                        <img
                          src={milestone.image}
                          alt=""
                          className="w-full h-full object-cover rounded-full p-2 bg-white border-4 border-[#d4a89a]/20 shadow-2xl"
                        />
                      </div>

                      <span className="text-[#d4a89a] font-serif text-2xl font-bold relative z-10">
                        {milestone.year}
                      </span>
                      <h4 className="text-2xl font-medium text-[#1e2a47] mt-3 relative z-10">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-600 mt-4 leading-relaxed font-light relative z-10">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Point */}
                  <div className="hidden lg:flex w-5 h-5 rounded-full bg-[#d4a89a] border-4 border-white z-10 shadow-lg" />

                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global Clientele Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f5f0]">
        <div className="w-full">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="bg-[#1e2a47] text-white p-12 md:p-20 rounded-[3rem] overflow-hidden relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <span className="text-amber-400 tracking-[0.3em] uppercase text-sm">
                Global Presence
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white">
                Serving the World
              </h2>
              <p className="text-amber-100/80 leading-relaxed mb-8 text-lg ">
                Gemmine (Pvt) Ltd proudly serves a broad international market,
                with a dedicated clientele from across the globe.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'China',
                  'Korea',
                  'Singapore',
                  'India',
                  'Saudi Arabia',
                  'UAE',
                  'Russia',
                  'France',
                  'Switzerland',
                ].map((country) => (
                  <span
                    key={country}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/10 hover:bg-white/20 transition-colors"
                  >
                    {country}
                  </span>
                ))}
              </div>
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm italic text-amber-200/70">
                  "Our doors are open 365 days a year, making us a dependable
                  destination for tourists and global travellers alike."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-[#f8f5f0]">
        <div className="w-full">
          <div className="bg-[#1e2a47] rounded-[3rem] p-12 md:p-20 overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
              >
                <span className="text-amber-400 tracking-[0.3em] uppercase text-sm">
                  Why Choose Us
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-8">
                  Commitment to Perfection
                </h2>
                <div className="space-y-6 text-blue-100/80 text-lg leading-relaxed">
                  <p>
                    We are one of the most reputable jewelry stores in Sri
                    Lanka. We offer a myriad of products and services in our
                    spacious showroom, where we also create our unique and
                    stylish pieces.
                  </p>
                  <p>
                    We take great pride in providing only the highest quality,
                    value and services to our clients, ensuring every piece
                    tells a story of elegance and craftsmanship.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <div className="text-3xl font-serif text-amber-400 mb-2">
                      20+
                    </div>
                    <div className="text-sm text-blue-200 uppercase tracking-wider">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-serif text-amber-400 mb-2">
                      100%
                    </div>
                    <div className="text-sm text-blue-200 uppercase tracking-wider">
                      Quality Assured
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{opacity: 0, scale: 0.8, rotate: -5}}
                whileInView={{opacity: 1, scale: 1, rotate: 0}}
                viewport={{once: true}}
                transition={{type: 'spring', stiffness: 100}}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden glass-morphism border border-white/10 p-4 shadow-2xl bg-white/5 backdrop-blur-sm">
                  <img
                    src={img6}
                    alt="Our Craftsmanship"
                    className="rounded-2xl w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-6 -right-6 text-white p-8 rounded-2xl shadow-xl hidden md:block bg-cover bg-center"
                  style={{backgroundImage: `url(${r2})`}}
                >
                  <Diamond className="w-8 h-8 mb-2" />
                  <div className="text-xl font-medium pt-8">Unique Pieces</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise & Team Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f5f0]">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <motion.div
              initial={{opacity: 0, x: -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
            >
              <div className="flex flex-col justify-center h-full">
                <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
                  Knowledge & Skill
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mt-4 mb-8">
                  Our Expertise & Team
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Our strength lies in our experienced and multilingual team,
                  specializing in every facet of the gemstone journey.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {title: 'Gemology & Mining', icon: Diamond},
                    {title: 'Stone Identification & Valuation', icon: Award},
                    {title: 'Laboratory Testing & Certification', icon: Globe},
                    {title: 'Traditional & Contemporary Design', icon: Users},
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{opacity: 0, y: 20}}
                      whileInView={{opacity: 1, y: 0}}
                      viewport={{once: true}}
                      transition={{delay: index * 0.1}}
                      className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-amber-100/50"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <span className="text-[#1e2a47] font-medium text-sm leading-tight">
                        {item.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              transition={{duration: 0.8}}
              className="bg-[#1e2a47] p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden flex flex-col justify-center h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <p className="text-blue-100/80 text-lg leading-relaxed mb-8 italic">
                  "We stay attuned to global trends, market dynamics, and
                  evolving customer preferences. Our customer-first culture
                  ensures that every client receives the highest level of
                  attention, care, and expertise."
                </p>
                <div className="h-px w-16 bg-amber-500/50 mb-6" />
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-[#1e2a47] bg-amber-500/20"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-blue-200">
                    Trusted by generations of collectors
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="w-full">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm">
              Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4">
              Leadership Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{opacity: 0, y: 30}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                transition={{delay: index * 0.1}}
                className="group p-4 md:p-8 rounded-3xl bg-[#f8f5f0] border border-transparent hover:border-amber-200 transition-all duration-500"
              >
                <h3 className="text-base md:text-xl font-medium text-[#1a1a1a] mb-1 group-hover:text-amber-700 transition-colors">
                  {member.name}
                </h3>
                <p className="text-amber-600 text-[10px] md:text-sm font-medium mb-2 md:mb-4">
                  {member.role}
                </p>
                <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Relations Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f5f0]">
        <div className="w-full">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm">
              Our Community
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4">
              Cherished Moments
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Every smile, every celebration — we are honoured to be a part of
              our customers' most treasured moments.
            </p>
          </motion.div>

          <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {[
              {
                src: img1,
                alt: 'Bridal jewellery fitting',
                caption: 'Bridal Consultation',
                sub: 'A bride discovering her perfect piece',
              },
              {
                src: img2,
                alt: 'Customer wearing necklace',
                caption: 'Timeless Elegance',
                sub: 'Wearing a custom gold necklace',
              },
              {
                src: img3,
                alt: 'Couple choosing engagement ring',
                caption: 'A New Chapter',
                sub: 'Finding the perfect engagement ring',
              },
              {
                src: img4,
                alt: 'Gift wrapping jewellery',
                caption: 'The Gift of Love',
                sub: 'Beautifully wrapped for a special someone',
              },
              {
                src: img5new,
                alt: 'Lady wearing diamond earrings',
                caption: 'Radiant Confidence',
                sub: 'Sparkling diamond earrings for every occasion',
              },
              {
                src: img6,
                alt: 'Jewellery store experience',
                caption: 'In-Store Experience',
                sub: 'Personalised service in our boutique',
              },
              {
                src: img7,
                alt: 'Elegant evening piece',
                caption: 'Evening Glamour',
                sub: 'Exquisite pieces for your special night',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, scale: 0.9, y: 30}}
                whileInView={{opacity: 1, scale: 1, y: 0}}
                viewport={{once: true, margin: '-50px'}}
                transition={{
                  duration: 0.7,
                  delay: index * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="break-inside-avoid group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              >
                <div className="relative overflow-hidden aspect-auto">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Caption Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                    <motion.div
                      initial={{x: -20}}
                      whileHover={{x: 0}}
                      className="space-y-2"
                    >
                      <h3 className="text-white font-serif text-2xl leading-tight">
                        {item.caption}
                      </h3>
                      <div className="w-12 h-0.5 bg-amber-400" />
                      <p className="text-amber-100/90 text-sm font-light tracking-wide">
                        {item.sub}
                      </p>
                    </motion.div>
                  </div>

                  {/* Subtle border on hover */}
                  <div className="absolute inset-0 border-0 group-hover:border-[12px] border-white/10 transition-all duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab-Grown Diamonds Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#1e2a47] via-[#2d3e6a] to-[#1e2a47] overflow-hidden">
        <div className="w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{opacity: 0, x: -50}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
            >
              <span className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">
                Coming Soon
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-6">
                Lab-Grown Diamonds
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                In line with our commitment to innovation and sustainability,
                Gemmine (Pvt) Ltd will soon introduce lab-grown diamonds into
                our offerings. Ethically produced and virtually
                indistinguishable from natural diamonds, these stones represent
                the future of responsible luxury, offering beauty, value, and
                eco-conscious sourcing for a new generation of buyers.
              </p>
              <div className="space-y-4">
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  Our ever-evolving product range ensures there's something for
                  every taste, tradition, and trend. From timeless classics to
                  cutting-edge creations, we bring you gems that speak to your
                  soul and jewellery that lasts a lifetime.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{opacity: 0, scale: 0.8}}
              whileInView={{opacity: 1, scale: 1}}
              viewport={{once: true}}
              className="relative group cursor-pointer"
            >
              <div className="aspect-square rounded-full bg-gradient-to-tr from-amber-500/20 to-transparent absolute -inset-10 blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src={diamond}
                  alt="Modern Diamond Jewellery"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:rotate-1 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Artistry in Motion Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white overflow-hidden">
        <div className="w-full">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="text-center mb-16"
          >
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm">
              Artistry in Motion
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4">
              Witness the Craft
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience the soul of our craftsmanship. From the initial spark
              of inspiration to the final radiant polish, watch as we bring
              timeless beauty to life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{opacity: 0, x: -30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video"
            >
              <video
                src={clip1}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif mb-2">The Meticulous Cut</h3>
                <p className="text-amber-100/80 text-sm">
                  Precision and patience in every facet.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{opacity: 0, x: 30}}
              whileInView={{opacity: 1, x: 0}}
              viewport={{once: true}}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video"
            >
              <video
                src={clip2}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif mb-2">The Radiant Finish</h3>
                <p className="text-amber-100/80 text-sm">
                  Where raw nature meets human artistry.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#f8f5f0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47]">
              Experience Authenticity & Artistry
            </h2>
            <p className="text-[#1e2a47]/70 mt-6 text-lg">
              Whether you’re a dedicated collector or a curious explorer,
              Traditional Gemmine (Pvt) Ltd promises authenticity, artistry, and
              timeless beauty.
            </p>
            <Link to="/collections/all">
              <button className="mt-8 bg-gradient-to-r from-[#1e2a47] to-[#2d3e6a] hover:from-[#2d3e6a] hover:to-[#1e2a47] text-white px-10 py-6 rounded-full text-lg flex items-center justify-center gap-2 mx-auto">
                Explore Collection
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
