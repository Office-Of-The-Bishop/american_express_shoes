import React, { useEffect, useState } from "react";
import logo from "../assets/American Shoe Logo - transparent.png";
import ShoppingCart from "@/components/ShoppingCart";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailsModal } from "@/components/ProductDetailsModal";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import axios from "axios";
import heroBanner from "@/assets/American Shoe Logo Hero.png";
import mobileHero from "../assets/mobile hero (1).png";
import shoeSize from "../assets/Shoe Size.png";
import Logo from "../assets/American Shoe Logo - transparent.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// ✅ Main Page
const Index = () => {
  const { addToCart, cart } = useCart();
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [shoes, setShoes] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const blackTabs = ["Men", "Womens", "Unisex", "Children", "Teen"];
  const redTabs = ["Sneakers", "Dress", "Sandals", "Boots","Sliders"];

  // ✅ Fetch products
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await axios.get("/all-shoes");
        const items = response?.data?.allItems ?? [];
        setShoes(items);
      } catch (error) {
        console.error("Failed to fetch shoes", error);
        setShoes([]);
      }
    };
    fetchShoes();
  }, []);
  

  // ✅ Load active tab from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("selected");
    if (stored) setActiveTab(stored);
  }, []);

  // ✅ Handle tab click
  const handleTabClick = (tabValue: string): void => {
    localStorage.setItem("selected", tabValue);
    setActiveTab(tabValue);
  };



  const toggleMenu = () => setMenuOpen(!menuOpen);

  const apiProducts = shoes.map((item: any, index: number) => ({
    id: `${item?.name ?? "item"}-${index}`,
    name: item?.name,
    description: item?.description,
    images: item?.images,
    price: item?.cost,
    gender: item?.Gender ?? ["Unisex"],
    shoeType: item?.type ?? ["Card"],
    quantity: item?.quantity ?? 0,
    shoeStatus: item?.shoeStatus ?? ["Brand New"],
    AmericanSize: item?.size,
    GhanaianSize: item?.GhanaianSize,
    retailCost: item?.retailCost,
    itemNumber: item?.itemNumber,
  }));

  useEffect(() => {
    const sectionId = localStorage.getItem("scrollTo");
    if (sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("scrollTo"); // cleanup
    }
  }, []);

  // ✅ Filter products by tab & search term
 // ✅ Filter products by tab & search term (matches all fields)
