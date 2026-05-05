"use client";

export default function DashboardError({ error: _error, reset }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center px-6 py-12">
      <h1 className="text-lg font-semibold text-gray-900">Something went wrong</h1>
      <p className="mt-2 max-w-sm text-center text-sm text-gray-600">
        This section hit an error. You can try again or return to the dashboard home.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Try again
        </button>
        <a
          href="/dashboard"
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Dashboard home
        </a>
      </div>
    </div>
  );
}
