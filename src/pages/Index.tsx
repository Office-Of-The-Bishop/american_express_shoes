import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import heroBanner from '@/assets/hero-banner.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductDetailsModal } from '@/components/ProductDetailsModal';
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
    shoeType: item?.type ?? 'Casual',
    quantity: item?.quantity ?? 0,
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
      <section className=" mt-0 relative h-screen flex items-end justify-center overflow-hidden">
        <div 
          className="absolute top inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBanner})`,
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center pb-12 sm:pb-16 mb-4">
          <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8" onClick={scrollToProducts}>
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="pt-4 pb-12 sm:pb-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Each pair is meticulously crafted to perfection, combining timeless design with modern comfort.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex-1">
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Filter by Gender" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="Men">Men</SelectItem>
                  <SelectItem value="Women">Women</SelectItem>
                  <SelectItem value="Unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={selectedShoeType} onValueChange={setSelectedShoeType}>
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Filter by Shoe Type" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Sneakers">Sneakers</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Boots">Boots</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm sm:text-base">© 2024 American Express Shoes. Crafted with passion for excellence.</p>
          <p className="mt-3 text-xs sm:text-sm font-medium text-foreground">Payment Policy Statement</p>
          <p className="mt-1 text-xs sm:text-sm max-w-3xl mx-auto">
            AmericanShoes.com is a brand of Box Breaker Global. All online payments are securely processed through Box Breaker Global’s verified Paystack merchant account.
          </p>
          <p>American Shoe Express. Move Like You Mean It!</p>
          <a 
            href="https://american-shoe-express-admin.vercel.app/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline text-sm"
          >
            Admin
          </a>
          <Link to={"/disclaimer"}>Disclaimer</Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
