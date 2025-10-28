
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const CartDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (!isOpen) return null;
  
  const price = 99.99;
  const serviceFee = 5.99;
  
  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      let itemPrice = price + serviceFee;
      if (item.isRacePlus) {
        itemPrice -= 5;
      }
      total += itemPrice;
    });
    return total;
  };

  // Create URL for checkout - use the first event ID if multiple items in cart
  const checkoutUrl = items.length > 0 ? `/checkout?eventId=${items[0].id}` : '/checkout';

  const handleCheckout = () => {
    if (items.length > 0) {
      onClose(); // Close the cart dropdown
      navigate(`/checkout`);
    }
  };

  return (
    <div className="absolute top-16 right-0 w-96 bg-white rounded-lg shadow-lg z-50 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Your Cart ({items.length})</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-race-darkgray mb-4">Your cart is empty</p>
          <Button asChild variant="outline" className="mt-2" onClick={onClose}>
            <Link to="/events">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto">
            {items.map((event) => (
              <div key={event.id} className="flex gap-3 mb-4 border-b pb-4">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                  loading="lazy"
                />
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-bold">{event.title}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeFromCart(event.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-sm text-race-darkgray flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="text-sm text-race-darkgray flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span>Registration Fee:</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Service Fee:</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-2">
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>

            
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 hover:text-race-red hover:border-race-red"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              <Button 
                className="flex-1 bg-race-red hover:bg-race-red/90"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
