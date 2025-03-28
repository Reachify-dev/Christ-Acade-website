import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  return (
    <div className="section-container">
      <h1 className="heading-lg text-center mb-6">Contact Us</h1>
      <p className="text-navy-600 text-center max-w-3xl mx-auto mb-12">
        We're here to answer any questions you may have about Christ Acade Group of Schools.
        Feel free to reach out through any of the methods below.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="heading-md mb-6 text-navy-700">Get in Touch</h2>
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-navy-50 rounded-full flex items-center justify-center mr-4">
                <MapPin className="text-navy-700" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-navy-800">Our Location</h3>
                <p className="text-navy-600">
                  No 32, Owoeye Street<br />
                  Okeonitea, Ayetoro Area<br />
                  Osogbo, Osun State
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-navy-50 rounded-full flex items-center justify-center mr-4">
                <Phone className="text-navy-700" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-navy-800">Phone Numbers</h3>
                <p className="text-navy-600">
                  Main Office: +2348102473418<br />
                  Admissions: +2348102473418<br />
                  Guidance Office: +2348102473418
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-navy-50 rounded-full flex items-center justify-center mr-4">
                <Mail className="text-navy-700" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-navy-800">Email Addresses</h3>
                <p className="text-navy-600">
                  General Inquiries: christacadegroupofschool@gmail.com<br />
                  Admissions: christacadegroupofschool@gmail.com<br />
                  Principal's Office: christacadegroupofschool@gmail.com
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0 h-12 w-12 bg-navy-50 rounded-full flex items-center justify-center mr-4">
                <Clock className="text-navy-700" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-navy-800">Office Hours</h3>
                <p className="text-navy-600">
                  Monday - Friday: 8:00 AM - 4:30 PM<br />
                  Saturday: 9:00 AM - 12:00 PM (Admissions Only)<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-3 text-navy-800">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 bg-navy-700 hover:bg-navy-600 rounded-full flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center mb-6">
              <div className="p-2 bg-navy-50 rounded-full mr-3">
                <MessageSquare className="text-navy-700" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-navy-800">Send Us a Message</h2>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
      
      <div className="mb-16">
        <h2 className="heading-md text-center mb-8 text-navy-700">Find Us</h2>
        <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-md">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.3007433954646!2d4.506278476394198!3d7.427273112293828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103778bac4bab665%3A0x7c5ce4c728e51a7c!2sOsogbo%2C%20Osun!5e0!3m2!1sen!2sng!4v1652913390697!5m2!1sen!2sng" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      
      <div className="bg-navy-50 rounded-xl p-8">
        <h2 className="heading-md text-center mb-6 text-navy-700">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "What are the school hours?",
              a: "Our school day runs from 8:00 AM to 3:15 PM for all grade levels. Early drop-off is available from 7:15 AM, and after-school programs run until 5:30 PM."
            },
            {
              q: "How can I schedule a tour of the school?",
              a: "You can schedule a tour by contacting our Admissions Office at (555) 234-5678 or by filling out the contact form on this page."
            },
            {
              q: "Do you offer transportation services?",
              a: "Yes, we offer bus transportation services for students living within a 15-mile radius of the school. Additional fees apply."
            },
            {
              q: "What extracurricular activities do you offer?",
              a: "We offer a wide range of extracurricular activities including sports, arts, music, debate, robotics, and more. Visit our Academics page for details."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-semibold text-navy-800 mb-2">{faq.q}</h3>
              <p className="text-navy-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
