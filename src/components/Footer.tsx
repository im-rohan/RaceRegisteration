
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="text-white py-12 bg-race-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and social links */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center">
              <div className="w-28 h-10 relative">
                <img src="/lovable-uploads/ce65f4f0-844a-4d65-bc90-0d5af4b3154a.png" alt="RACE Logo" className="h-full object-contain" />
              </div>
            </Link>
            <p className="text-gray-400 max-w-xs">Less Work. More Racing.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-race-red transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-race-red transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-race-red transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-race-red transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Race</h3>
              <ul className="space-y-2">
                <li><Link to="/events" className="text-gray-400 hover:text-race-red transition">Find Events</Link></li>
                <li><Link to="/news" className="text-gray-400 hover:text-race-red transition">News</Link></li>
                <li><Link to="/why-race" className="text-gray-400 hover:text-race-red transition">Why RACE?</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/contact" className="text-gray-400 hover:text-race-red transition">Contact Us</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-race-red transition">FAQs</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-race-red transition">Terms & Conditions</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-race-red transition">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest races and updates.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email" className="px-4 py-2 text-race-black rounded-md flex-grow bg-white" />
              <button className="px-4 py-2 bg-race-red text-white rounded-md font-medium hover:bg-race-red/90 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} RACE. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
