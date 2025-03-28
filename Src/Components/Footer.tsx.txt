
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              Christ<span className="text-gold-500">Acade</span>
            </h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Nurturing minds, building character, and inspiring excellence in a supportive and innovative learning environment.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="text-gray-300 hover:text-gold-500 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-navy-700">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Academics", path: "/academics" },
                { name: "Admissions", path: "/admissions" },
                { name: "News & Events", path: "/news" },
                { name: "Gallery", path: "/gallery" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-gray-300 hover:text-gold-500 transition-colors flex items-center group"
                  >
                    <ArrowRight size={14} className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-navy-700">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 mt-1 text-gold-500 flex-shrink-0" />
                <span className="text-gray-300">No 32, Owoeye Street, Okeonitea, Ayetoro Area, Osogbo, Osun State</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-gold-500 flex-shrink-0" />
                <a href="tel:+2348102473418" className="text-gray-300 hover:text-gold-500 transition-colors">
                  +234 810 247 3418
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-gold-500 flex-shrink-0" />
                <a href="mailto:christacadegroupofschool@gmail.com" className="text-gray-300 hover:text-gold-500 transition-colors">
                  christacadegroupofschool@gmail.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-navy-700">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-navy-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold-500 flex-1"
                required
              />
              <button
                type="submit"
                className="bg-gold-500 text-navy-900 px-4 py-2 rounded-r-md hover:bg-gold-400 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-navy-800 text-center text-gray-400">
          <p>© {currentYear} Christ Acade Group of School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
