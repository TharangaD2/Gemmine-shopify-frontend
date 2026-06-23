import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Diamond, Award, Users, Globe, ArrowRight } from 'lucide-react';
import { Link, useLoaderData, type MetaFunction } from 'react-router';
import type { Route } from './+types/($locale).pages.about';


export const meta: Route.MetaFunction = () => {
  return [{ title: 'Gem Mine | Our Story & Heritage' }];
};

export async function loader({ context }: Route.LoaderArgs) {
  const { page } = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: 'about-page',
    },
  });

  return { page };
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      heroTitle: metafield(namespace: "custom", key: "page_hero_title") {
        value
      }
      heroTag: metafield(namespace: "custom", key: "page_hero_tag") {
        value
      }
      heroVedio: metafield(namespace: "custom", key: "page_hero_vedio") {
        reference {
          ... on Video {
            sources {
              url
            }
          }
          ... on GenericFile {
            url
          }
        }
      }
      firstContentTitle: metafield(namespace: "custom", key: "first_content_title") {
        value
      }
      firstContentPara: metafield(namespace: "custom", key: "first_content_para") {
        value
      }
      firstContentTag: metafield(namespace: "custom", key: "first_content_tag") {
        value
      }
      firstContentVedio: metafield(namespace: "custom", key: "first_content_vedio") {
        reference {
          ... on Video {
            sources {
              url
            }
          }
          ... on GenericFile {
            url
          }
        }
      }
      firstContentImage: metafield(namespace: "custom", key: "first_content_image") {
        reference {
          ... on MediaImage {
            image {
              url
            }
          }
        }
      } 
      secondContentTitle: metafield(namespace: "custom", key: "second_content_title") {
        value
      }
      secondContentPara: metafield(namespace: "custom", key: "second_content_para") {
        value
      }
      secondContentTag: metafield(namespace: "custom", key: "second_content_tag") {
        value
      }
      secondContentPara2: metafield(namespace: "custom", key: "second_content_para2") {
        value
      }
      secondcontentTypes: metafield(namespace: "custom", key: "second_content_types") {
        value
      }
      secondContentImage: metafield(namespace: "custom", key: "second_content_image") {
        reference { ... on MediaImage { image { url } } }
      }
      thirdContentTag: metafield(namespace: "custom", key: "third_content_tag") { value }
      thirdContentTitle: metafield(namespace: "custom", key: "third_content_title") { value }
      thirdContentFirstCardTitle: metafield(namespace: "custom", key: "third_content_first_card_title") { value }
      thirdContentSecondCardTitle: metafield(namespace: "custom", key: "third_content_second_card_title") { value }
      thirdContentThirdCardTitle: metafield(namespace: "custom", key: "third_content_third_card_title") { value }
      thirdContentFourthCardTitle: metafield(namespace: "custom", key: "third_content_fourth_card_title") { value }
      thirdContentFirstCardPara: metafield(namespace: "custom", key: "third_content_first_card_para") { value }
      thirdContentSecondCardPara: metafield(namespace: "custom", key: "third_content_second_card_para") { value }
      thirdContentThirdCardPara: metafield(namespace: "custom", key: "third_content_third_card_para") { value }
      thirdContentFourthCardPara: metafield(namespace: "custom", key: "third_content_fourth_card_para") { value }
      fourthSectionTag: metafield(namespace: "custom", key: "fourth_section_tag") { value }
      fourthSectionTitle: metafield(namespace: "custom", key: "fourth_section_title") { value }
      historyCardTag1: metafield(namespace: "custom", key: "history_card_tag1") { value }
      historyCardTag2: metafield(namespace: "custom", key: "history_card_tag2") { value }
      historyCardTag3: metafield(namespace: "custom", key: "history_card_tag3") { value }
      historyCardTag4: metafield(namespace: "custom", key: "history_card_tag4") { value }
      historyCardTag5: metafield(namespace: "custom", key: "history_card_tag5") { value }
      historyCardTag6: metafield(namespace: "custom", key: "history_card_tag6") { value }
      historyCardTitle1: metafield(namespace: "custom", key: "history_card_title1") { value }
      historyCardTitle2: metafield(namespace: "custom", key: "history_card_title2") { value }
      historyCardTitle3: metafield(namespace: "custom", key: "history_card_title3") { value }
      historyCardTitle4: metafield(namespace: "custom", key: "history_card_title4") { value }
      historyCardTitle5: metafield(namespace: "custom", key: "history_card_title5") { value }
      historyCardTitle6: metafield(namespace: "custom", key: "history_card_title6") { value }
      historyCardPara1: metafield(namespace: "custom", key: "history_card_para1") { value }
      historyCardPara2: metafield(namespace: "custom", key: "history_card_para2") { value }
      historyCardPara3: metafield(namespace: "custom", key: "history_card_para3") { value }
      historyCardPara4: metafield(namespace: "custom", key: "history_card_para4") { value }
      historyCardPara5: metafield(namespace: "custom", key: "history_card_para5") { value }
      historyCardPara6: metafield(namespace: "custom", key: "history_card_para6") { value }
      historyCardImg1: metafield(namespace: "custom", key: "history_card_img1") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      historyCardImg2: metafield(namespace: "custom", key: "history_card_img2") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      historyCardImg3: metafield(namespace: "custom", key: "history_card_img3") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      historyCardImg4: metafield(namespace: "custom", key: "history_card_img4") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      historyCardImg5: metafield(namespace: "custom", key: "history_card_img5") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      historyCardImg6: metafield(namespace: "custom", key: "history_card_img6") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      fifthSecTag: metafield(namespace: "custom", key: "fifth_sec_tag") { value }
      fifthSecTitle: metafield(namespace: "custom", key: "fifth_sec_title") { value }
      fifthSecPara: metafield(namespace: "custom", key: "fifth_sec_para") { value }
      fifthSecCounty: metafield(namespace: "custom", key: "fifth_sec_county") { value }
      fifthSecPara2: metafield(namespace: "custom", key: "fifth_sec_para2") { value }
      aboutChooseUsTag: metafield(namespace: "custom", key: "about_choose_us_tag") { value }
      aboutChooseUsTitle: metafield(namespace: "custom", key: "about_choose_us_title") { value }
      aboutChooseUsPara: metafield(namespace: "custom", key: "about_choose_us_para") { value }
      aboutChooseUsImg: metafield(namespace: "custom", key: "about_choose_us_img") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      witnessTag: metafield(namespace: "custom", key: "witness_tag") { value }
      witnessTitle: metafield(namespace: "custom", key: "witness_title") { value }
      witnessPara: metafield(namespace: "custom", key: "witness_para") { value }
      witnessV1: metafield(namespace: "custom", key: "witness_v1") {
        reference { ... on Video { sources { url } } ... on GenericFile { url } }
      }
      witnessV1Title: metafield(namespace: "custom", key: "witness_v1_title") { value }
      witnessV1Para: metafield(namespace: "custom", key: "witness_v1_para") { value }
      witnessV2: metafield(namespace: "custom", key: "witness_v2") {
        reference { ... on Video { sources { url } } ... on GenericFile { url } }
      }
      witnessV2Title: metafield(namespace: "custom", key: "witness_v2_title") { value }
      witnessV2Para: metafield(namespace: "custom", key: "witness_v2_para") { value }
      soonSecTag: metafield(namespace: "custom", key: "soon_sec_tag") { value }
      soonSecTitle: metafield(namespace: "custom", key: "soon_sec_title") { value }
      soonSecPara: metafield(namespace: "custom", key: "soon_sec_para") { value }
      soonSecPara2: metafield(namespace: "custom", key: "soon_sec_para2") { value }
      soonSecImg: metafield(namespace: "custom", key: "soon_sec_img") {
        reference { ... on MediaImage { image { url } } ... on GenericFile { url } }
      }
      ourComTag: metafield(namespace: "custom", key: "our_com_tag") { value }
      ourComTitle: metafield(namespace: "custom", key: "our_com_title") { value }
      ourComPara: metafield(namespace: "custom", key: "our_com_para") { value }
      ourComImages: metafield(namespace: "custom", key: "our_com_images") {
        references(first: 20) {
          nodes {
            ... on MediaImage {
              image { url altText }
            }
          }
        }
      }
    }
  }
