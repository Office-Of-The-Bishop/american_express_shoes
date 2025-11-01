import React from 'react';
import { Navbar } from '@/components/Navbar';

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              American Shoe Express Disclaimer
            </h1>
          </div>

          {/* Product Condition Section */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Product Condition
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              American Shoe Express offers two categories of footwear:
            </p>
            <ol className="list-decimal list-inside space-y-3 mb-4 text-muted-foreground">
              <li className="text-base md:text-lg leading-relaxed">
                Brand-new shoes that have never been worn.
              </li>
              <li className="text-base md:text-lg leading-relaxed">
                Slightly used shoes originally purchased in the United States and returned within a 14-day period by the first owner. These shoes may show minimal signs of use and have been carefully inspected before resale.
              </li>
            </ol>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              All items are sold in as-is condition. Condition levels may vary, and customers acknowledge this when purchasing.
            </p>
          </section>

          {/* No Returns or Exchanges Section */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              No Returns or Exchanges
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              All sales made through American Shoe Express are final. Due to the nature of our humanitarian model:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
              <li className="text-base md:text-lg leading-relaxed">No returns</li>
              <li className="text-base md:text-lg leading-relaxed">No refunds</li>
              <li className="text-base md:text-lg leading-relaxed">No exchanges</li>
              <li className="text-base md:text-lg leading-relaxed">No store credit</li>
            </ul>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              By completing a purchase, buyers agree to these terms and accept the product condition as described at checkout.
            </p>
          </section>

          {/* Payment Processing Section */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Payment Processing
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              All payments are securely processed by BoxBreaker Global through Paystack. By using our website and completing a purchase, you authorize BoxBreaker Global to process your payment.
            </p>
          </section>

          {/* No Guarantee of Availability Section */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              No Guarantee of Availability
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Inventory is limited and may change without notice. American Shoe Express cannot guarantee that specific styles, sizes, or brands will remain available.
            </p>
          </section>

          {/* Legal Notice Section */}
          <section className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Legal Notice
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
              American Shoe Express and BoxBreaker Global are not responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
              <li className="text-base md:text-lg leading-relaxed">Buyer's misunderstanding of product condition</li>
              <li className="text-base md:text-lg leading-relaxed">Wear and tear after purchase</li>
              <li className="text-base md:text-lg leading-relaxed">Sizing issues or comfort preferences</li>
              <li className="text-base md:text-lg leading-relaxed">Shipping delays caused by carriers or customs</li>
            </ul>
            <div className="bg-muted/50 p-6 rounded-lg border border-border">
              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                American Shoe Express is a humanitarian project of BoxBreaker Global. Our mission is to provide high-quality footwear while supporting charitable and development initiatives across Africa. 100% of proceeds from every purchase directly fund humanitarian programs run by BoxBreaker Global.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Purchases support philanthropic efforts and are not tax-deductible donations unless otherwise stated and supported with proper documentation.
              </p>
            </div>
          </section>

          {/* Thank You Section */}
          <section className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Thank You
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              By shopping with us, you are putting hope on someone's feet and strength in someone's journey. Every step you take helps someone walk forward.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm sm:text-base">© 2024 American Shoe Express. Crafted with passion for excellence.</p>
        </div>
      </footer>
    </div>
  );
};

export default Disclaimer;
