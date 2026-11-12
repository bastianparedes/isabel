import type { Metadata } from "next";
import { getLocalizedTitle, siteUrl } from "../site-metadata";
import "../globals.css";
import "../romantic.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: getLocalizedTitle("de"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
