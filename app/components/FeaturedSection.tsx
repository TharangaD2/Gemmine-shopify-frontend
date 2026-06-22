import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Award, Globe, Users, PenTool, Settings } from 'lucide-react';

const icons = [Diamond, Award, Users, Globe, PenTool, Settings];

export default function FeaturedSection({ page }: { page?: any }) {
  const sectionTitle = page?.featureSecTitle?.value || 'Our curated range includes:';

  const curatedCategories = [
    {
      id: 'feature-0',
      title: page?.featureSecTitle1?.value || 'Missing: feature_sec_title1',
      description: page?.featureCardPara1?.value || 'Missing: feature_card_para1',
      image: page?.featureCardImg1?.reference?.image?.url || '',
      icon: icons[0],
    },
    {
      id: 'feature-1',
      title: page?.featureSecTitle2?.value || 'Missing: feature_sec_title2',
      description: page?.featureCardPara2?.value || 'Missing: feature_card_para2',
      image: page?.featureCardImg2?.reference?.image?.url || '',
      icon: icons[1],
    },
    {
      id: 'feature-2',
      title: page?.featureSecTitle3?.value || 'Missing: feature_sec_title3',
      description: page?.featureCardPara3?.value || 'Missing: feature_card_para3',
      image: page?.featureCardImg3?.reference?.image?.url || '',
      icon: icons[2],
    },
    {
      id: 'feature-3',
      title: page?.featureSecTitle4?.value || 'Missing: feature_sec_title4',
      description: page?.featureCardPara4?.value || 'Missing: feature_card_para4',
      image: page?.featureCardImg4?.reference?.image?.url || '',
      icon: icons[3],
    },
    {
      id: 'feature-4',
      title: page?.featureSecTitle5?.value || 'Missing: feature_sec_title5',
      description: page?.featureCardPara5?.value || 'Missing: feature_card_para5',
      image: page?.featureCardImg5?.reference?.image?.url || '',
      icon: icons[4],
    },
    {
      id: 'feature-5',
      title: page?.featureSecTitle6?.value || 'Missing: feature_sec_title6',
      description: page?.featureCardPara6?.value || 'Missing: feature_card_para6',
      image: page?.featureCardImg6?.reference?.image?.url || '',
      icon: icons[5],
    },
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1a1a1a] mt-4">
              {sectionTitle}
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative group">
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-6 px-4 shrink-0"
            animate={{ x: [0, -curatedCategories.length * 344] }}
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
