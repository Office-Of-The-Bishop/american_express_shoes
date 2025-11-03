import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import axios from "axios";

const PaymentCallback = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get reference from URL or localStorage
        const reference = new URLSearchParams(window.location.search).get("reference")
          || localStorage.getItem("reference");

        const orderData = JSON.parse(localStorage.getItem("order") || "{}");
        // const formData = JSON.parse(localStorage.getItem("formData"))

        if (!reference || !orderData) {
          setStatus("Invalid payment reference or missing order data.");
          return;
        }

        const res = await axios.get(`/payment/verify/${reference}/${localStorage.getItem("order")}`);
        console.log(res)
        if (res.data.success) {
          
          
            setStatus("✅ Payment successful! Your order has been placed.");
            localStorage.removeItem("order");
            localStorage.removeItem("reference");
            // localStorage.removeItem("ufo-burgers-cart")
            console.log(res)
          
        } else {
          setStatus("❌ Payment failed. Please try again.");
        }
      } catch (err) {
        console.error(err);
        setStatus("🚫 Error verifying payment. Try again later.");
      }
    };

    verifyPayment();
  }, []);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
      <h1 className="text-2xl font-bold">{status}</h1>
      <Button 
        onClick={handleBackToHome}
        className="flex items-center gap-2 bg-primary hover:bg-primary/90"
      >
        <Home className="h-4 w-4" />
        Back to Home
      </Button>
    </div>
  );
};

export default PaymentCallback;
