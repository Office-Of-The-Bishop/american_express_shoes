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
import { getImageUrl } from '@/lib/utils';

interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;

}

export const ProductImageModal = ({
  product,
  open,
  onOpenChange,

}: ProductDetailsModalProps) => {
  if (!product) return null;

  // const handleAddToCart = () => {
  //   onAddToCart(product);
  //   onOpenChange(false);
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-xl h-[90vh]">
        {/* <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader> */}

        <div className="w-full h-full">
          {/* Product Images Carousel */}
          <div className="w-full h-full">
            {product.images && product.images.length > 0 ? (
              <Carousel className="w-full h-full">
                <CarouselContent className="w-full h-full">
                  {product.images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="h-full w-full flex items-center justify-center"
                    >
                      {/* IMAGE CONSTRAINT ZONE */}
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <img
                          src={getImageUrl(image)}
                          alt={`${product.name} - ${index + 1}`}
                          className="
                  max-w-full
                  max-h-[84vh]
                  object-contain
                  select-none
                "
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="left-4 text-black" />
                <CarouselNext className="right-4 text-black" />
              </Carousel>
            ) : (
              <div className="aspect-square overflow-hidden rounded-lg bg-muted" />
            )}
          </div>

          {/* Product Details */}

        </div>
      </DialogContent>
    </Dialog>
  );
};
