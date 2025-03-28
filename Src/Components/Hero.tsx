
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  height?: 'full' | 'large' | 'medium' | 'small';
  overlay?: 'none' | 'light' | 'medium' | 'dark';
  showButtons?: boolean;
  alignment?: 'left' | 'center';
  children?: React.ReactNode;
}

const Hero = ({
  title,
  subtitle,
  imageSrc = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2940&auto=format',
  height = 'large',
  overlay = 'medium',
  showButtons = true,
  alignment = 'center',
  children
}: HeroProps) => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => setLoaded(true);
    
    // Set loaded to true after timeout even if image fails
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, [imageSrc]);
  
  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[85vh]',
    medium: 'min-h-[70vh]',
    small: 'min-h-[40vh]',
  };
  
  const overlayClasses = {
    none: '',
    light: 'bg-gradient-to-r from-black/40 to-black/30',
    medium: 'bg-gradient-to-r from-black/60 to-black/50',
    dark: 'bg-gradient-to-r from-black/80 to-black/70',
  };
  
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
  };

  return (
    <div 
      className={`relative flex items-center justify-center w-full ${heightClasses[height]} overflow-hidden`}
    >
      {/* Background Image with animation */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ${loaded ? 'scale-105' : 'scale-100'}`}
        style={{ 
          backgroundImage: `url(${imageSrc})`,
          transform: loaded ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 10s ease-out'
        }}
      >
        {/* Overlay */}
        <div className={`absolute inset-0 ${overlayClasses[overlay]}`}></div>
      </div>
      
      {/* Content */}
      <div className={`container relative z-10 mx-auto px-4 pt-24 pb-12 flex flex-col ${alignmentClasses[alignment]}`}>
        <h1 
          className={`text-white font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 max-w-4xl
                     ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        >
          {title}
        </h1>
        
        {subtitle && (
          <p 
            className={`text-white/90 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed
                      ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.5s' }}
          >
            {subtitle}
          </p>
        )}
        
        {children}
        
        {showButtons && (
          <div 
            className={`flex flex-wrap gap-4 mt-2 ${alignment === 'center' ? 'justify-center' : ''} 
                      ${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.7s' }}
          >
            <Link 
              to="/admissions" 
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold rounded-md 
                       transition-all duration-300 shadow-lg hover:shadow-xl button-shine"
            >
              Apply Now
            </Link>
            <Link 
              to="/about" 
              className="px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20 
                       font-semibold rounded-md transition-all duration-300 flex items-center"
            >
              Discover More <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
