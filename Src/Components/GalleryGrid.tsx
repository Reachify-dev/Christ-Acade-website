
import { useState, useEffect } from 'react';

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  itemsPerPage?: number;
}

const GalleryGrid = ({ items, itemsPerPage = 9 }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  // Get unique categories from items
  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];
  
  // Filter items based on current filter
  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Get current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Pre-load images
  useEffect(() => {
    currentItems.forEach(item => {
      const img = new Image();
      img.src = item.src;
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [item.id]: true }));
      };
    });
  }, [currentItems]);
  
  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);
  
  // Handle click on an image
  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };
  
  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  // Navigation for pagination
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === category
                ? 'bg-navy-700 text-white'
                : 'bg-gray-100 text-navy-700 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {currentItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`relative overflow-hidden rounded-lg shadow-md cursor-pointer group
                       ${imagesLoaded[item.id] ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleImageClick(item)}
          >
            <div className="aspect-w-4 aspect-h-3">
              <img 
                src={item.src} 
                alt={item.alt} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium">{item.alt}</p>
                  <span className="text-white/80 text-sm">{item.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-navy-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  currentPage === index + 1
                    ? 'z-10 bg-navy-700 border-navy-700 text-white'
                    : 'bg-white border-gray-300 text-navy-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-300 cursor-not-allowed'
                  : 'text-navy-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] animate-scale-in"
            onClick={e => e.stopPropagation()} 
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="object-contain max-h-[85vh] w-auto mx-auto" 
            />
            <div className="absolute top-0 right-0 bg-black/60 rounded-bl-lg">
              <button 
                onClick={closeLightbox}
                className="p-2 text-white hover:text-gold-500"
                aria-label="Close lightbox"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
              <p className="text-white font-medium">{selectedImage.alt}</p>
              <span className="text-white/80 text-sm">{selectedImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
