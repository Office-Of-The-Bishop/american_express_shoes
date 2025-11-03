import React, { useEffect, useState } from "react";
import logo from "../assets/American Shoe Logo - transparent.png";
import ShoppingCart from "./ShoppingCart";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";

export const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const blackTabs = ["Men", "Womens", "Unisex", "Children", "Teen"];
  const redTabs = ["Sneakers", "Dress", "Sandals", "Boots"];

  useEffect(() => {
    const stored = localStorage.getItem("selected");
    if (stored) setActiveTab(stored);
  }, []);

  const handleTabClick = (tabValue: string): void => {
    localStorage.setItem("selected", tabValue);
    setActiveTab(tabValue);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-white backdrop-blur">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 shrink-0" aria-label="Home">
            <img src={logo} alt="American Shoe Express" className="w-24 h-auto" />
          </a>

          {/* Center Tabs (Desktop) */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center text-sm font-medium">
            {[...blackTabs, ...redTabs].map((tab) => (
              <a
                key={tab}
                href={`#${tab.toLowerCase()}`}
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

          {/* Right Side (Search + Cart for Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <input
              type="search"
              placeholder="Search..."
              className="h-10 w-60 rounded-lg border border-black/10 px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
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
            {/* Search Box */}
            <input
              type="search"
              placeholder="Search..."
              className="w-full h-10 rounded-lg border border-black/10 bg-white px-4 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            />

            {/* Tabs List */}
            <ul className="grid grid-cols-2 gap-3">
              {[...blackTabs, ...redTabs].map((tab) => (
                <li key={tab}>
                  <a
                    href={`#${tab.toLowerCase()}`}
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
  );
};

export default Navbar;
