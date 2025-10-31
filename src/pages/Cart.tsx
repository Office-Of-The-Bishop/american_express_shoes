import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }
    console.log(cart)

    const orderId = `ORD-${Date.now()}`;
    const order = {
      name,
      phone,
      items: cart,
      total,
      orderId,
      date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    toast({ title: "Order placed successfully!", description: `Order ID: ${orderId}` });
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-muted/30 pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={() => navigate('/')}>Continue Shopping</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item, index) => (
                  <Card key={item.id || item.name || index}>
                    <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {item.images.length>=1 && (
                        <img 
                          src={item.images[0]} 
                          alt={item.name}
                          className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.description}</p>
                        <p className="text-lg sm:text-xl font-bold text-accent mt-2">₵{(Number(item.price) || 0).toFixed(2)}</p>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id || item.name)}
                          className="sm:mb-auto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                            onClick={() => updateQuantity(item.id || item.name, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-8 sm:w-10 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 sm:h-10 sm:w-10"
                            onClick={() => updateQuantity(item.id || item.name, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between text-lg font-bold mb-4">
                          <span>Total</span>
                          <span className="text-accent">₵{total.toFixed(2)}</span>
                        </div>
                        <Button type="submit" className="w-full" size="lg">
                          Place Order
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
