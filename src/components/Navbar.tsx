import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from '@/components/CartDrawer';
import logo from '@/assets/logo.png';

export const Navbar = () => {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#1a3a5c] border-b border-blue-900 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="American Shoe Express" className="h-12 sm:h-14" />
          <span className="text-white font-bold text-xl hidden sm:inline">American Express</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-white hover:text-white"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in-50 duration-200">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Button>
        </div>
      </div>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </nav>
  );
};
