
import { useState, useRef, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

const MissionSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const coreValues = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in all academic and extra-curricular pursuits."
    },
    {
      title: "Integrity",
      description: "Maintaining honesty and strong moral principles in all situations."
    },
    {
      title: "Respect",
      description: "Showing consideration for all individuals, cultures, and beliefs."
    },
    {
      title: "Innovation",
      description: "Embracing creative approaches to teaching and learning."
    },
    {
      title: "Collaboration",
      description: "Working together to achieve common goals and foster community."
    },
    {
      title: "Compassion",
      description: "Demonstrating empathy and care for others' well-being."
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative diagonal lines background */}
      <div className="absolute inset-0 opacity-10 diamond-pattern"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 text-navy-800 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            Our Mission & Values
          </h2>
          <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className={`text-lg text-navy-700 leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Christ Acade Group of School is dedicated to providing an exceptional education that nurtures intellectual curiosity, builds character, and inspires a lifelong love of learning in a supportive and inclusive community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coreValues.map((value, index) => (
            <div 
              key={value.title}
              className={`bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-500 hover-lift
                        ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <div className="flex items-start mb-4">
                <CheckCircle className="text-gold-500 mr-3 h-6 w-6 flex-shrink-0" />
                <h3 className="text-xl font-semibold text-navy-800">{value.title}</h3>
              </div>
              <p className="text-navy-600 ml-9">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
