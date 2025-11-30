import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { LoaderCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { getCartId, getImageUrl } from '@/lib/utils';

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { cart, removeFromCart, total, clearCart, saveCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [loading, setIsloading] = useState(false);
  const [email, setEmail] = useState('');
  const [location, setDeliveryLocation] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!Array.isArray(cart.items)) {
      toast({ title: "Cart is empty", variant: "destructive" });
      return;
    }
    if (cart.items.length === 0) {
      toast({ title: "Cart is empty.", variant: "destructive" });
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const order = {
      name,
      phone,
      email,
      items: cart,
      total,
      orderId,
      date: new Date().toLocaleDateString().replace(/\//g, "-"),
      orderMode: 'delivery',
      location,
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    // localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem("order", JSON.stringify(order));

    try {
      setIsloading(true)
      const response = await axios.post("/initiate-payment/" + getCartId(), order).finally(() => { setIsloading(false) });
      const data = response.data;
      if (data.status != 'success') {
        return
      }
      localStorage.setItem("reference", data.data.reference);
      // clearCart();
      if (data.status && data.data.authorization_url) {
        // window.location.href = data.data.authorization_url;
        navigate('/pay?access_code=' + data.data['access_code'] + '&ref=' + data.data['reference']);

      } else {
        alert("Payment initialization failed");
      }

    } catch {
      alert("Failed to initiate payment. Please try again.");
    }


    toast({ title: "Placing order", description: `Order ID: ${orderId}` });
    onOpenChange(false);
  };


  const handleRemoveFromCart = async (id) => {
    return await axios.delete('/cart/' + id + '/' + getCartId()).then((res) => {

      saveCart(res.data.cart)
    })
  }
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>Shopping Cart</SheetTitle>
          {Array.isArray(cart.items) && <p>
            {cart.items.length === 0
              ? "Your cart is empty"
              : `${cart.items.length} item${cart.items.length > 1 ? 's' : ''} in your cart`}
          </p>}
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          {!Array.isArray(cart.items) || cart.items.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => onOpenChange(false)}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              <div className="space-y-4">
                {Array.isArray(cart.items) && cart.items.map((item, index) => (
                  <Card key={item.shoe.id || item.shoe.name || index}>
                    <CardContent className="p-3 sm:p-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                      {item.shoe.images.length >= 1 && (
                        <img
                          src={getImageUrl(item.shoe.images[0])}
                          alt={item.shoe.name}
                          className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-base sm:text-lg">{item.shoe.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{item.shoe.description}</p>
                        <p className="text-lg sm:text-xl font-bold text-accent mt-2">
                          ₵{(item.shoe.cost * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryLocation">Delivery Location</Label>
                      <Input value={location} onChange={(e) => setDeliveryLocation(e.target.value)} required />
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Total</span>
                        <span className="text-accent">₵{total.toFixed(2)}</span>
                      </div>
                      {!loading ? <Button type="submit" className="w-full" size="lg">
                        Place Order 
                      </Button> : <LoaderCircle className="animate-spin mx-auto" size={30} />}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
