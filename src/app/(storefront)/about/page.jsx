import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutStatsSection from "@/components/about/AboutStatsSection";
import AboutTimelineSection from "@/components/about/AboutTimelineSection";
import AboutHowWeWorkSection from "@/components/about/AboutHowWeWorkSection";
import AboutFaqSection from "@/components/about/AboutFaqSection";
import AboutNewsletterSection from "@/components/about/AboutNewsletterSection";
import AboutRecommendationsSection from "@/components/about/AboutRecommendationsSection";
import ValuePropsBand from "@/components/home/ValuePropsBand";

export const metadata = {
  title: "About · Furniqo",
  description: "Quality furniture, built for real life. Learn what drives Furniqo.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <AboutStatsSection />
      <AboutTimelineSection />
      <AboutHowWeWorkSection />
      <AboutNewsletterSection />
      <AboutRecommendationsSection />
      <ValuePropsBand sectionClassName="bg-[#FAF9F6] py-12 sm:py-16 lg:py-20" />
      <AboutFaqSection />
    </main>
  );
}
