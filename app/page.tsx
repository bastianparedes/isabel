import { cookies } from "next/headers";
import SiteContent, { type Language } from "./site-content";

const LANGUAGE_COOKIE = "isabel-site-language";

export default async function Home() {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const initialLanguage: Language = savedLanguage === "en" ? "en" : "de";

  return <SiteContent initialLanguage={initialLanguage} />;
}
