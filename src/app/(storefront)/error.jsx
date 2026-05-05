"use client";

import StorefrontErrorView from "@/components/errors/StorefrontErrorView";

export default function StorefrontError({ error: _error, reset }) {
  return <StorefrontErrorView reset={reset} />;
}
