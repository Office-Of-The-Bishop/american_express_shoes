import { createContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const addToCart = (product: Product) => {
    const productId = product.id || product.name;
    const existingItem = cart.find(item => (item.id || item.name) === productId);
    if (existingItem) {
      saveCart(cart.map(item =>
        (item.id || item.name) === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      saveCart([...cart, { ...product, id: productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    saveCart(cart.filter(item => (item.id || item.name) !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart(cart.map(item =>
        (item.id || item.name) === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    saveCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};
