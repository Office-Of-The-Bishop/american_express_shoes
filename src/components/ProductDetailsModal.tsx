import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ShoppingCart } from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailsModal = ({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: ProductDetailsModalProps) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Product Images Carousel */}
          <div className="w-full">
            {product.images && product.images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                        <img
                          src={image}
                          alt={`${product.name} - View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            ) : (
              <div className="aspect-square overflow-hidden rounded-lg bg-muted" />
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                {product.gender.join(" / ")} • {product.shoeType}
              </p>
              <p className="text-3xl font-bold text-accent mb-4">
                ₵{product.price}
              </p>
              <p className="text-base text-muted-foreground mb-4">
                {product.description}
              </p>
            </div>

            {/* Extra Details */}
            <div className="space-y-2 border-t pt-2">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Item Number:</span>
                <span className="text-sm text-muted-foreground">{product.itemNumber}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Gender:</span>
                <span className="text-sm text-muted-foreground">{product.gender.join(" / ")}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Type:</span>
                <span className="text-sm text-muted-foreground">{product.shoeType}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">American Size:</span>
                <span className="text-sm text-muted-foreground">{product.AmericanSize}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Ghanaian Size:</span>
                <span className="text-sm text-muted-foreground">{product.GhanaianSize}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Retail Cost:</span>
                <span className="text-sm text-muted-foreground">₵{product.retailCost}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Cost Price:</span>
                <span className="text-sm text-muted-foreground">₵{product.price}</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Shoe Status:</span>
                <span className="text-sm text-muted-foreground">
                  {Array.isArray(product.shoeStatus)
                    ? product.shoeStatus.join(", ")
                    : product.shoeStatus}
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-sm font-medium">Stock Available:</span>
                <span className="text-sm text-muted-foreground">{product.quantity} units</span>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full mt-4"
              disabled={product.quantity === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
