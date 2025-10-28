
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopNavigation from './navbar/DesktopNavigation';
import UserActions from './navbar/UserActions';
import MobileMenu from './navbar/MobileMenu';

const Navbar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // URLs for navigation - removed Home as it will be the logo
  const navItems = [
    { name: 'Events', href: '/events' },
    { name: 'Host a Race', href: '/organize/new' },
    { name: 'News', href: '/news' },
    // { name: 'Why RACE?', href: '/why-race' },
    { name: 'Contact Us', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const navbarClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
    isScrolled || location.pathname !== '/' ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
  }`;

  // Determine if links should be light or dark based on homepage and scroll position
  const isHomepage = location.pathname === '/';
  const useWhiteText = isHomepage && !isScrolled;
  const linkClass = useWhiteText ? 'text-white hover:text-white/80' : 'text-gray-700 hover:text-race-red';

  // Added hover animation class for nav links
  const linkHoverAnimation = "relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-race-red after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={navbarClasses}>
      <div className="w-full px-4 flex items-center justify-between">
        {/* Logo - Pinned to absolute left */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center" aria-label="Home">
            <img
              src="/lovable-uploads/ce65f4f0-844a-4d65-bc90-0d5af4b3154a.png"
              alt="RACE Logo"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        {!isMobile && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <DesktopNavigation 
              navItems={navItems} 
              linkClass={linkClass} 
              linkHoverAnimation={linkHoverAnimation} 
            />
          </div>
        )}

        {/* Actions Section - Pinned to absolute right */}
        <div className="flex items-center">
          <UserActions 
            useWhiteText={useWhiteText} 
            isMobile={isMobile} 
            toggleMobileMenu={toggleMobileMenu}
            mobileMenuOpen={mobileMenuOpen}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} navItems={navItems} />
    </header>
  );
};

export default Navbar;