const filteredProducts = apiProducts.filter((product: any) => {
  const localSelection = localStorage.getItem("selected")?.toLowerCase();
  const search = searchTerm.toLowerCase().trim();

  // ✅ Filter by selected tab
  const matchesTab =
    localSelection
      ? (Array.isArray(product.gender) &&
          product.gender.some((g: string) => g.toLowerCase() === localSelection)) ||
        (Array.isArray(product.shoeType) &&
          product.shoeType.some((t: string) => t.toLowerCase() === localSelection)) ||
        (Array.isArray(product.shoeStatus) &&
          product.shoeStatus.some((s: string) => s.toLowerCase() === localSelection))
      : true;

  // ✅ If no search term, just apply tab filter
  if (!search) return matchesTab;

  // ✅ Flatten all product values (arrays → joined text)
  const allValues = Object.values(product)
    .map((val) => {
      if (Array.isArray(val)) return val.join(" ").toLowerCase();
      if (typeof val === "object" && val !== null) return JSON.stringify(val).toLowerCase();
      return String(val).toLowerCase();
    })
    .join(" ");

  // ✅ Check if search term exists anywhere in the product
  const matchesSearch = allValues.includes(search);

  return matchesTab && matchesSearch;
});


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

  return (
    <div className="min-h-screen bg-background">

      {/* ✅ Inline Navbar */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white backdrop-blur">
        <div className="mx-auto max-w-7xl px-3 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a
              href="#product"
              onClick={() => {
                localStorage.removeItem("selected");        // clear item
                localStorage.setItem("scrollTo", "#products"); // remember section to scroll
                window.location.reload();                    // refresh the page
              }}
              className="flex items-center gap-2 shrink-0"
              aria-label="Home"
            >
              <img
                src={logo}
                alt="American Shoe Express"
                className="w-24 h-16 absolute left-[7%]"
              />
            </a>


            {/* Center Tabs (Desktop) */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center text-sm font-medium">
              {[...blackTabs, ...redTabs].map((tab) => (
                <a
                  key={tab}
                  href="#products"
                  onClick={() => handleTabClick(tab)}
                  className={`px-2 py-1 rounded transition-all duration-150 ${
                    activeTab === tab
                      ? "underline underline-offset-4 font-semibold"
                      : ""
                  } ${
                    blackTabs.includes(tab)
                      ? "text-black hover:text-gray-700"
                      : "text-red-700 hover:text-red-500"
                  }`}
                >
                  {tab}
                </a>
              ))}
            </div>

            {/* Right Side (Desktop Search + Cart) */}
            <div className="hidden md:flex items-center gap-4">
              <input
                type="search"
                placeholder="Search..."
                className="h-10 w-60 rounded-lg border border-black/10 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-[#0f2942] hover:bg-[#0f2942]/10"
                  onClick={() => setCartOpen(true)}
                >
                  <span className="text-sm font-medium">CART</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-[#0f2942] hover:bg-[#0f2942]/10"
                  onClick={() => setCartOpen(true)}
                >
                  <ShoppingCart />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#b22234] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </div>
              <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
            </div>

            {/* Mobile Header: Cart + Menu */}
            <div className="md:hidden flex items-center gap-4 justify-end pr-4">
              {/* Mobile Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-[#0f2942] hover:bg-[#0f2942]/10"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#b22234] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-neutral-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-black/10 bg-white">
            <div className="px-4 py-4 space-y-4">
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-10 rounded-lg border border-black/10 bg-white px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <ul className="grid grid-cols-2 gap-3">
                {[...blackTabs, ...redTabs].map((tab) => (
                  <li key={tab}>
                    <a
                      href="#products"
                      onClick={() => {
                        handleTabClick(tab);
                        setMenuOpen(false);
                      }}
                      className={`block px-3 py-2 rounded text-sm font-medium text-center ${
                        activeTab === tab
                          ? "underline underline-offset-4 font-semibold"
                          : ""
                      } ${
                        blackTabs.includes(tab)
                          ? "text-black hover:text-gray-700"
                          : "text-red-700 hover:text-red-500"
                      }`}
                    >
                      {tab}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* ✅ Hero Section */}
      <section className="relative overflow-hidden">
        <img src={heroBanner} alt="Hero" className="hidden sm:block w-full h-auto" />
        <img src={mobileHero} alt="Mobile Hero" className="block sm:hidden w-full h-auto" />
      </section>

      {/* ✅ Product Section */}
      <section id="products" className="relative mt-[40px] sm:pb-20 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Browse our Collection and Walk Good</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-4">
              Premium style, comfort, and durability without the sky-high price tag.
            </p>
          </div>

          <div
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center px-4"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found for this selection.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ✅ Product Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
        onAddToCart={handleAddToCart}
      />

      {/* ✅ Footer */}
      <Footer handleTabClick={handleTabClick} />

      {/* ✅ Cart Drawer */}
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </div>
  );
};

export default Index;

// ✅ Contact Form
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", phoneNumber: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/add-message", formData);
      if(response.data.success){
        alert("Message sent successfully!");
        setFormData({ name: "", phoneNumber: "", comment: "" });
      }
    } catch {
      alert("Failed to send message. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div>
        <Label>Name</Label>
        <Input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label>Phone Number</Label>
        <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
        <Label>Comment</Label>
        <Textarea name="comment" value={formData.comment} onChange={handleChange} rows={4} required />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

// ✅ Footer Component
const Footer = ({handleTabClick}) => (
  <footer className="bg-[#d9d4d4] w-full mx-4 mb-4 mt-8">
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 pb-6">
        <div className="md:col-span-1 lg:col-span-2 pt-4">
          <img src={Logo} className="w-26 h-20" />
          <p className="text-sm text-gray-500 italic leading-relaxed max-w-md">
            American Shoe Express is a humanitarian project of BoxBreaker Global, providing
            high-quality footwear while supporting charitable initiatives across Africa.
          </p>
        </div>

        <div className="md:col-span-1">
          <ul className="space-y-2 pt-10">
            {["Men", "Womens", "Unisex", "Children", "Teen"].map((link) => (
              <li key={link}>
                <a href="#products" onClick={()=>{handleTabClick(link)}} className="text-black hover:text-gray-700 text-m">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <ul className="space-y-2 pt-10">
            {["Sneakers", "Dress", "Boots", "Sandals", "Sliders"].map((link) => (
              <li key={link}>
                <a href="#products" onClick={()=>{handleTabClick(link)}} className="text-black hover:text-gray-700 text-m">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-1">
          <ul className="space-y-2 pt-10">
            <li><a href="#" className="text-black hover:text-gray-700 text-m">Facebook</a></li>
            <li><a href="#" className="text-black hover:text-gray-700 text-m">Instagram</a></li>
            <li><a href="#" className="text-black hover:text-gray-700 text-m">Disclaimer</a></li>
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

      <div className="border-t border-black my-6"></div>

      <div className="text-center space-y-2">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-gray-500 text-sm">
          <p>© American Shoe Express. All Rights Reserved 2023.</p>
          <p>Telephone: +233 53 884 7703</p>
        </div>
        <p className="text-m text-gray-500">
          All online payments are securely processed through Box Breaker Global's verified Paystack merchant account.
        </p>
      </div>
    </div>
  </footer>
);
