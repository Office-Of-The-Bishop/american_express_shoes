import { useState } from 'react';
import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];
  const hasMultipleImages = images.length > 1;

  // Calculate retail price (assuming 30% markup for discount calculation)
  const retailPrice = product.price ? Math.round(product.price / 0.77) : 0;
  const discountPercentage = product.price && product.retailCost 
    ? Math.round(((Number(product.retailCost) - product.price) / retailPrice) * 100) 
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

  // Format gender display
  

  const isNew = true; // You can add a property to Product type for this
  // const isSneakers = product.shoeType?.toLowerCase().includes('sneaker') || product.shoeType?.toLowerCase() === 'sneakers';

  return (
<Card className="hover:shadow-lg transition-shadow bg-[#F5F5DC] border-solid border-color-black border-[2px] w-full sm:w-[250px] md:w-[300px] lg:w-[300px]">
      {/* Image Carousel Section */}
      {images.length > 0 && (
        <div className="relative aspect-square overflow-hidden bg-white">
          <img 
            src={images[currentImageIndex]} 
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
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
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

      <CardContent className="p-4 bg-[#F5F5DC]">
        {/* Category */}
        <p className="text-xs text-red-700 uppercase tracking-wider mb-2 font-medium flex gap-2 flex-wrap">
            {
            product.gender.map((item)=>{
              return(
                <p>{item}</p>
              )
            })
          }
        
        </p>

        {/* Product Name */}
        <h3 className="font-bold text-2xl text-black">{product.name}</h3>

        <h3 className="text-[10px] text-black mb-2">{product.itemNumber}</h3>

        {/* <h2>{product.itemNumber}</h2> */}

        {/* Labels */}
        <div className='flex gap-2'>
            
          <div className="flex gap-2 mb-3 flex-wrap">
            {
              product.shoeStatus.map((item)=>{
                return(
                  <p className='bg-gray-400 p-2 font-semibold'>{item}</p>
                )
              })
            }
          
            
          </div>
          <div className="flex gap-2 mb-3 flex-wrap">
            {
              product.shoeType.map((item)=>{
                return(
                  <p className='bg-yellow-300 p-2 font-semibold'>{item}</p>
                )
              })
            }
          
            
          </div>
          <div className='bg-yellow-300 p-2 mb-3 font-semibold'><p>Size:<span className='ml-1'>{product.GhanaianSize}</span></p></div>
        </div>

        {/* Pricing Information */}
        <div className="mb-3 space-y-1">
          {Number(product.retailCost) > product.price && (
            <div className='flex gap-1'>
            <p className='text-sm text-gray-500'>Retail Price: </p>  
            <p className="text-sm text-gray-500 line-through">
              GHS {product.retailCost}
            </p>
            </div>
          )}
          <p className="text-xl font-bold text-green-600">
            Your Price: GHS {product.price}
          </p>
        </div>

        {/* Discount and Availability Badges */}
        <div className="flex gap-2 mb-4">
          {discountPercentage > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-red-800 text-white rounded">
              {discountPercentage}% Discount
            </span>
          )}
          <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-black rounded">
            Only {product.quantity || 0} Available.
          </span>
        </div>

        {/* View Details Button */}
        <Button 
          onClick={() => onProductClick(product)}
          variant="outline"
          className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white uppercase font-medium"
        >
          VIEW DETAILS
        </Button>
      </CardContent>
    </Card>
  );
};
