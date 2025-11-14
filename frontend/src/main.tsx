import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found.");
}

const root = createRoot(rootElement);

if (!publishableKey) {
  console.error(
    "Missing Clerk publishable key. Set VITE_CLERK_PUBLISHABLE_KEY in your environment."
  );
  root.render(
    <div className="flex min-h-screen items-center justify-center bg-slate-900 text-white">
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-lg font-semibold">Clerk configuration is missing.</p>
        <p className="mt-2 text-sm text-white/70">
          Add VITE_CLERK_PUBLISHABLE_KEY to your environment and restart the dev
          server.
        </p>
      </div>
    </div>
  );
} else {
  root.render(
    <ClerkProvider publishableKey={publishableKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  );
}
