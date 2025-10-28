
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, Menu, X, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import CartDropdown from '../CartDropdown';
import { useCart } from '@/contexts/CartContext';

interface UserActionsProps {
  useWhiteText: boolean;
  isMobile: boolean;
  toggleMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

const UserActions: React.FC<UserActionsProps> = ({ 
  useWhiteText, 
  isMobile, 
  toggleMobileMenu,
  mobileMenuOpen
}) => {
  const { user, logout, selectedRole } = useAuth();
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Cart Button */}
      <div className="relative">
        <Button 
          size="icon" 
          onClick={toggleCart}
          className="bg-race-red hover:bg-race-red/90 text-white font-normal border-0"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-race-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </Button>
        
        {/* Cart Dropdown */}
        <CartDropdown isOpen={isCartOpen} onClose={closeCart} />
      </div>

      {/* User Actions */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              size="icon" 
              className="bg-race-red hover:bg-race-red/90 text-white font-normal border-0"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-2 py-1.5 text-sm font-medium">
              Hi, {user.name.split(' ')[0]}
              {user.isRacePlus && <span className="ml-2 text-xs bg-race-red text-white px-1.5 py-0.5 rounded-full">RACE+</span>}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to={selectedRole === 'organizer' ? '/profile' : '#'}>
                {selectedRole === 'organizer' ? 'My Dashboard' : 'My Profile'}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          size="sm"
          className="bg-race-red hover:bg-race-red/90 text-white font-normal border-0"
          asChild
        >
          <Link to="/auth?role=athlete">Sign In</Link>
        </Button>
      )}
      
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button
          variant={useWhiteText ? "outline" : "ghost"}
          size="icon"
          onClick={toggleMobileMenu}
          className={useWhiteText 
            ? "bg-white border-white text-black hover:bg-white/90 hover:text-black" 
            : ""}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}
    </div>
  );
};

export default UserActions;
