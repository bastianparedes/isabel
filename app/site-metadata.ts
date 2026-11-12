export const siteUrl = "https://isabelclinic.de";
export const LANGUAGE_COOKIE = "site-language";
export const siteLanguages = ["de", "en", "es"] as const;
export type SiteLanguage = (typeof siteLanguages)[number];

const localizedMetadata: Record<
  SiteLanguage,
  { title: string; description: string }
> = {
  de: {
    title: "Isabel · Psychologin",
    description:
      "Psychologische Begleitung auf Deutsch und Englisch: Gesprächstherapie, klinische Unterstützung und Virtual-Reality-Übungen - online und vor Ort.",
  },
  en: {
    title: "Isabel · Psychologist",
    description:
      "Psychological support in German and English: talk therapy, clinical support and virtual reality exercises, online and in person.",
  },
  es: {
    title: "Isabel · Psicóloga",
    description:
      "Acompañamiento psicológico en alemán e inglés: terapia de conversación, apoyo clínico y ejercicios de realidad virtual, online y presencial.",
  },
};

export function isSiteLanguage(language: string): language is SiteLanguage {
  return siteLanguages.some((siteLanguage) => siteLanguage === language);
}

export function getLocalizedTitle(language: SiteLanguage): string {
  return localizedMetadata[language].title;
}

export function getLocalizedDescription(language: SiteLanguage): string {
  return localizedMetadata[language].description;
}
