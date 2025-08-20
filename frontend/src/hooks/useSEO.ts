import { useEffect } from 'react';
import { SEO_CONFIG } from '../config/seo';

type SEOKey = keyof typeof SEO_CONFIG;


interface UseSEOOptions {
  page?: SEOKey;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'book';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

export const useSEO = (options: UseSEOOptions = {}) => {
  const {
    page,
    title,
    description,
    keywords,
    image,
    url,
    type,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = []
  } = options;

  useEffect(() => {
    let seoData;

    // If a specific page is provided, use its configuration
    if (page && page in SEO_CONFIG) {
      const pageConfig = SEO_CONFIG[page];
      
      // Handle function-based configurations
      if (typeof pageConfig === 'function') {
        // This would need to be handled differently based on the function type
        // For now, we'll use default values
        seoData = SEO_CONFIG.default;
      } else {
        seoData = pageConfig;
      }
    } else {
      // Use default configuration
      seoData = SEO_CONFIG.default;
    }

    // Override with provided options
    const finalSEO = {
      ...seoData,
      ...(title && { title }),
      ...(description && { description }),
      ...(keywords && { keywords }),
      ...(image && { image }),
      ...(url && { url }),
      ...(type && { type }),
      ...(author && { author }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    };

    // Update document title
    document.title = finalSEO.title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update primary meta tags
    updateMetaTag('description', finalSEO.description);
    updateMetaTag('keywords', finalSEO.keywords);
    updateMetaTag('author', finalSEO.author || 'Nomomics');

    // Update Open Graph tags
    updatePropertyTag('og:title', finalSEO.title);
    updatePropertyTag('og:description', finalSEO.description);
    updatePropertyTag('og:image', finalSEO.image);
    updatePropertyTag('og:url', finalSEO.url);
    updatePropertyTag('og:type', finalSEO.type);

    // Update Twitter tags
    updatePropertyTag('twitter:title', finalSEO.title);
    updatePropertyTag('twitter:description', finalSEO.description);
    updatePropertyTag('twitter:image', finalSEO.image);
    updatePropertyTag('twitter:url', finalSEO.url);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = finalSEO.url;

  }, [page, title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags]);

  // Return SEO data for use in components
  return {
    title: title || (page && page in SEO_CONFIG && typeof SEO_CONFIG[page] !== 'function' ? SEO_CONFIG[page].title : SEO_CONFIG.default.title),
    description: description || (page && page in SEO_CONFIG && typeof SEO_CONFIG[page] !== 'function' ? SEO_CONFIG[page].description : SEO_CONFIG.default.description),
    keywords: keywords || (page && page in SEO_CONFIG && typeof SEO_CONFIG[page] !== 'function' ? SEO_CONFIG[page].keywords : SEO_CONFIG.default.keywords),
    image: image || (page && page in SEO_CONFIG && typeof SEO_CONFIG[page] !== 'function' ? SEO_CONFIG[page].image : SEO_CONFIG.default.image),
    url: url || (page && page in SEO_CONFIG && typeof SEO_CONFIG[page] !== 'function' ? SEO_CONFIG[page].url : SEO_CONFIG.default.url),
    type: type || (page && page in SEO_CONFIG && typeof SEO_CONFIG[page] !== 'function' ? SEO_CONFIG[page].type : SEO_CONFIG.default.type),
  };
};

// Helper functions for specific use cases
export const useComicSEO = (title: string, author: string, description?: string) => {
  return useSEO({
    title: `${title} by ${author} | Nomomics`,
    description: description || `Read "${title}" by ${author} on Nomomics. Experience authentic African storytelling through this digital comic.`,
    keywords: `${title}, ${author}, African comic, digital comic, African storytelling, African literature, online reading`,
    type: 'book',
    author,
    tags: [title, author, 'African comic', 'digital comic', 'African storytelling'],
  });
};

export const useSearchSEO = (query: string) => {
  return useSEO({
    title: `Search Results for "${query}" | Nomomics`,
    description: `Find African comics related to "${query}" on Nomomics. Discover authentic African storytelling and digital comics.`,
    keywords: `${query}, African comics search, African storytelling search, digital comics search, African literature search`,
  });
};

export const useCategorySEO = (category: string) => {
  return useSEO({
    title: `${category} African Comics | Nomomics`,
    description: `Explore ${category} African comics on Nomomics. Discover authentic African storytelling in the ${category} genre.`,
    keywords: `${category} African comics, ${category} African stories, African ${category} literature, digital ${category} comics`,
  });
};
