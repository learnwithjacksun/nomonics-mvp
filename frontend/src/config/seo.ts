export const SEO_CONFIG = {
  // Default SEO settings
  default: {
    title: 'Nomomics - Bridging Culture Through African Comics',
    description: 'Discover authentic African storytelling through digital comics. Nomomics brings you diverse African narratives, cultures, and art in an immersive digital platform.',
    keywords: 'African comics, digital comics, African storytelling, African culture, comic books, African art, online comics, African literature, digital reading, African narratives, comic platform, African creators',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com',
    type: 'website' as const,
  },

  // Home page
  home: {
    title: 'Nomomics - Bridging Culture Through African Comics | Digital Comics Platform',
    description: 'Discover authentic African storytelling through digital comics. Nomomics brings you diverse African narratives, cultures, and art in an immersive digital platform. Read African comics online.',
    keywords: 'African comics, digital comics, African storytelling, African culture, comic books, African art, online comics, African literature, digital reading, African narratives, comic platform, African creators, African stories',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com',
    type: 'website' as const,
  },

  // Comics page
  comics: {
    title: 'African Comics Collection | Nomomics',
    description: 'Explore our collection of authentic African comics. From traditional folklore to modern narratives, discover stories that celebrate African culture, history, and creativity.',
    keywords: 'African comics collection, African comic books, African stories, African folklore, African mythology, African literature, digital comics, online reading',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com/comics',
    type: 'website' as const,
  },

  // About page
  about: {
    title: 'About Nomomics | Bridging Culture Through African Comics',
    description: 'Learn about Nomomics mission to bridge cultures through African comics. Discover our story, values, and commitment to promoting authentic African storytelling.',
    keywords: 'about Nomomics, African comics platform, African storytelling mission, African culture promotion, digital comics platform, African creators support',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com/about',
    type: 'website' as const,
  },

  // Contact page
  contact: {
    title: 'Contact Nomomics | Get in Touch',
    description: 'Get in touch with the Nomomics team. We welcome feedback, collaboration opportunities, and questions about African comics and digital storytelling.',
    keywords: 'contact Nomomics, African comics support, digital comics help, collaboration opportunities, feedback, customer support',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com/contact',
    type: 'website' as const,
  },

  // Privacy Policy
  privacy: {
    title: 'Privacy Policy | Nomomics',
    description: 'Read Nomomics privacy policy to understand how we collect, use, and protect your personal information when using our African comics platform.',
    keywords: 'privacy policy, data protection, personal information, user privacy, African comics platform privacy',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com/privacy-policy',
    type: 'website' as const,
  },

  // Terms of Service
  terms: {
    title: 'Terms of Service | Nomomics',
    description: 'Read Nomomics terms of service to understand the rules and guidelines for using our African comics platform and digital content.',
    keywords: 'terms of service, user agreement, platform rules, digital comics terms, African comics guidelines',
    image: 'https://nomonics.com/banner.png',
    url: 'https://nomonics.com/terms-of-service',
    type: 'website' as const,
  },

  // Individual comic pages
  comic: (title: string, author: string, description: string) => ({
    title: `${title} by ${author} | Nomomics`,
    description: description || `Read "${title}" by ${author} on Nomomics. Experience authentic African storytelling through this digital comic.`,
    keywords: `${title}, ${author}, African comic, digital comic, African storytelling, African literature, online reading`,
    image: 'https://nomonics.com/banner.png',
    url: `https://nomonics.com/comics/${title.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'book' as const,
    author,
    tags: [title, author, 'African comic', 'digital comic', 'African storytelling'],
  }),

  // Search results
  search: (query: string) => ({
    title: `Search Results for "${query}" | Nomomics`,
    description: `Find African comics related to "${query}" on Nomomics. Discover authentic African storytelling and digital comics.`,
    keywords: `${query}, African comics search, African storytelling search, digital comics search, African literature search`,
    image: 'https://nomonics.com/banner.png',
    url: `https://nomonics.com/search?q=${encodeURIComponent(query)}`,
    type: 'website' as const,
  }),

  // Category pages
  category: (category: string) => ({
    title: `${category} African Comics | Nomomics`,
    description: `Explore ${category} African comics on Nomomics. Discover authentic African storytelling in the ${category} genre.`,
    keywords: `${category} African comics, ${category} African stories, African ${category} literature, digital ${category} comics`,
    image: 'https://nomonics.com/banner.png',
    url: `https://nomonics.com/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    type: 'website' as const,
  }),
};

// Social media sharing configuration
export const SOCIAL_CONFIG = {
  twitter: {
    handle: '@nomonics',
    site: '@nomonics',
  },
  facebook: {
    appId: '', // Add your Facebook App ID if you have one
  },
};

// Organization structured data
export const ORGANIZATION_DATA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nomomics",
  "alternateName": "Nomomics Digital Comics",
  "url": "https://nomonics.com",
  "logo": "https://nomonics.com/logo.svg",
  "description": "Bridging culture through African comics. Discover, read, and enjoy authentic African storytelling through digital comics.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/nomonics",
    "https://facebook.com/nomonics",
    "https://instagram.com/nomonics"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@nomonics.com"
  }
};

// Website structured data
export const WEBSITE_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Nomomics",
  "alternateName": "Nomomics Digital Comics",
  "url": "https://nomonics.com",
  "description": "Bridging culture through African comics. Discover, read, and enjoy authentic African storytelling through digital comics.",
  "publisher": {
    "@type": "Organization",
    "name": "Nomomics",
    "logo": {
      "@type": "ImageObject",
      "url": "https://nomonics.com/logo.svg"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://nomonics.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
