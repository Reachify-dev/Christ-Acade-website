
import React from 'react';

const About = () => {
  return (
    <div className="section-container">
      <h1 className="heading-lg text-center mb-8">About Christ Acade Group of Schools</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="heading-md mb-4 text-navy-700">Our Story</h2>
          <p className="text-navy-600 mb-4">
            Founded in 1995, Christ Acade Group of Schools has been committed to providing 
            quality education to students for over 25 years. What started as a small primary 
            school has grown into a comprehensive educational institution serving students 
            from kindergarten through high school.
          </p>
          <p className="text-navy-600">
            Our journey has been marked by a steadfast commitment to academic excellence,
            character development, and creating a nurturing environment where students can
            discover and develop their unique talents and abilities.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gold-100 rounded-full opacity-50"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-navy-100 rounded-full opacity-50"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format" 
            alt="School building" 
            className="rounded-lg w-full h-auto shadow-xl relative z-10"
          />
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="heading-md text-center mb-6 text-navy-700">Our Vision & Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-navy-800">Our Vision</h3>
            <p className="text-navy-600">
              To be a premier educational institution that nurtures global citizens who are
              intellectually curious, morally upright, and committed to making a positive impact
              in their communities and the world at large.
            </p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 text-navy-800">Our Mission</h3>
            <p className="text-navy-600">
              To provide a holistic education that balances academic excellence with character
              development, fostering critical thinking, creativity, and a lifelong love for learning
              in a safe, inclusive, and supportive environment.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="heading-md text-center mb-8 text-navy-700">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Excellence", desc: "Striving for the highest standards in all endeavors" },
            { title: "Integrity", desc: "Upholding honesty, transparency, and ethical conduct" },
            { title: "Respect", desc: "Valuing diversity and treating everyone with dignity" },
            { title: "Innovation", desc: "Embracing creativity and forward-thinking approaches" }
          ].map((value, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-md hover-lift text-center">
              <h3 className="text-lg font-semibold mb-2 text-navy-800">{value.title}</h3>
              <p className="text-navy-600">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="heading-md text-center mb-8 text-navy-700">Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="aspect-square w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-gold-200">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format"
                alt="Principal"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-navy-800">Mr. Aderemi</h3>
            <p className="text-navy-600 mb-3">Principal</p>
            <p className="text-navy-600 text-sm">
              With over 20 years of experience in education, Mr. Aderemi leads our school with
              vision and dedication.
            </p>
          </div>
          <div className="text-center">
            <div className="aspect-square w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-gold-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format"
                alt="Vice Principal"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-navy-800">Mrs. Olamoyesan</h3>
            <p className="text-navy-600 mb-3">Vice Principal</p>
            <p className="text-navy-600 text-sm">
              Mrs. Olamoyesan oversees our academic programs and ensures excellence in curriculum
              implementation.
            </p>
          </div>
          <div className="text-center">
            <div className="aspect-square w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full border-4 border-gold-200">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format"
                alt="Head of Staff"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold mb-1 text-navy-800">Mrs. Adejumo</h3>
            <p className="text-navy-600 mb-3">Head of Staff</p>
            <p className="text-navy-600 text-sm">
              Mrs. Adejumo manages our administrative functions and ensures smooth operation of the school.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
