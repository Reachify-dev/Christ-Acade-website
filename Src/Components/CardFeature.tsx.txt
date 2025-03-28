
import { useEffect, useRef, useState } from 'react';

interface CardFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  className?: string;
}

const CardFeature = ({ 
  icon, 
  title, 
  description, 
  delay = 0,
  className = '' 
}: CardFeatureProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`p-6 rounded-xl glass-card hover-lift
                ${isVisible ? 'animate-scale-in' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 p-3 bg-navy-50 rounded-full text-navy-700">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3 text-navy-800">{title}</h3>
        <p className="text-navy-600">{description}</p>
      </div>
    </div>
  );
};

export default CardFeature;
