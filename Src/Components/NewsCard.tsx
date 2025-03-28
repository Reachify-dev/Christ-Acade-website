
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  slug: string;
  category?: string;
  delay?: number;
}

const NewsCard = ({ 
  title, 
  date, 
  excerpt, 
  image, 
  slug,
  category = "News", 
  delay = 0 
}: NewsCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
    
    // Fallback in case image doesn't load
    const timer = setTimeout(() => setImageLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, [image]);

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <article 
      className={`group overflow-hidden rounded-xl shadow-md border border-gray-100 bg-white transition-all hover-lift 
                ${imageLoaded ? 'animate-fade-in-up' : 'opacity-0'}`} 
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Image */}
      <Link to={`/news/${slug}`} className="block relative overflow-hidden h-48">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-navy-700 text-white rounded-full">
            {category}
          </span>
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5">
        <div className="flex items-center mb-2 text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          <time dateTime={date}>{formattedDate}</time>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 text-navy-800 line-clamp-2">
          <Link to={`/news/${slug}`} className="hover:text-navy-600 transition-colors">
            {title}
          </Link>
        </h3>
        
        <p className="text-navy-600 mb-4 line-clamp-3">{excerpt}</p>
        
        <Link 
          to={`/news/${slug}`} 
          className="inline-flex items-center text-gold-600 font-medium group"
        >
          Read More 
          <ArrowRight 
            size={16} 
            className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
