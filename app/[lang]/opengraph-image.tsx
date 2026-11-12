import { ImageResponse } from "next/og";
import { isSiteLanguage } from "../site-metadata";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const imageCopy = {
  de: {
    title: "Psychologische Begleitung",
    detail: "auf Deutsch und Englisch",
    format: "Online · Vor Ort",
    role: "Psychologin",
  },
  en: {
    title: "Psychological support",
    detail: "in German and English",
    format: "Online · In person",
    role: "Psychologist",
  },
  es: {
    title: "Acompañamiento psicológico",
    detail: "en alemán e inglés",
    format: "Online · Presencial",
    role: "Psicóloga",
  },
} as const;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSiteLanguage(lang)) {
    throw new Error(`Unsupported image language: ${lang}`);
  }

  const text = imageCopy[lang];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#f7f3ed",
          color: "#283b37",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 2 }}>
          ISABEL · {text.role}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.15 }}>
            {text.title}
          </div>
          <div style={{ fontSize: 36, color: "#65736c" }}>{text.detail}</div>
        </div>
        <div style={{ fontSize: 28, color: "#65736c" }}>{text.format}</div>
      </div>
    ),
    size,
  );
}
