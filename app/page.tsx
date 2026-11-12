import { cookies } from "next/headers";
import HomeContent, { type Language } from "./home-content";

const LANGUAGE_COOKIE = "isabel-site-language";

export default async function Home() {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const language: Language =
    savedLanguage === "en" || savedLanguage === "es" ? savedLanguage : "de";

  return <HomeContent initialLanguage={language} />;
}
