import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { CartDrawer } from '@/components/CartDrawer';
import logo from '@/assets/logo.png';

export const Navbar = () => {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-[#F6EDDA] border-b border-[#e8d9c3] z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="American Shoe Express" className="h-8 sm:h-10" />
          <span className="text-[#0f2942] font-bold text-xl hidden sm:inline">American Shoe Express</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            className="text-[#0f2942] hover:text-[#0f2942] hover:bg-[#0f2942]/10"
            onClick={scrollToProducts}
          >
            Shop
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative text-[#0f2942] hover:text-[#0f2942] hover:bg-[#0f2942]/10"
            onClick={() => setCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#b22234] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-in zoom-in-50 duration-200">
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
