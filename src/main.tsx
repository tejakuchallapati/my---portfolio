import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import SocialIcons from "@/components/ui/social-icon";

import "./index.css";

const root = document.getElementById("hero-social-root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <div className="dark">
        <SocialIcons />
      </div>
    </StrictMode>
  );
}
