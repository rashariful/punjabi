import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);
  const { toast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/categories">
            <Button className="btn-hero">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  // handle add to cart 
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose your preferred size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    console.log("Adding to cart:", {
      product: product.name,
      size: selectedSize,
      color: selectedColor || product.colors[0],
      quantity,
    });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
// handle add to wishlist 
  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log("Adding to wishlist:", product.name);
    
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    });
  };

  const features = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders above ৳2000"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% authentic fabrics"
    },
    {
      icon: RotateCcw,
      title: "7-Day Returns",
      description: "Hassle-free returns"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="section-container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/categories" className="hover:text-primary">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/categories">
            <Button variant="ghost" className="p-0 h-auto">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-xl overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail images would go here */}
            </div>
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-playfair font-bold text-primary mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {product.fabric}
                    </Badge>
                    {product.sale && <Badge className="bg-destructive">Sale</Badge>}
                    {product.newArrival && <Badge className="bg-accent">New</Badge>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleAddToWishlist}
                    className={isWishlisted ? "text-red-500 border-red-500" : ""}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-accent fill-accent"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ৳{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ৳{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-green-100 text-green-800">
                    Save ৳{(product.originalPrice - product.price).toLocaleString()}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-5  gap-2 sm:w-6/12 w-full ">
                {product.sizes.map(size => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className="aspect-square"
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color</h3>
              <div className="flex gap-2">
                {product.colors.map(color => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                className="flex-1 bg-orange-500 duration-300 hover:bg-orange-400"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p>• Premium quality {product.fabric} fabric</p>
                    <p>• Authentic traditional design with modern comfort</p>
                    <p>• Perfect for {product.category} occasions</p>
                    <p>• Available in {product.colors.length} beautiful colors</p>
                    <p>• Machine washable (gentle cycle recommended)</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Fabric Details</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>Material: {product.fabric}</li>
                        <li>Weight: Medium</li>
                        <li>Care: Machine wash cold</li>
                        <li>Origin: Bangladesh</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Size & Fit</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>Fit: Regular</li>
                        <li>Length: Knee-length</li>
                        <li>Available Sizes: {product.sizes.join(", ")}</li>
                        <li>Model wearing: Size 40</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <p>Customer reviews coming soon...</p>
                    <p className="text-sm mt-2">Be the first to review this product!</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;