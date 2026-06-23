import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { NavLink, Await } from 'react-router';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { FooterQuery, HeaderQuery } from 'storefrontapi.generated';
import logo from '~/assets/img/logo.png';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

const InstagramIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Suspense fallback={null}>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-[#1e2a47] text-white border-t border-[#2d3e6a]">
            <div className="w-full px-6 md:px-12 lg:px-24 py-16">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                  <NavLink to="/" className="inline-block mb-4">
                    <img src={logo} alt="Gem Mine" className="h-28 w-auto" />
                  </NavLink>
                  <p className="text-white text-sm leading-relaxed mb-6">
                    Crafting timeless elegance with every piece.
                  </p>
                  <div className="flex space-x-3">
                    {[
                      InstagramIcon,
                      FacebookIcon,
                      TwitterIcon,
                      YoutubeIcon,
                    ].map((Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ y: -3 }}
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d4a89a] hover:border-[#d4a89a] transition-all"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                    Quick Links
                  </h4>
                  <ul className="space-y-2">
                    {['Collections', 'Blog', 'About', 'Contact'].map((link) => (
                      <li key={link}>
                        <NavLink
                          to={
                            link === 'Collections'
                              ? '/collections/all'
                              : link === 'Blog'
                                ? '/blogs'
                                : `/pages/${link.toLowerCase()}`
                          }
                          className="text-white hover:text-[#d4a89a] transition-colors text-sm capitalize font-medium"
                        >
                          {link}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <NavLink
                        to="/collections/all"
                        className="text-white hover:text-amber-400 transition-colors text-sm font-medium"
                      >
                        High Jewellery
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider mb-4">
                    Categories
                  </h4>
                  <ul className="space-y-2">
                    {[
                      'Rings',
                      'Necklaces',
                      'Earrings',
                      'Bracelets',
                      'Bridal',
                    ].map((category) => (
                      <li key={category}>
                        <NavLink
                          to={`/collections/all?category=${category.toLowerCase()}`}
                          className="text-white hover:text-[#d4a89a] transition-colors text-sm font-medium"
                        >
                          {category}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Us */}
                <div>
                  <h4 className="text-sm font-medium uppercase tracking-wider mb-4 text-white">
                    Contact Us
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      {MapPin ? <MapPin className="w-4 h-4 text-[#d4a89a] mt-0.5 flex-shrink-0" /> : <div className="w-4 h-4 bg-[#d4a89a] rounded-full mt-0.5" />}
                      <span className="text-white text-sm">
                        No: 9A, St Anthonys's Mawatha, Colombo 03, Sri Lanka
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      {Phone ? <Phone className="w-4 h-4 text-[#d4a89a] flex-shrink-0" /> : <div className="w-4 h-4 bg-[#d4a89a] rounded-full" />}
                      <span className="text-white text-sm">
                        +94 777 483 464
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      {Mail ? <Mail className="w-4 h-4 text-[#d4a89a] flex-shrink-0" /> : <div className="w-4 h-4 bg-[#d4a89a] rounded-full" />}
                      <span className="text-white text-sm">
                        sales@gemminelk.com
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                <p className="text-white/60 text-sm">
                  © {currentYear} Gem Mine. All rights reserved.
                </p>
                <div className="flex items-center gap-6 mt-4 md:mt-0">
                  <NavLink
                    to="/policies/privacy-policy"
                    className="text-white hover:text-amber-400 text-sm transition-colors font-medium"
                  >
                    Privacy Policy
                  </NavLink>
                  <NavLink
                    to="/policies/terms-of-service"
                    className="text-white hover:text-amber-400 text-sm transition-colors font-medium"
                  >
                    Terms of Service
                  </NavLink>
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}
