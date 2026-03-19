import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/context/StoreContext';


const Wishlist = () => {
  const { state, removeFromWishlist, addToCart } = useStore();

  if (state.wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">
            Save your favorite organic products to your wishlist for easy access
          </p>
          <Link to="/products">
            <Button size="lg" className="bg-gradient-organic">
              Discover Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">
          {state.wishlist.length} item{state.wishlist.length !== 1 ? 's' : ''} saved for later
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.wishlist.map((product) => (
          <Card key={product.id} className="group overflow-hidden transition-all duration-300 hover:shadow-hover">
            <div className="relative">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image.startsWith('/') ? product.image : `/src/assets/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
              >
                <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              </Button>
            </div>

            <CardContent className="p-4">
              <Link to={`/products/${product.id}`}>
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-primary">
                    ৳ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ৳ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.weight}
                </span>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-orange-500 duration-300 hover:bg-orange-400"
                  // disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => removeFromWishlist(product.id)}
                  className="w-full"
                >
                  Remove from Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;