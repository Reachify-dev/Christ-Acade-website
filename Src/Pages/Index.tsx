
import { useEffect, useRef, useState } from 'react';
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import CardFeature from "@/components/CardFeature";
import NewsCard from "@/components/NewsCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTAButton from "@/components/CTAButton";
import { BookOpen, Trophy, Users, Calendar, GraduationCap, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [animateCounter, setAnimateCounter] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // For counting animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimateCounter(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Mock news data
  const newsItems = [
    {
      id: 1,
      title: "Annual Science Fair Showcases Student Innovation",
      date: "2023-10-15",
      excerpt: "Students from grades 7-12 presented their original research projects at our annual Science Fair, demonstrating exceptional creativity and scientific thinking.",
      image: "https://images.unsplash.com/photo-1564894809611-1742fc40ed80?q=80&w=1974&auto=format",
      slug: "science-fair-2023",
      category: "Events"
    },
    {
      id: 2,
      title: "Christ Acade Basketball Team Wins Regional Championship",
      date: "2023-09-22",
      excerpt: "Our varsity basketball team secured the regional championship title after an intense final game against Springfield Academy with a score of 78-72.",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=2071&auto=format",
      slug: "basketball-championship",
      category: "Sports"
    },
    {
      id: 3,
      title: "New STEM Innovation Lab Opening Next Semester",
      date: "2023-11-05",
      excerpt: "We're excited to announce the opening of our new state-of-the-art STEM Innovation Lab, equipped with 3D printers, robotics equipment, and more.",
      image: "https://images.unsplash.com/photo-1640158615573-cd28feb28bd7?q=80&w=2070&auto=format",
      slug: "stem-lab-opening",
      category: "Announcements"
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero 
        title="Nurturing Excellence, Building Character, Inspiring Futures"
        subtitle="Christ Acade Group of School provides a holistic education that prepares students for academic achievement and lifelong success in a supportive, values-based environment."
        imageSrc="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2940&auto=format"
      />
      
      {/* Mission Section */}
      <MissionSection />
      
      {/* Key Programs */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 animate-fade-in text-navy-800">
              Academic Excellence & Opportunities
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-navy-700 animate-fade-in">
              Our comprehensive programs provide students with the foundation and skills they need to excel in their academic and personal pursuits.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <CardFeature 
              icon={<GraduationCap className="h-8 w-8" />}
              title="Rigorous Academics"
              description="Comprehensive curriculum designed to challenge students and foster critical thinking skills."
              delay={0.1}
            />
            <CardFeature 
              icon={<BookOpen className="h-8 w-8" />}
              title="STEM Focus"
              description="Advanced science, technology, engineering, and mathematics programs with hands-on learning."
              delay={0.2}
            />
            <CardFeature 
              icon={<Trophy className="h-8 w-8" />}
              title="Arts & Athletics"
              description="Diverse extracurricular programs that develop creativity, teamwork, and leadership."
              delay={0.3}
            />
            <CardFeature 
              icon={<Users className="h-8 w-8" />}
              title="Character Education"
              description="Values-based approach that nurtures integrity, respect, and social responsibility."
              delay={0.4}
            />
            <CardFeature 
              icon={<Building className="h-8 w-8" />}
              title="Modern Facilities"
              description="State-of-the-art classrooms, laboratories, libraries, and sports facilities."
              delay={0.5}
            />
            <CardFeature 
              icon={<Calendar className="h-8 w-8" />}
              title="Global Perspective"
              description="Cultural exchange programs and curriculum that prepares students for an interconnected world."
              delay={0.6}
            />
          </div>
          
          <div className="text-center mt-12">
            <CTAButton 
              text="Explore Our Programs" 
              href="/academics" 
              variant="secondary"
              size="lg"
            />
          </div>
        </div>
      </section>
      
      {/* Stats Counter */}
      <section 
        ref={statsRef}
        className="py-16 bg-navy-800 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?q=80&w=2787&auto=format)' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">
                {animateCounter ? (
                  <CountUp end={25} duration={2} />
                ) : (
                  '0'
                )}
              </div>
              <p className="text-white/90">Years of Excellence</p>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">
                {animateCounter ? (
                  <CountUp end={150} duration={2} />
                ) : (
                  '0'
                )}+
              </div>
              <p className="text-white/90">Dedicated Faculty</p>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">
                {animateCounter ? (
                  <CountUp end={2500} duration={2} />
                ) : (
                  '0'
                )}+
              </div>
              <p className="text-white/90">Students Enrolled</p>
            </div>
            <div className="p-4">
              <div className="text-4xl md:text-5xl font-bold text-gold-500 mb-2">
                {animateCounter ? (
                  <CountUp end={98} duration={2} />
                ) : (
                  '0'
                )}%
              </div>
              <p className="text-white/90">College Acceptance</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-navy-800">
                Latest News & Events
              </h2>
              <div className="w-20 h-1 bg-gold-500 mb-6"></div>
            </div>
            <Link 
              to="/news" 
              className="text-navy-700 font-medium hover:text-navy-500 transition-colors"
            >
              View All News
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newsItems.map((item, index) => (
              <NewsCard 
                key={item.id}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                image={item.image}
                slug={item.slug}
                category={item.category}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-navy-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-navy-800">
              What Our Community Says
            </h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-lg text-navy-700">
              Hear from our students, parents, and alumni about their experiences at Christ Acade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard 
              quote="Christ Acade has provided my children with an exceptional education that balances academic rigor with character development. The dedicated teachers truly care about each student's success."
              author="Sarah Johnson"
              role="Parent of two Christ Acade students"
              delay={0.1}
            />
            <TestimonialCard 
              quote="As an alumnus, I can confidently say that my years at Christ Acade prepared me well for college and beyond. The critical thinking skills and values I developed here have been invaluable."
              author="Michael Chen"
              role="Class of 2018, now at Stanford University"
              delay={0.2}
            />
            <TestimonialCard 
              quote="The supportive community at Christ Acade has helped my daughter flourish academically and socially. The teachers go above and beyond to ensure every student reaches their potential."
              author="Rebecca Martinez"
              role="Parent of a 10th grader"
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-navy-800 text-white relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format)' }}></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 animate-fade-in">
            Begin Your Christ Acade Journey Today
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 animate-fade-in">
            Take the first step toward providing your child with an exceptional education that will prepare them for future success.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
            <CTAButton 
              text="Apply for Admission" 
              href="/admissions" 
              variant="primary"
              size="lg"
            />
            <CTAButton 
              text="Schedule a Visit" 
              href="/contact" 
              variant="outline"
              size="lg"
              className="text-white border-white hover:bg-white/10"
            />
          </div>
        </div>
      </section>
    </>
  );
};

// Counter component for animations
const CountUp = ({ end, duration }: { end: number, duration: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <>{count}</>;
};

export default Index;
