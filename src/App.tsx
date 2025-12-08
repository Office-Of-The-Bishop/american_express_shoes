import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PaymentCallback from "./pages/VerifyPayment";
import Disclaimer from "./pages/Disclaimer";

import axios from "axios"
import PaystackCheckout from "./pages/paystack";

const queryClient = new QueryClient();

// axios.defaults.baseURL="https://americanexpress-shoes-backend-1.onrender.com/api/v1"
// axios.defaults.baseURL='https://americanshoeexpress.com/api/api/v1'
axios.defaults.baseURL='http://127.0.0.1:8000/api/v1'



const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/verify-payment" element={<PaymentCallback />} />
            <Route path="/disclaimer" element={<Disclaimer/>}/>
            <Route path="/pay" element={<PaystackCheckout />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
