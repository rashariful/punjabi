import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import NewArrivals from "@/components/home/NewArrivals";
import SaleSection from "@/components/home/SaleSection";
import BestSelling from "@/components/home/BestSelling";
import EidCollection from "@/components/home/EidCollection";
import FestivalCollection from "@/components/home/FestivalCollection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSection from "@/components/home/PromoSection";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <NewArrivals />
      <SaleSection />
      <BestSelling />
      <EidCollection />
      <FestivalCollection />
      <FeaturedProducts />
      <PromoSection />
    </div>
  );
};

export default Index;
