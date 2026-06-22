import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { useLoaderData } from 'react-router';
import type { Route } from './+types/($locale).pages.contact';



export const meta: Route.MetaFunction = () => {
  return [{ title: 'Gem Mine | Contact Us' }];
};

export async function loader({ context }: Route.LoaderArgs) {
  const { page } = await context.storefront.query(CONTACT_PAGE_QUERY, {
    variables: {
      handle: 'contact-page',
    },
  });

  return { page };
}

const CONTACT_PAGE_QUERY = `#graphql
  query ContactPage(
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
      heroPara: metafield(namespace: "custom", key: "page_hero_para") {
        value
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
      heroVideo: metafield(namespace: "custom", key: "page_hero_video") {
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
    }
      
  }
` as const;

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['No: 9A, St Anthonys\'s Mawatha', 'Colombo 03', 'Sri Lanka'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+94 777 483 464', '+94 112 375 196'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['sales@gemminelk.com'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Mon - Sat: 9AM - 6PM', 'Sunday: Closed'],
  },
];

const countryCodes = [
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+1', flag: '🇺🇸', name: 'USA/Canada' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
];

// Local UI Components
const Input = ({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = '', ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={`flex min-h-[150px] w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ className = '', ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#1a1a1a] mb-2 block ${className}`}
    {...props}
  />
);

export default function Contact() {
  const { page } = useLoaderData<typeof loader>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+94',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroVideoUrl =
    page?.heroVideo?.reference?.sources?.[0]?.url ||
    page?.heroVideo?.reference?.url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      countryCode: '+94',
      subject: '',
      message: '',
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f8f5f0]">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-[#1a1a1a] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <video
          key={heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={heroVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="text-amber-400 tracking-[0.3em] uppercase text-sm font-medium">
              {page?.heroTag?.value}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white mt-4 leading-tight">
              {page?.heroTitle?.value}
            </h1>
            {page?.heroPara?.value && (
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mt-4 font-light tracking-wide">
                {page.heroPara.value}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
                {page.firstContentTag?.value}
              </span>
              <h2 className="text-4xl font-serif text-[#1a1a1a] mt-4 leading-tight">
                {page.firstContentTitle?.value}
              </h2>
              <p className="text-gray-600 mt-6 leading-relaxed text-lg font-light">
                {page.firstContentPara?.value && <p className="whitespace-pre-line">{page.firstContentPara.value}</p>}
              </p>

              <div className="mt-12 space-y-8">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <info.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#1a1a1a] mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-500 text-sm leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#1a1a1a]">
                    Send Us a Message
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) =>
                            setFormData({ ...formData, countryCode: e.target.value })
                          }
                          className="w-[110px] h-12 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                        >
                          {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.flag} {country.code}
                            </option>
                          ))}
                        </select>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex-1"
                          placeholder="77 000 0000"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1e2a47] hover:bg-[#2d3e6a] text-white h-14 rounded-full text-lg font-medium transition-all shadow-lg shadow-[#1e2a47]/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map Section - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 w-full"
          >
            <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden bg-gray-200 w-full shadow-2xl border border-white/50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.81938928828!2d79.85167!3d6.9147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2594191d4e0e1%3A0x6b8765f0e97214e2!2sTraditional%20Gem%20Mine!5e0!3m2!1sen!2slk!4v1709543166847!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Traditional Gem Mine Location"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
