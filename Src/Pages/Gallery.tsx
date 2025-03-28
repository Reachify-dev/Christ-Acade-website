
import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';

const galleryImages = [
  {
    id: 1,
    title: "Science Fair Projects",
    category: "Academics",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=2944&auto=format",
    description: "Students showcasing their innovative science projects"
  },
  {
    id: 2,
    title: "Basketball Championship",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2940&auto=format",
    description: "Our basketball team celebrating their recent victory"
  },
  {
    id: 3,
    title: "Art Exhibition",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2940&auto=format",
    description: "Student artwork on display at our annual exhibition"
  },
  {
    id: 4,
    title: "International Day",
    category: "Events",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2940&auto=format",
    description: "Celebrating diverse cultures during our International Day"
  },
  {
    id: 5,
    title: "Music Recital",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=2940&auto=format",
    description: "Students performing at the spring music recital"
  },
  {
    id: 6,
    title: "Robotics Competition",
    category: "STEM",
    image: "https://images.unsplash.com/photo-1581092921461-6484fdfe2ddf?q=80&w=2940&auto=format",
    description: "Our robotics team at the regional competition"
  },
  {
    id: 7,
    title: "Graduation Ceremony",
    category: "Events",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format",
    description: "Celebrating our graduating seniors"
  },
  {
    id: 8,
    title: "School Campus",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2940&auto=format",
    description: "Aerial view of our beautiful campus"
  },
  {
    id: 9,
    title: "Field Trip",
    category: "Activities",
    image: "https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?q=80&w=2940&auto=format",
    description: "Students exploring nature during a science field trip"
  },
  {
    id: 10,
    title: "Library & Study Space",
    category: "Facilities",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2940&auto=format",
    description: "Our modern library and collaborative study spaces"
  },
  {
    id: 11,
    title: "Sports Day",
    category: "Sports",
    image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?q=80&w=2948&auto=format",
    description: "Annual sports day competition between houses"
  },
  {
    id: 12,
    title: "Drama Production",
    category: "Arts",
    image: "https://images.unsplash.com/photo-1603742185480-cd67dbf5eb45?q=80&w=2942&auto=format",
    description: "Students performing in the annual school play"
  }
];

const categories = [
  "All", "Academics", "Sports", "Arts", "Events", "STEM", "Facilities", "Activities"
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");
  
  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);
  
  // Convert the gallery images to the format expected by GalleryGrid
  const galleryItems = filteredImages.map(img => ({
    id: String(img.id),
    src: img.image,
    alt: img.description,
    category: img.category
  }));
  
  return (
    <div className="section-container">
      <h1 className="heading-lg text-center mb-6">School Gallery</h1>
      <p className="text-navy-600 text-center max-w-3xl mx-auto mb-12">
        Explore snapshots of life at Christ Acade Group of Schools through our photo gallery.
        From academics to sports, arts to special events, these images showcase the vibrant
        experiences that make our school community special.
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full transition-all ${
              activeCategory === category
                ? 'bg-navy-700 text-white'
                : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <GalleryGrid items={galleryItems} />
    </div>
  );
};

export default Gallery;
