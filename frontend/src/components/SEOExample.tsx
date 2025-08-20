import React from 'react';
import SEO from './SEO';
import { useSEO, useComicSEO, useSearchSEO } from '../hooks/useSEO';

// Example 1: Home Page with SEO Component
export const HomePage: React.FC = () => {
  return (
    <>
      <SEO 
        title="Nomomics - Bridging Culture Through African Comics"
        description="Discover authentic African storytelling through digital comics. Nomomics brings you diverse African narratives, cultures, and art in an immersive digital platform."
        keywords="African comics, digital comics, African storytelling, African culture, comic books, African art, online comics"
        type="website"
      />
      <div>
        <h1>Welcome to Nomomics</h1>
        <p>Bridging culture through African comics</p>
        {/* Your home page content */}
      </div>
    </>
  );
};

// Example 2: Comics Page with useSEO Hook
export const ComicsPage: React.FC = () => {
  useSEO({ page: 'comics' });
  
  return (
    <div>
      <h1>African Comics Collection</h1>
      <p>Explore our collection of authentic African comics</p>
      {/* Your comics page content */}
    </div>
  );
};

// Example 3: Individual Comic Page with useComicSEO Hook
export const ComicPage: React.FC<{ title: string; author: string; description?: string }> = ({ 
  title, 
  author, 
  description 
}) => {
  useComicSEO(title, author, description);
  
  return (
    <div>
      <h1>{title}</h1>
      <p>By {author}</p>
      {description && <p>{description}</p>}
      {/* Your comic page content */}
    </div>
  );
};

// Example 4: Search Results Page with useSearchSEO Hook
export const SearchResultsPage: React.FC<{ query: string }> = ({ query }) => {
  useSearchSEO(query);
  
  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      {/* Your search results content */}
    </div>
  );
};

// Example 5: About Page with SEO Component
export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO 
        title="About Nomomics | Bridging Culture Through African Comics"
        description="Learn about Nomomics mission to bridge cultures through African comics. Discover our story, values, and commitment to promoting authentic African storytelling."
        keywords="about Nomomics, African comics platform, African storytelling mission, African culture promotion"
        type="website"
      />
      <div>
        <h1>About Nomomics</h1>
        <p>Our mission is to bridge cultures through African comics</p>
        {/* Your about page content */}
      </div>
    </>
  );
};

// Example 6: Contact Page with useSEO Hook
export const ContactPage: React.FC = () => {
  useSEO({ page: 'contact' });
  
  return (
    <div>
      <h1>Contact Us</h1>
      <p>Get in touch with the Nomomics team</p>
      {/* Your contact page content */}
    </div>
  );
};

// Example 7: Advanced SEO with Custom Tags
export const AdvancedComicPage: React.FC<{ 
  title: string; 
  author: string; 
  description: string;
  publishedDate: string;
  tags: string[];
}> = ({ title, author, description, publishedDate, tags }) => {
  return (
    <>
      <SEO 
        title={`${title} by ${author} | Nomomics`}
        description={description}
        type="book"
        author={author}
        publishedTime={publishedDate}
        tags={tags}
        image={`https://nomonics.com/comics/${title.toLowerCase().replace(/\s+/g, '-')}.jpg`}
      />
      <div>
        <h1>{title}</h1>
        <p>By {author}</p>
        <p>Published: {publishedDate}</p>
        <div>
          {tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        {/* Your advanced comic page content */}
      </div>
    </>
  );
};

// Example 8: Category Page with SEO Component
export const CategoryPage: React.FC<{ category: string }> = ({ category }) => {
  return (
    <>
      <SEO 
        title={`${category} African Comics | Nomomics`}
        description={`Explore ${category} African comics on Nomomics. Discover authentic African storytelling in the ${category} genre.`}
        keywords={`${category} African comics, ${category} African stories, African ${category} literature`}
        type="website"
        url={`https://nomonics.com/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <div>
        <h1>{category} African Comics</h1>
        <p>Discover authentic African storytelling in the {category} genre</p>
        {/* Your category page content */}
      </div>
    </>
  );
};

export default {
  HomePage,
  ComicsPage,
  ComicPage,
  SearchResultsPage,
  AboutPage,
  ContactPage,
  AdvancedComicPage,
  CategoryPage
};
