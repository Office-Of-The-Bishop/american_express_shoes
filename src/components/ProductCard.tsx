import { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {product.images && product.images.length > 0 && (
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardContent className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.gender} • {product.shoeType}
        </p>
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <p className="text-2xl font-bold text-accent">₵{product.price}</p>
          <p className="text-sm text-muted-foreground">Stock: {product.quantity}</p>
        </div>
        <Button 
          onClick={() => onProductClick(product)}
          variant="outline"
          className="w-full"
          size="sm"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};
