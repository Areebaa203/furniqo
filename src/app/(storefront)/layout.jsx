import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import ReduxProvider from "@/store/ReduxProvider";

export default function StorefrontLayout({ children }) {
  return (
    <ReduxProvider>
      <div className="min-h-screen bg-[#f7f4ef] font-home-body antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </ReduxProvider>
  );
}
