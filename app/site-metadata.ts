const titles = {
  de: "Isabel · Psychologin",
  en: "Isabel · Psychologist",
  es: "Isabel · Psicóloga",
} as const;

export type SiteLanguage = keyof typeof titles;

export function getLocalizedTitle(language: SiteLanguage): string {
  return titles[language];
}
