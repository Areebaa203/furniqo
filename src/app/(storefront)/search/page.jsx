import { Suspense } from "react";
import SearchResultsView from "@/components/search/SearchResultsView";

export const metadata = {
  title: "Search · Furniqo",
  description: "Search the Furniqo catalog.",
};

function SearchFallback() {
  return (
    <main className="pb-16 pt-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-home-body text-sm text-neutral-600">Loading search…</p>
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchResultsView />
    </Suspense>
  );
}
