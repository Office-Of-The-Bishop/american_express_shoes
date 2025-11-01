import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import heroBanner from '@/assets/American Shoe Logo Hero.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductDetailsModal } from '@/components/ProductDetailsModal';

import Logo from "../assets/American Shoe Logo - transparent.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import shoeSize from "../assets/Shoe Size.png"


import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";



// import logo "../assets/American Shoe Logo - transparent.png";
import { Link } from 'react-router-dom';
const Index = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedShoeType, setSelectedShoeType] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shoes, setShoes] = useState<any[]>([]);

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get('/all-shoes');
        const items = response?.data?.allItems ?? [];
        setShoes(items);
      } catch (error) {
        console.error('Failed to fetch shoes', error);
        setShoes([]);
      }
    };
    fetchShoes();
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const apiProducts = shoes.map((item: any, index: number) => ({
    id: `${item?.name ?? 'item'}-${index}`,
    name: item?.name,
    description: item?.description,
    images: item?.images,
    price: item?.cost,
    gender: item?.Gender ?? 'Unisex',
    shoeType: item?.type ?? ['Card'],
    quantity: item?.quantity ?? 0,
    shoeStatus:item?.shoeStatus,
    AmericanSize:item?.size,
    GhanaianSize:item?.GhanaianSize,
    retailCost:item?.retailCost,
    itemNumber:item?.itemNumber

  }));

  const filteredProducts = apiProducts.filter((product: any) => {
    const genderMatch = selectedGender === 'all' || product?.gender === selectedGender;
    const shoeTypeMatch = selectedShoeType === 'all' || product?.shoeType === selectedShoeType;
    return genderMatch && shoeTypeMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar  />
      
     {/* Hero Section */}
    <section className="relative overflow-hidden">
        <img
          src={heroBanner}
          alt="Hero"
          className="w-full h-auto block"
        />
      </section>

      {/* Products Section */}
      <section id="products" className=" relative mt-[40px] sm:pb-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Browse our Collection and Walk Good</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Shoes that feel good, look good, and do good!
            </p>
          </div>
          
           <div className="flex gap-5">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        </div>
      </section>

        {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddToCart={handleAddToCart}
      />

      {/* Footer */}
      <footer className="bg-[#d9d4d4] rounded-lg mx-4 mb-4 mt-8">
        <div className="container mx-auto px-6 py-8">
          {/* Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-6">
            {/* Left Column: Logo and Mission */}
            <div className="md:col-span-1 lg:col-span-2 pt-4">
              {/* Logo */}
              <img src={Logo} className='w-26 h-20 size-46'/>

              
              {/* Mission Statement */}
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                American Shoe Express is a
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                humanitarian project of 
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                BoxBreaker Global. Our mission
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                is to provide high quality
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                foot while supporting
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                charitable and development
              </p>
              <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
                initiaives across Africa
              </p>
            </div>

            {/* Center Columns: Navigation Links */}
            <div className="md:col-span-1">
              <ul className="space-y-2 pt-10">
                <li>
                  <a href="#men" className="text-black hover:text-gray-700 text-m">
                    Men
                  </a>
                </li>
                <li>
                  <a href="#womens" className="text-black hover:text-gray-700 text-m">
                    Women
                  </a>
                </li>
                <li>
                  <a href="#unisex" className="text-black hover:text-gray-700 text-m">
                    Unisex
                  </a>
                </li>
                <li>
                  <a href="#children" className="text-black hover:text-gray-700 text-m">
                    Children
                  </a>
                </li>
                <li>
                  <a href="#teen" className="text-black hover:text-gray-700 text-m">
                    Teens
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <ul className="space-y-2 pt-10">
                <li>
                  <a href="#sneakers" className="text-black hover:text-gray-700 text-m">
                    Sneakers
                  </a>
                </li>
                <li>
                  <a href="#dress" className="text-black hover:text-gray-700 text-m">
                    Dress
                  </a>
                </li>
                <li>
                  <a href="#boots" className="text-black hover:text-gray-700 text-m">
                    Boots
                  </a>
                </li>
                <li>
                  <a href="#sandals" className="text-black hover:text-gray-700 text-m">
                    Sandals
                  </a>
                </li>
                <li>
                  <a href="#sliders" className="text-black hover:text-gray-700 text-m">
                    Sliders
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Column: Social & Contact */}
            <div className="md:col-span-1">
              <ul className="space-y-2 pt-10">
                <li>
                  <a href="#facebook" className="text-black hover:text-gray-700 text-m">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#instagram" className="text-black hover:text-gray-700 text-m">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#disclaimer" className="text-black hover:text-gray-700 text-m">
                    Disclaimer
                  </a>
                </li>
                <li>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-black hover:text-gray-700 text-m">
                          Size Chart
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Size Chart</DialogTitle>
                        </DialogHeader>
                        <img
                          src={shoeSize}
                          alt="Shoe Size Chart"
                          className="w-full h-auto rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  </li>

                <li>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-black hover:text-gray-700 text-m">
                        Contact Us
                      </button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Contact Us</DialogTitle>
                      </DialogHeader>

                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </li>

              </ul>
            </div>
          </div>

          {/* Separator Line */}
          <div className="border-t border-black my-6"></div>

          {/* Bottom Section */}
          <div className="text-center space-y-2">
            <p className="text-m text-gray-500">
              © American Shoe Express. All Rights Reserved 2023
            </p>
            <p className="text-m text-gray-500">
              All online payments are securely processed through Box Breaker Global's verified Paystack merchant account.
            </p>
          </div>
        </div>
      </footer>
      
    </div>
  );
};

export default Index;


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Example: send to backend (adjust route as needed)
      await axios.post("/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", phoneNumber: "", comment: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="e.g. +233 555 123 456"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          placeholder="Type your message here..."
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};
