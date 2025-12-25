import { useState } from 'react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductImage = ({ product, onProductClick }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];
  const hasMultipleImages = images.length > 1;

  const retailPrice = product.price ? Math.round(product.price / 0.77) : 0;
  const discountPercentage =
    product.price && product.retail_cost
      ? Math.round(((Number(product.retail_cost) - product.price) / Number(product.retail_cost)) * 100)
      : 0;

  const nextImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Card onClick={() => onProductClick(product)} className="flex flex-col justify-between hover:shadow-lg transition-shadow bg-white border-solid border-black border-[2px] w-full sm:w-[250px] md:w-[300px] lg:w-[300px]">
      {/* Image Carousel Section */}
      {images.length > 0 && (
        <div onClick={(e)=>{e.stopPropagation()}} className="relative aspect-square overflow-hidden bg-white">
          <img
            src={getImageUrl(images[currentImageIndex])}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 text-[#8B4513]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 text-[#8B4513]" />
              </button>
            </>
          )}

          {/* Image Dots Indicator */}
          {hasMultipleImages && (
            <div onClick={(e)=>{e.stopPropagation()}} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToImage(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-[#8B4513] w-2.5 h-2.5'
                      : 'bg-[#8B4513]/40'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </Card>
  );
};
