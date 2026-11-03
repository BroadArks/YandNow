import type { MetadataRoute } from "next";
import { BRAND, HOME_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND} Skill Development`,
    short_name: BRAND,
    description: HOME_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbfc",
    theme_color: "#16173d",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
