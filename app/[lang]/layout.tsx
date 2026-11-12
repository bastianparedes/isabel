import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  isSiteLanguage,
  siteLanguages,
  siteUrl,
} from "../site-metadata";
import "../globals.css";
import "../romantic.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return siteLanguages.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isSiteLanguage(lang)) {
    notFound();
  }

  return (
    <html lang={lang} className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
