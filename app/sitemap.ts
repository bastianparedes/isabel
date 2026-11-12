import type { MetadataRoute } from "next";
import { siteLanguages, siteUrl } from "./site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const alternateLanguages = Object.fromEntries(
    siteLanguages.map((language) => [
      language,
      `${siteUrl}/${language}`,
    ]),
  );

  return siteLanguages.map((language) => ({
    url: `${siteUrl}/${language}`,
    alternates: { languages: alternateLanguages },
  }));
}
