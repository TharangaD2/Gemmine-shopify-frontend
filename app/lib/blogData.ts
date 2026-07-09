import clean from '~/assets/img/clean.jpeg';
import ringSize from '~/assets/img/ringSize.jpg';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  author: string;
  comments: number;
  image: string;
  excerpt: string;
  content: string[];
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'tips-for-buying-gemstones-online',
    title: 'Tips for Buying Gemstones Online',
    date: '19-10-2013',
    author: 'bennu',
    comments: 0,
    image: clean,
    excerpt:
      'Essential guide to navigating the digital gemstone market with confidence and security.',
    category: 'Guide',
    content: [
      'Watch out for stock photographs - ask for real images of the specific stone.',
      'Use a website of an actual store with a physical presence.',
      "Choose a website that has an inspection period and a clear return policy.",
      "Verify the website's contact information and customer support.",
      'Look for detailed quality protocols and stone certifications.',
      'Purchase from accredited businesses like GIA certified members.',
    ],
  },
  {
    id: 2,
    slug: 'how-to-clean-jewelry',
    title: 'How To Clean Jewelry',
    date: '23-04-2012',
    author: 'GemMine Staff',
    comments: 0,
    image: clean,
    excerpt:
      'Simple tips to maintain the sparkle and shine of your favorite jewelry pieces.',
    category: 'maintenance',
    content: [
      'Over time the natural oils from your skin, air born contaminants, moisture and corrosion will tarnish the shine and luster of your jewelry.',
      'Use a soft-bristled toothbrush and lukewarm soapy water for most metals.',
      'Avoid harsh chemicals or ultrasonic cleaners for porous stones like pearls and opals.',
      'Dry your jewelry thoroughly with a soft, lint-free cloth after cleaning.',
      'Store each piece separately to prevent scratching.',
      'Regular maintenance can drastically improve the condition of your favorite pieces.',
    ],
  },
  {
    id: 3,
    slug: 'how-to-determine-your-ring-size',
    title: 'How To Determine Your Ring Size',
    date: '23-04-2012',
    author: 'Admin',
    comments: 0,
    image: ringSize,
    excerpt:
      'An easy way to find your perfect fit when shopping for yourself or a loved one.',
    category: 'Shopping',
    content: [
      'If you are looking to purchase a ring for yourself or as a gift and you are uncertain of the ring size you need then just follow this simple guide.',
      "Measure your finger at the end of the day when it's largest.",
      'Use a piece of string or paper around the base of your finger.',
      'Mark the point where the ends meet and measure the length in millimeters.',
      'Compare your measurement to our standard ring size chart.',
      "When in doubt, it's usually better to go one size up for comfort.",
    ],
  },
];
