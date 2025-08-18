import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { Sparkles, PartyPopper } from "lucide-react";

const FestivalCollection = () => {
  const festivalProducts = products.filter(product => product.festivalSpecial).slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-br from-accent/10 to-secondary/10 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PartyPopper className="w-8 h-8 text-accent" />
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary">
              Festival Collection
            </h2>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          
          <Badge className="bg-secondary text-secondary-foreground text-lg px-6 py-2 mb-4">
            Celebration Ready
          </Badge>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Make every celebration memorable with our vibrant festival collection. 
            From Durga Puja to Pohela Boishakh, we have the perfect Panjabi for every occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {festivalProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Festival Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-secondary text-secondary-foreground font-bold">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Festival
                </Badge>
              </div>
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/category/festive">
            <Button className="bg-gradient-secondary text-secondary-foreground px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:shadow-elegant hover:scale-105">
              Shop Festival Collection
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FestivalCollection;