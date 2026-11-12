import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import "./romantic.css";

const LANGUAGE_COOKIE = "isabel-site-language";

export const metadata: Metadata = {
  title: "Isabel · Psychologin",
  description:
    "Einfühlsame psychologische Begleitung auf Deutsch und Englisch, online und vor Ort.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const language =
    savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : "de";

  return (
    <html lang={language} className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
