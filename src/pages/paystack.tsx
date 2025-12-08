import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaystackPop from "@paystack/inline-js";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useCart } from "@/hooks/useCart";

// import { useCartStore } from "../store/cart";

export default function PaystackCheckout() {
  // const { setItemsCount } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Helper to get query params
  const getQueryParam = (param: string) => {
    return new URLSearchParams(location.search).get(param);
  };

  const accessCode = getQueryParam("access_code");
  const ref = getQueryParam("ref");
  const { clearCart, } = useCart();

  useEffect(() => {
    const startPayment = async () => {
      if (!accessCode) {
        console.error("No access code provided");
        return;
      }

      try {
        const popup = new PaystackPop();
        popup.resumeTransaction(accessCode).callbacks.onSuccess = async () => {
          // Call backend to verify payment
          await axios
            .get(`/paystack-callback?ref=${ref}`)
            .then((res) => {
              if (res.data.status === "success" || res.data.success) {
                clearCart();
                toast({ title: "Order placed successfully!" });
                navigate("/");
              }
            });
        };
      } catch (error) {
        console.error("Payment failed:", error);
      }
    };

    startPayment();
  }, [accessCode, navigate]);

  return (
    <div className="dark:text-white2 dark:bg-black not-dark:bg-white2 w-dvw h-dvh fixed top-0 left-0 z-[999999] flex flex-col justify-center items-center">
      <LoaderCircle className="animate-spin" size={60} />
    </div>
  );
}
