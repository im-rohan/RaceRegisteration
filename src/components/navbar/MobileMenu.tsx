
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: Array<{ name: string; href: string }>;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems }) => {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md py-4">
      <nav className="container mx-auto px-4 flex flex-col space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="font-medium py-2 border-b border-gray-100 flex items-center"
          >
            <span className="ml-2">{item.name}</span>
          </Link>
        ))}
        
        {/* Mobile auth buttons */}
        {!user ? (
          <div className="flex flex-col space-y-2 pt-2">
            <Button asChild>
              <Link to="/auth?tab=signup">Register</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-2 pt-2">
            <Button variant="outline" asChild>
              <Link to="/profile">My Profile</Link>
            </Button>
            <Button variant="outline" onClick={logout}>
              Sign Out
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
