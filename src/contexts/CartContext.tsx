
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EventProps } from '@/components/EventCard';
import { toast } from '@/hooks/use-toast-disabled';

interface CartContextType {
  items: EventProps[];
  addToCart: (event: EventProps) => void;
  removeFromCart: (eventId: string) => void;
  clearCart: () => void;
  itemCount: number;
  isInCart: (eventId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Try to get cart from localStorage
const getInitialCart = (): EventProps[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const storedCart = localStorage.getItem('raceCart');
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<EventProps[]>(getInitialCart);

  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('raceCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (event: EventProps) => {
    // Check if event is already in cart to avoid duplicates
    if (!cartItems.some(item => item.id === event.id)) {
      setCartItems(prev => [...prev, event]);
      toast({
        title: "Event added to cart",
        description: `${event.title} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Event already in cart",
        description: `${event.title} is already in your cart.`,
        variant: "destructive",
      });
    }
  };

  const removeFromCart = (eventId: string) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.id !== eventId);
      if (newCart.length < prev.length) {
        toast({
          title: "Event removed from cart",
          description: "The event has been removed from your cart.",
        });
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All events have been removed from your cart.",
    });
  };

  const isInCart = (eventId: string) => {
    return cartItems.some(item => item.id === eventId);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items: cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        itemCount: cartItems.length,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
