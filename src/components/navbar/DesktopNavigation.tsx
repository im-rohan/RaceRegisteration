
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DesktopNavigationProps {
  navItems: Array<{ name: string; href: string }>;
  linkClass: string;
  linkHoverAnimation: string;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ 
  navItems, 
  linkClass, 
  linkHoverAnimation 
}) => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center space-x-8 whitespace-nowrap">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`font-medium ${linkClass} ${
            location.pathname === item.href ? 'border-b-2 border-race-red' : ''
          } flex items-center ${linkHoverAnimation}`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default DesktopNavigation;
