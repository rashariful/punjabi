import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { toast } = useToast();
  const { addToCart, addToWishlist, state } = useStore();

  const handleAddToCart = () => {
    const cartItem = {
      id: `${product.id}-${product.sizes[0]}-${product.colors[0]}`,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0], // Default to first available size
      color: product.colors[0], // Default to first available color
      quantity: 1,
    };

    addToCart(cartItem);
    
    console.log("Adding to cart:", product.name);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    console.log("Adding to wishlist:", product.name);
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="product-card group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.sale && (
            <Badge className="bg-destructive text-destructive-foreground">
              Sale
            </Badge>
          )}
          {product.newArrival && (
            <Badge className="bg-accent text-accent-foreground">
              New
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 bg-background/80 hover:bg-background"
            onClick={handleAddToWishlist}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            className="w-full btn-gold"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ৳{product.originalPrice}
            </span>
          )}
        </div>

        {/* Fabric & Colors */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="capitalize">{product.fabric}</span>
          <span>{product.colors.length} colors</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;