import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";

import { AppProvider } from "@/components/providers/app-provider";
import { AppRouter } from "@/router";
import SectionLoader from "@/components/section-loader";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<SectionLoader text="Loading..." />}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </Suspense>
  </StrictMode>,
);
