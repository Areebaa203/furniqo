import ReduxProvider from "@/store/ReduxProvider";
import SiteHeader from "@/components/home/SiteHeader";
import SiteFooter from "@/components/home/SiteFooter";
import NotFoundView from "@/components/errors/NotFoundView";

export const metadata = {
  title: "Page not found · Furniqo",
};

export default function NotFound() {
  return (
    <ReduxProvider>
      <div className="min-h-screen bg-[#F9F7F2] font-home-body antialiased">
        <SiteHeader />
        <NotFoundView />
        <SiteFooter />
      </div>
    </ReduxProvider>
  );
}
