import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import NewsCard from '@/components/NewsCard';

const newsItems = [
  {
    id: 1,
    title: "National Science Competition Winners",
    excerpt: "Our students took home three awards at the National Science Competition, demonstrating exceptional talent in physics, chemistry, and biotechnology research.",
    date: "May 15, 2023",
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?q=80&w=2942&auto=format",
    category: "Achievements",
    slug: "national-science-competition-winners"
  },
  {
    id: 2,
    title: "New Arts Building Opening Ceremony",
    excerpt: "We're excited to announce the grand opening of our new state-of-the-art Visual and Performing Arts building, scheduled for next month.",
    date: "April 30, 2023",
    image: "https://images.unsplash.com/photo-1508997449629-303059a039c0?q=80&w=2950&auto=format",
    category: "Facilities",
    slug: "new-arts-building-opening"
  },
  {
    id: 3,
    title: "International Exchange Program Expansion",
    excerpt: "Christ Acade is expanding its International Exchange Program to include partner schools in France, Japan, and Brazil for the coming academic year.",
    date: "April 22, 2023",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2940&auto=format",
    category: "Programs",
    slug: "international-exchange-program-expansion"
  },
  {
    id: 4,
    title: "Basketball Team Heads to State Championships",
    excerpt: "Our varsity basketball team has qualified for the State Championships after an undefeated season. Join us in supporting them at the finals!",
    date: "March 10, 2023",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2940&auto=format",
    category: "Sports",
    slug: "basketball-team-state-championships"
  },
  {
    id: 5,
    title: "Annual Scholarship Gala Raises Record Funds",
    excerpt: "This year's Scholarship Fundraising Gala was our most successful yet, raising over $250,000 to support financial aid for deserving students.",
    date: "February 28, 2023",
    image: "https://images.unsplash.com/photo-1516450137517-162bfbeb8dba?q=80&w=2874&auto=format",
    category: "Events",
    slug: "scholarship-gala-record-funds"
  },
  {
    id: 6,
    title: "New STEM Curriculum Launch",
    excerpt: "Starting next semester, we're implementing an enhanced STEM curriculum with new robotics, coding, and engineering components across all grade levels.",
    date: "February 15, 2023",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2940&auto=format",
    category: "Academics",
    slug: "new-stem-curriculum-launch"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Parent-Teacher Conferences",
    date: "June 10-11, 2023",
    time: "3:00 PM - 7:00 PM",
    location: "Main Campus"
  },
  {
    id: 2,
    title: "Spring Arts Festival",
    date: "June 17, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "New Arts Building"
  },
  {
    id: 3,
    title: "End of Year Awards Ceremony",
    date: "June 25, 2023",
    time: "1:00 PM - 3:00 PM",
    location: "School Auditorium"
  },
  {
    id: 4,
    title: "Graduation Ceremony",
    date: "June 30, 2023",
    time: "10:00 AM - 12:00 PM",
    location: "Memorial Hall"
  },
  {
    id: 5,
    title: "Summer Program Begins",
    date: "July 10, 2023",
    time: "9:00 AM",
    location: "Main Campus"
  }
];

const News = () => {
  return (
    <div className="section-container">
      <h1 className="heading-lg text-center mb-6">News & Events</h1>
      <p className="text-navy-600 text-center max-w-3xl mx-auto mb-12">
        Stay updated with the latest news, announcements, and upcoming events
        at Christ Acade Group of Schools.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <h2 className="heading-md mb-6 text-navy-700">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsItems.map((item) => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
          
          <div className="mt-10 flex justify-center">
            <button className="flex items-center gap-2 px-5 py-2 border border-navy-200 rounded-md hover:bg-navy-50 transition-colors">
              <span>View All News</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="heading-md mb-6 text-navy-700">Upcoming Events</h2>
          <div className="bg-white rounded-xl shadow-md p-6">
            <ul className="space-y-6">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start">
                    <div className="p-2 bg-navy-50 rounded-lg mr-4">
                      <Calendar className="text-navy-700" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-800">{event.title}</h3>
                      <p className="text-navy-600 text-sm">{event.date}</p>
                      <p className="text-navy-500 text-sm">{event.time}</p>
                      <p className="text-navy-500 text-sm">{event.location}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <h3 className="font-semibold text-navy-800 mb-2">Academic Calendar</h3>
              <ul className="text-navy-600 space-y-2">
                <li className="flex justify-between">
                  <span>Summer Break Begins</span>
                  <span>July 1, 2023</span>
                </li>
                <li className="flex justify-between">
                  <span>Fall Semester Begins</span>
                  <span>September 5, 2023</span>
                </li>
                <li className="flex justify-between">
                  <span>Winter Break</span>
                  <span>Dec 18 - Jan 5</span>
                </li>
                <li className="flex justify-between">
                  <span>Spring Semester Begins</span>
                  <span>January 8, 2024</span>
                </li>
              </ul>
              
              <button className="mt-4 w-full py-2 text-center bg-navy-50 rounded-md text-navy-700 hover:bg-navy-100 transition-colors">
                View Full Calendar
              </button>
            </div>
          </div>
          
          <div className="mt-8 bg-navy-700 text-white p-6 rounded-xl">
            <h3 className="font-semibold text-xl mb-2">Newsletter Signup</h3>
            <p className="text-navy-100 mb-4">
              Subscribe to our newsletter to receive the latest updates and announcements.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-3 py-2 rounded-md bg-navy-600 text-white placeholder-navy-300 border border-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400 flex-grow"
              />
              <button className="px-4 py-2 bg-gold-500 text-navy-900 rounded-md font-medium hover:bg-gold-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-navy-50 rounded-xl p-8">
        <h2 className="heading-md text-center mb-6 text-navy-700">School Announcements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-semibold text-navy-800 mb-2">Summer Programs Registration</h3>
            <p className="text-navy-600 text-sm">
              Registration for our summer enrichment programs is now open. 
              Spaces are limited, so secure your child's spot today!
            </p>
            <a href="#" className="text-gold-500 text-sm font-medium mt-2 inline-block">Learn More →</a>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-semibold text-navy-800 mb-2">New Faculty Members</h3>
            <p className="text-navy-600 text-sm">
              We're excited to welcome five new faculty members joining our 
              school for the upcoming academic year.
            </p>
            <a href="#" className="text-gold-500 text-sm font-medium mt-2 inline-block">Meet Them →</a>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-semibold text-navy-800 mb-2">Campus Renovation Updates</h3>
            <p className="text-navy-600 text-sm">
              The renovation of our science laboratories is on schedule and 
              will be completed before the fall semester begins.
            </p>
            <a href="#" className="text-gold-500 text-sm font-medium mt-2 inline-block">See Progress →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
