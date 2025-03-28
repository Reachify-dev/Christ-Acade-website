
import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
  delay?: number;
}

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  image,
  delay = 0 
}: TestimonialCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const initials = author
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <div 
      className={`p-6 rounded-xl bg-white shadow-md border border-gray-100 transition-all duration-500 
                ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Quote icon */}
      <Quote className="h-8 w-8 text-gold-500 mb-4 opacity-80" />
      
      {/* Testimonial text */}
      <blockquote className="text-navy-700 mb-6 italic">
        "{quote}"
      </blockquote>
      
      {/* Author info */}
      <div className="flex items-center">
        {image ? (
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover border-2 border-navy-100"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center font-medium">
            {initials}
          </div>
        )}
        <div className="ml-3">
          <cite className="text-navy-800 font-semibold not-italic">{author}</cite>
          <p className="text-navy-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
