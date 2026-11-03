import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { HOME_DESCRIPTION, HOME_TITLE, organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";
import Hero from "@/components/sections/Hero";
import PartnerMarquee from "@/components/sections/PartnerMarquee";
import Statement from "@/components/sections/Statement";
import SolutionsScroller from "@/components/sections/SolutionsScroller";
import Metrics from "@/components/sections/Metrics";
import Method from "@/components/sections/Method";
import HorizontalGallery from "@/components/sections/HorizontalGallery";
import Testimonials from "@/components/sections/Testimonials";
import Reach from "@/components/sections/Reach";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  absoluteTitle: true,
  description: HOME_DESCRIPTION,
  path: "/",
  image: "/og/home.jpg",
});

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
      <Hero />
      <PartnerMarquee />
      <Statement />
      <SolutionsScroller />
      <Metrics />
      <Method />
      <HorizontalGallery />
      <Reach />
      <Testimonials />
    </>
  );
}
