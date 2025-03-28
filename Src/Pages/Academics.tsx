import React from 'react';
import { Bookmark, Beaker, Music, Award, Book, Code, AtomIcon, Microscope } from 'lucide-react';
import CardFeature from '@/components/CardFeature';

const Academics = () => {
  return (
    <div className="section-container">
      <h1 className="heading-lg text-center mb-8">Academic Programs</h1>
      
      <div className="mb-16">
        <h2 className="heading-md text-center mb-6 text-navy-700">Our Curriculum</h2>
        <p className="text-navy-600 text-center max-w-3xl mx-auto mb-12">
          Christ Acade Group of Schools offers a comprehensive, balanced curriculum designed to develop 
          well-rounded individuals prepared for future success. Our academic programs emphasize critical thinking, 
          problem-solving, and creativity while maintaining high standards of excellence.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-navy-800 flex items-center">
              <Bookmark className="mr-2 text-gold-500" size={24} /> Elementary School
            </h3>
            <p className="text-navy-600 mb-4">
              Our elementary program (Grades 1-5) builds a strong foundation in core subjects while 
              nurturing curiosity and a love for learning.
            </p>
            <ul className="text-navy-600 space-y-2">
              <li>• Strong literacy and numeracy foundation</li>
              <li>• Hands-on science exploration</li>
              <li>• Art, music, and physical education</li>
              <li>• Character development</li>
              <li>• Introduction to technology</li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-navy-800 flex items-center">
              <Bookmark className="mr-2 text-gold-500" size={24} /> Middle School
            </h3>
            <p className="text-navy-600 mb-4">
              Our middle school program (Grades 6-8) helps students transition while developing 
              more advanced academic and social skills.
            </p>
            <ul className="text-navy-600 space-y-2">
              <li>• Advanced mathematics and sciences</li>
              <li>• Language arts and literature</li>
              <li>• Social studies and history</li>
              <li>• Foreign language options</li>
              <li>• Technology and digital literacy</li>
            </ul>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-navy-800 flex items-center">
              <Bookmark className="mr-2 text-gold-500" size={24} /> High School
            </h3>
            <p className="text-navy-600 mb-4">
              Our high school program (Grades 9-12) prepares students for college and career 
              success with rigorous academics and diverse opportunities.
            </p>
            <ul className="text-navy-600 space-y-2">
              <li>• College preparatory curriculum</li>
              <li>• Honors and AP course options</li>
              <li>• Career exploration opportunities</li>
              <li>• Leadership development</li>
              <li>• College admissions counseling</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="heading-md text-center mb-10 text-navy-700">Special Programs</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardFeature 
            icon={<Beaker size={28} />}
            title="STEM Focus"
            description="Advanced science, technology, engineering and math programs with hands-on projects and competitions."
            delay={0.1}
          />
          
          <CardFeature 
            icon={<Music size={28} />}
            title="Arts Program"
            description="Comprehensive visual arts, music, drama, and dance programs to nurture creativity and expression."
            delay={0.2}
          />
          
          <CardFeature 
            icon={<Award size={28} />}
            title="Honors Academy"
            description="Advanced curriculum for high-achieving students with accelerated learning opportunities."
            delay={0.3}
          />
          
          <CardFeature 
            icon={<Book size={28} />}
            title="Language Immersion"
            description="Intensive foreign language programs with cultural education and exchange opportunities."
            delay={0.4}
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="heading-md text-center mb-8 text-navy-700">Learning Facilities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-xl overflow-hidden h-64">
            <img 
              src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2886&auto=format" 
              alt="Science laboratory" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-white flex items-center">
                  <Microscope className="mr-2 text-gold-400" size={20} /> Science Laboratories
                </h3>
                <p className="text-white/90 text-sm">
                  State-of-the-art labs for biology, chemistry, and physics experiments
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden h-64">
            <img 
              src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=2944&auto=format" 
              alt="Computer lab" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-white flex items-center">
                  <Code className="mr-2 text-gold-400" size={20} /> Technology Center
                </h3>
                <p className="text-white/90 text-sm">
                  Modern computer labs with cutting-edge software and robotics equipment
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden h-64">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2290&auto=format" 
              alt="Library" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-white flex items-center">
                  <Book className="mr-2 text-gold-400" size={20} /> Library & Media Center
                </h3>
                <p className="text-white/90 text-sm">
                  Extensive collection of books, digital resources, and collaborative study spaces
                </p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden h-64">
            <img 
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2940&auto=format" 
              alt="Sports facility" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent flex items-end">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-white flex items-center">
                  <AtomIcon className="mr-2 text-gold-400" size={20} /> Athletic Facilities
                </h3>
                <p className="text-white/90 text-sm">
                  Indoor and outdoor athletic facilities including gymnasium, fields, and courts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="heading-md text-center mb-6 text-navy-700">Our Academic Approach</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="text-navy-700" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-navy-800">Personalized Learning</h3>
            <p className="text-navy-600">
              We recognize that each student has unique strengths, challenges, and learning styles.
              Our teachers employ differentiated instruction to meet students where they are.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="text-navy-700" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-navy-800">Standards-Based Excellence</h3>
            <p className="text-navy-600">
              Our curriculum exceeds national standards, preparing students for success in 
              higher education and an increasingly competitive global environment.
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AtomIcon className="text-navy-700" size={28} />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-navy-800">Innovative Teaching</h3>
            <p className="text-navy-600">
              Our teachers integrate technology, project-based learning, and real-world applications
              to make learning relevant and engaging for all students.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Academics;
