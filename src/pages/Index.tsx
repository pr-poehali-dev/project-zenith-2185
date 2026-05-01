import { FlowerHeader } from "@/components/flower/FlowerHeader";
import { FlowerHero } from "@/components/flower/FlowerHero";
import { OccasionsSection } from "@/components/flower/OccasionsSection";
import { CatalogSection } from "@/components/flower/CatalogSection";
import { ProductsSection } from "@/components/flower/ProductsSection";
import { HowWeWorkSection } from "@/components/flower/HowWeWorkSection";
import { AboutSection } from "@/components/flower/AboutSection";
import { TeamSection } from "@/components/flower/TeamSection";
import { ReviewsSection } from "@/components/flower/ReviewsSection";
import { ContactSection } from "@/components/flower/ContactSection";
import { FlowerFooter } from "@/components/flower/FlowerFooter";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <FlowerHeader />
      <main>
        <FlowerHero />
        <OccasionsSection />
        <CatalogSection />
        <ProductsSection />
        <HowWeWorkSection />
        <AboutSection />
        <TeamSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <FlowerFooter />
    </div>
  );
}
