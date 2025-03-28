import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admissions", path: "/admissions" },
    { name: "Gallery", path: "/gallery" },
    { name: "News & Events", path: "/news" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/95 shadow-md backdrop-blur-md'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          aria-label="Christ Acade Group of School"
        >
          <div className={`font-serif font-bold text-2xl transition-colors duration-300 ${
            isScrolled ? 'text-navy-700' : 'text-white'
          }`}>
            Christ<span className="text-gold-500">Acade</span>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 nav-link ${
                location.pathname === link.path
                  ? (isScrolled ? 'text-navy-700' : 'text-white')
                  : (isScrolled ? 'text-navy-600 hover:text-navy-800' : 'text-white/90 hover:text-white')
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {user && (
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-1 ${
                location.pathname === '/profile'
                  ? (isScrolled ? 'text-navy-700' : 'text-white')
                  : (isScrolled ? 'text-navy-600 hover:text-navy-800' : 'text-white/90 hover:text-white')
              }`}
            >
              <UserCircle className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          )}
          
          <Link
            to="/admissions"
            className="ml-4 px-4 py-2 rounded-md bg-gold-500 text-navy-900 font-medium shadow-md hover:bg-gold-400 transition-all duration-300 button-shine"
          >
            Apply Now
          </Link>
        </nav>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className={`w-6 h-6 ${isScrolled ? 'text-navy-800' : 'text-white'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${isScrolled ? 'text-navy-800' : 'text-white'}`} />
          )}
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-md font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-navy-50 text-navy-700'
                      : 'text-navy-600 hover:bg-navy-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user && (
                <Link
                  to="/profile"
                  className={`px-4 py-3 rounded-md font-medium transition-colors flex items-center gap-1 ${
                    location.pathname === '/profile'
                      ? 'bg-navy-50 text-navy-700'
                      : 'text-navy-600 hover:bg-navy-50'
                  }`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
              )}
              
              <Link
                to="/admissions"
                className="mt-3 px-4 py-3 rounded-md bg-gold-500 text-navy-900 font-medium text-center shadow-sm"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