` as const;

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const storyVideoRef = useRef<HTMLVideoElement>(null);
  const { page } = useLoaderData<typeof loader>();

  const milestones = [
    {
      year: page?.historyCardTag1?.value,
      title: page?.historyCardTitle1?.value,
      description:
        page?.historyCardPara1?.value,
      image: page?.historyCardImg1?.reference?.image?.url,
    },
    {
      year: page?.historyCardTag2?.value,
      title: page?.historyCardTitle2?.value,
      description:
        page?.historyCardPara2?.value,
      image: page?.historyCardImg2?.reference?.image?.url,
    },
    {
      year: page?.historyCardTag3?.value,
      title: page?.historyCardTitle3?.value,
      description:
        page?.historyCardPara3?.value,
      image: page?.historyCardImg3?.reference?.image?.url,
    },
    {
      year: page?.historyCardTag4?.value,
      title: page?.historyCardTitle4?.value,
      description:
        page?.historyCardPara4?.value,
      image: page?.historyCardImg4?.reference?.image?.url,
    },
    {
      year: page?.historyCardTag5?.value,
      title: page?.historyCardTitle5?.value,
      description:
        page?.historyCardPara5?.value,
      image: page?.historyCardImg5?.reference?.image?.url,
    },
    {
      year: page?.historyCardTag6?.value,
      title: page?.historyCardTitle6?.value,
      description:
        page?.historyCardPara6?.value,
      image: page?.historyCardImg6?.reference?.image?.url,
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
      title: page?.thirdContentFirstCardTitle?.value,
      description:
        page?.thirdContentFirstCardPara?.value,
      icon: Diamond,
    },
    {
      title: page?.thirdContentSecondCardTitle?.value,
      description:
        page?.thirdContentSecondCardPara?.value,
      icon: Award,
    },
    {
      title: page?.thirdContentThirdCardTitle?.value,
      description:
        page?.thirdContentThirdCardPara?.value,
      icon: Users,
    },
    {
      title: page?.thirdContentFourthCardTitle?.value,
      description:
        page?.thirdContentFourthCardPara?.value,
      icon: Globe,
    },
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
    if (storyVideoRef.current) {
      storyVideoRef.current.playbackRate = 0.5;
    }
  }, []);

  const heroVedioUrl =
    page.heroVedio?.reference?.sources?.[0]?.url ||
    page.heroVedio?.reference?.url;

  const firstVideoUrl =
    page.firstContentVedio?.reference?.sources?.[0]?.url ||
    page.firstContentVedio?.reference?.url;

  const firstImageUrl =
    page?.firstContentImage?.reference?.image?.url;

  const secondImageUrl =
    page?.secondContentImage?.reference?.image?.url;

  const secondContentTypesStr = page?.secondcontentTypes?.value;
  const secondContentTypesList = secondContentTypesStr.startsWith('[')
    ? JSON.parse(secondContentTypesStr)
    : secondContentTypesStr.split(',').map((s: string) => s.trim());

  const ourComImageNodes = page?.ourComImages?.references?.nodes || [];
  const chooseUsImgUrl = page?.aboutChooseUsImg?.reference?.image?.url || page?.aboutChooseUsImg?.reference?.url;
  const soonSecImgUrl = page?.soonSecImg?.reference?.image?.url || page?.soonSecImg?.reference?.url;
  const witnessV1Url = page?.witnessV1?.reference?.sources?.[0]?.url || page?.witnessV1?.reference?.url;
  const witnessV2Url = page?.witnessV2?.reference?.sources?.[0]?.url || page?.witnessV2?.reference?.url;
  const fifthSecCountries = (() => {
    const raw = page?.fifthSecCounty?.value;
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return raw.split(',').map((s: string) => s.trim()); }
  })();

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <video
          key={heroVedioUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={heroVedioUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center z-20">
          <div className="w-full px-6 md:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
                {page.heroTag?.value}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 max-w-3xl leading-tight">
                {page.heroTitle?.value}
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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
                {page.firstContentTag?.value}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mt-4">
                {page.firstContentTitle?.value}
              </h2>
              <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
                {page.firstContentPara?.value && <p className="whitespace-pre-line">{page.firstContentPara.value}</p>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
                <video
                  key={firstVideoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={firstVideoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={firstImageUrl}
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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/3]">
                <img
                  src={secondImageUrl}
                  alt="Our Offerings"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a47]/60 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
                {page?.secondContentTag?.value}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47] mt-4 mb-8">
                {page?.secondContentTitle?.value}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg font-light">
                {page?.secondContentPara?.value && <p className="whitespace-pre-line">{page.secondContentPara.value}</p>}
                {page?.secondContentPara2?.value && <p className="bg-[#f8f5f0] p-8 rounded-3xl border-l-4 border-[#d4a89a] italic text-[#1e2a47]">
                  "{page.secondContentPara2.value}"
                </p>}
                <div className="flex flex-wrap gap-3 pt-4">
                  {secondContentTypesList.map((stone: string) => (
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#d4a89a] tracking-[0.3em] uppercase text-sm font-medium">
              {page?.thirdContentTag?.value}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
              {page?.thirdContentTitle?.value}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  y: { duration: 0.5, delay: index * 0.1 },
                  scale: { duration: 0.3 },
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-6 py-2 rounded-full bg-[#d4a89a]/10 text-[#d4a89a] text-sm font-medium mb-4 tracking-[0.2em] uppercase">
              {page?.fourthSectionTag?.value}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1e2a47]">
              {page?.fourthSectionTitle?.value}
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-[#d4a89a]/20 hidden lg:block" />

            <div className="space-y-24 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                >
                  <div
                    className={`flex-1 w-full ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                      }`}
                  >
                    <div
                      className={`relative p-8 md:p-10 rounded-[2rem] bg-[#f8f5f0] border border-[#d4a89a]/10 hover:border-[#d4a89a]/30 transition-all ${index % 2 === 0 ? 'lg:ml-auto' : ''
                        } max-w-lg shadow-sm hover:shadow-xl group z-10`}
                    >
                      {/* Decorative Corner Image */}
                      <div
                        className={`absolute w-32 h-32  md:w-40 md:h-40 opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none z-20 
                                                 ${index % 2 === 0
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#1e2a47] text-white p-12 md:p-20 rounded-[3rem] overflow-hidden relative shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <span className="text-amber-400 tracking-[0.3em] uppercase text-sm">
                {page?.fifthSecTag?.value}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white">
                {page?.fifthSecTitle?.value}
              </h2>
              <p className="text-amber-100/80 leading-relaxed mb-8 text-lg">
                {page?.fifthSecPara?.value}
              </p>
              {fifthSecCountries.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {fifthSecCountries.map((country: string) => (
                    <span
                      key={country}
                      className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/10 hover:bg-white/20 transition-colors"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              )}
              {page?.fifthSecPara2?.value && (
                <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm italic text-amber-200/70">
                    {page.fifthSecPara2.value}
                  </p>
                </div>
              )}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-amber-400 tracking-[0.3em] uppercase text-sm">
                  {page?.aboutChooseUsTag?.value}
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-white mt-4 mb-8">
                  {page?.aboutChooseUsTitle?.value}
                </h2>
                <div className="space-y-6 text-blue-100/80 text-lg leading-relaxed">
                  <p>{page?.aboutChooseUsPara?.value}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="relative"
              >
                {chooseUsImgUrl && (
                  <div className="rounded-3xl overflow-hidden glass-morphism border border-white/10 p-4 shadow-2xl bg-white/5 backdrop-blur-sm">
                    <img
                      src={chooseUsImgUrl}
                      alt="Why Choose Us"
                      className="rounded-2xl w-full h-full object-cover"
                    />
                  </div>
                )},
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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
                    { title: 'Gemology & Mining', icon: Diamond },
                    { title: 'Stone Identification & Valuation', icon: Award },
                    { title: 'Laboratory Testing & Certification', icon: Globe },
                    { title: 'Traditional & Contemporary Design', icon: Users },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm">
              {page?.ourComTag?.value}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4">
              {page?.ourComTitle?.value}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              {page?.ourComPara?.value}
            </p>
          </motion.div>

          <div className="columns-2 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {ourComImageNodes.map((node: { image?: { url: string; altText?: string } }, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.05,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="break-inside-avoid group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white"
              >
                <div className="relative overflow-hidden aspect-auto">
                  <img
                    src={node.image?.url}
                    alt={node.image?.altText || ''}
                    className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">
                {page?.soonSecTag?.value}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mt-4 mb-6">
                {page?.soonSecTitle?.value}
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                {page?.soonSecPara?.value}
              </p>
              {page?.soonSecPara2?.value && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    {page.soonSecPara2.value}
                  </p>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-square rounded-full bg-gradient-to-tr from-amber-500/20 to-transparent absolute -inset-10 blur-3xl group-hover:scale-110 transition-transform duration-700" />
              <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  src={soonSecImgUrl}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-amber-600 tracking-[0.3em] uppercase text-sm">
              {page?.witnessTag?.value}
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mt-4">
              {page?.witnessTitle?.value}
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              {page?.witnessPara?.value}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video"
            >
              <video
                src={witnessV1Url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif mb-2">{page?.witnessV1Title?.value}</h3>
                <p className="text-amber-100/80 text-sm">
                  {page?.witnessV1Para?.value}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative group rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video"
            >
              <video
                src={witnessV2Url}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 right-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-serif mb-2">{page?.witnessV2Title?.value}</h3>
                <p className="text-amber-100/80 text-sm">
                  {page?.witnessV2Para?.value}
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
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
