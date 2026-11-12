import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeContent from "../home-content";
import {
  getLocalizedDescription,
  getLocalizedTitle,
  isSiteLanguage,
  siteLanguages,
  siteUrl,
} from "../site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSiteLanguage(lang)) {
    notFound();
  }

  const localizedUrls = Object.fromEntries(
    siteLanguages.map((siteLanguage) => [
      siteLanguage,
      `${siteUrl}/${siteLanguage}`,
    ]),
  );
  const url = `${siteUrl}/${lang}`;
  const title = getLocalizedTitle(lang);
  const description = getLocalizedDescription(lang);
  const image = `${url}/opengraph-image`;
  const imageAlt = {
    de: "Isabel - psychologische Begleitung auf Deutsch und Englisch",
    en: "Isabel - psychological support in German and English",
    es: "Isabel - acompañamiento psicológico en alemán e inglés",
  }[lang];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...localizedUrls, "x-default": `${siteUrl}/de` },
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Isabel",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

export default async function LanguageHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSiteLanguage(lang)) {
    notFound();
  }

  return <HomeContent initialLanguage={lang} />;
}
