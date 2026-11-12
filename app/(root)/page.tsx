import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isSiteLanguage, LANGUAGE_COOKIE } from "../site-metadata";

export default async function Home() {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get(LANGUAGE_COOKIE)?.value;
  const language =
    savedLanguage && isSiteLanguage(savedLanguage) ? savedLanguage : "de";

  redirect(`/${language}`);
}
