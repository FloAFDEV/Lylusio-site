import { useState, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Lazy load the main app for faster initial render
const App = lazy(() => import("./App.tsx"));

// Inline minimal loader for immediate feedback
const MinimalLoader = () => (
  <div 
    className="fixed inset-0 bg-background flex items-center justify-center"
    role="status"
    aria-label="Chargement de l'application"
  >
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

const SESSION_KEY = "lylusio_visited";

const Root = () => {
  const [hasVisited] = useState(() => {
    const visited = sessionStorage.getItem(SESSION_KEY);
    if (!visited) {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    return !!visited;
  });

  return (
    <Suspense fallback={hasVisited ? null : <MinimalLoader />}>
      <App />
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(<Root />);