"use client";

import { useState } from "react";

const LANGUAGE_COOKIE = "isabel-site-language";

const content = {
  de: {
    brand: "Isabel · Psychologin",
    navigationLabel: "Hauptnavigation",
    aboutNav: "Über mich",
    servicesNav: "Angebot",
    processNav: "Ablauf",
    book: "Kontakt",
    eyebrow: "Psychologische Begleitung · Online und vor Ort",
    headline: "Ein sicherer Raum, um zu verstehen, was du fühlst",
    lead: "Eine einfühlsame, respektvolle und wertfreie psychologische Begleitung auf Deutsch und Englisch. Ein erster Schritt, damit es dir besser geht – in deinem Tempo.",
    firstConversation: "Erstes Gespräch vereinbaren",
    viewServices: "Angebot ansehen",
    qualification: "Psychologin · Masterstudium Klinische Psychologie (laufend)",
    aboutEyebrow: "Über mich",
    aboutTitle: "Hallo, ich bin Isabel",
    aboutParagraphs: [
      "Ich bin Psychologin und studiere derzeit im Master Klinische Psychologie. Ich glaube, dass über das zu sprechen, was uns beschäftigt, mit einem Menschen, der wirklich zuhört, bereits der Anfang einer Veränderung sein kann.",
      "Deutsch ist meine Muttersprache und ich spreche fließend Englisch. Du kannst dich also in der Sprache ausdrücken, in der du dich am wohlsten fühlst. Jeder Mensch ist anders: Ich passe die Begleitung an deine Bedürfnisse an – nicht umgekehrt.",
    ],
    servicesEyebrow: "Angebot",
    servicesTitle: "Wobei kann ich dich begleiten?",
    services: [
      {
        title: "Einzelgespräche",
        description:
          "Ein persönlicher Raum, um deine Anliegen zu besprechen – aufmerksam und vertraulich.",
      },
      {
        title: "Stress und Ängste",
        description:
          "Praktische Impulse, um besser zu verstehen, was in dir vorgeht, und im Alltag wieder mehr Ruhe zu finden.",
      },
      {
        title: "Veränderungsphasen",
        description:
          "Übergänge, das Leben in einem anderen Land, Fernbeziehungen, wichtige Entscheidungen oder schwierige Zeiten.",
      },
      {
        title: "Emotionales Wohlbefinden",
        description:
          "Selbstkenntnis, Selbstwertgefühl und Gewohnheiten, die deine psychische Gesundheit langfristig stärken.",
      },
    ],
    modalities: "Angebot: ",
    online: "online",
    videoCall: " (Videogespräch) und ",
    inPerson: "vor Ort",
    languages: ". Sprachen: ",
    german: "Deutsch",
    and: " und ",
    english: "Englisch",
    processEyebrow: "Ablauf",
    processTitle: "Ein klarer, unverbindlicher Ablauf",
    process: [
      {
        title: "Erster Kontakt",
        description:
          "Du schreibst mir und wir sprechen kurz darüber, ob ich dich unterstützen kann.",
      },
      {
        title: "Erstes Gespräch",
        description:
          "Wir lernen uns kennen, du erzählst mir von deiner Situation und wir legen gemeinsam deine Ziele fest.",
      },
      {
        title: "Begleitung",
        description:
          "Regelmäßige Gespräche und ein gemeinsamer Blick auf deine Entwicklung – immer in deinem Tempo.",
      },
    ],
    commitmentEyebrow: "Meine Haltung",
    commitmentTitle: "Darauf kannst du dich verlassen",
    commitments: [
      "Vertraulichkeit und respektvoller Umgang",
      "Aktives Zuhören ohne Bewertung",
      "Eine Begleitung, die auf dich abgestimmt ist",
      "Kontinuierliche Weiterbildung in klinischer Psychologie",
      "Gespräche in deiner bevorzugten Sprache",
    ],
    contactEyebrow: "Kontakt",
    contactTitle: "Der erste Schritt ist oft der schwerste",
    contactLead:
      "Schreib mir, und ich melde mich so bald wie möglich. Das erste Gespräch ist unverbindlich.",
    email: "correo@ejemplo.com",
    crisis:
      "Diese Website bietet allgemeine Informationen und ersetzt keine medizinische oder psychologische Notfallversorgung. Wenn du dich in einer Krise befindest oder Gefahr besteht, wende dich bitte an den Notruf oder Krisendienst in deinem Land.",
    switchLanguage: "Sprache auf Englisch umstellen",
  },
  en: {
    brand: "Isabel · Psychologist",
    navigationLabel: "Main navigation",
    aboutNav: "About me",
    servicesNav: "Services",
    processNav: "How it works",
    book: "Get in touch",
    eyebrow: "Psychological support · Online and in person",
    headline: "A safe space to understand what you’re feeling",
    lead: "Warm, respectful and non-judgmental psychological support in German and English. A first step towards feeling better, at your own pace.",
    firstConversation: "Arrange an initial conversation",
    viewServices: "Explore services",
    qualification:
      "Psychologist · Master’s in Clinical Psychology (in progress)",
    aboutEyebrow: "About me",
    aboutTitle: "Hello, I’m Isabel",
    aboutParagraphs: [
      "I’m a psychologist currently studying for a Master’s in Clinical Psychology. I believe that talking about what’s going on with someone who truly listens can be the beginning of change.",
      "German is my native language, and I speak English fluently. You can express yourself in whichever language feels most comfortable. Everyone is different: I adapt the support to your needs, not the other way around.",
    ],
    servicesEyebrow: "Services",
    servicesTitle: "How can I support you?",
    services: [
      {
        title: "One-to-one sessions",
        description:
          "A personal space to explore what’s on your mind, with attentive listening and confidentiality.",
      },
      {
        title: "Stress and anxiety",
        description:
          "Practical tools to understand what you’re experiencing and find more calm in everyday life.",
      },
      {
        title: "Times of change",
        description:
          "Life transitions, living abroad, long-distance relationships, important decisions or difficult periods.",
      },
      {
        title: "Emotional wellbeing",
        description:
          "Self-awareness, self-esteem and habits that support your mental health over the long term.",
      },
    ],
    modalities: "Sessions: ",
    online: "online",
    videoCall: " (video call) and ",
    inPerson: "in person",
    languages: ". Languages: ",
    german: "German",
    and: " and ",
    english: "English",
    processEyebrow: "How it works",
    processTitle: "A clear process, with no pressure",
    process: [
      {
        title: "First contact",
        description:
          "Get in touch and we’ll have a brief conversation to see if I can help.",
      },
      {
        title: "First session",
        description:
          "We’ll get to know each other, talk about your situation and set goals together.",
      },
      {
        title: "Ongoing support",
        description:
          "Regular sessions and check-ins on your progress, always at your pace.",
      },
    ],
    commitmentEyebrow: "My commitment",
    commitmentTitle: "What you can expect",
    commitments: [
      "Confidentiality and respectful care",
      "Active listening, without judgment",
      "Support tailored to you",
      "Ongoing training in clinical psychology",
      "Sessions in the language you feel most comfortable using",
    ],
    contactEyebrow: "Contact",
    contactTitle: "Taking the first step is the hardest part",
    contactLead:
      "Get in touch and I’ll reply as soon as I can. The initial conversation comes with no obligation.",
    email: "correo@ejemplo.com",
    crisis:
      "This website provides general information and is not a substitute for emergency care. If you are in crisis or at risk, please contact the emergency or crisis services in your country.",
    switchLanguage: "Switch language to German",
  },
} as const;

export type Language = keyof typeof content;

export default function SiteContent({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const text = content[language];

  function toggleLanguage() {
    const nextLanguage = language === "de" ? "en" : "de";
    document.cookie = `${LANGUAGE_COOKIE}=${nextLanguage}; Path=/; Max-Age=31536000; SameSite=Lax${
      window.location.protocol === "https:" ? "; Secure" : ""
    }`;
    document.documentElement.lang = nextLanguage;
    setLanguage(nextLanguage);
  }

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="logo" href="#inicio">
            {text.brand}
          </a>
          <nav aria-label={text.navigationLabel}>
            <a href="#sobre-mi">{text.aboutNav}</a>
            <a href="#servicios">{text.servicesNav}</a>
            <a href="#proceso">{text.processNav}</a>
            <a className="btn" href="#contacto">
              {text.book}
            </a>
            <button
              className="language-toggle"
              type="button"
              onClick={toggleLanguage}
              aria-label={text.switchLanguage}
              aria-pressed={language === "en"}
            >
              {language === "de" ? "English" : "Deutsch"}
            </button>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">{text.eyebrow}</div>
              <h1>{text.headline}</h1>
              <p className="lead">{text.lead}</p>
              <p className="hero-actions">
                <a className="btn" href="#contacto">
                  {text.firstConversation}
                </a>
                <a className="btn ghost" href="#servicios">
                  {text.viewServices}
                </a>
              </p>
            </div>
            <div className="card-hero" aria-hidden="true">
              <div className="mono">Ψ</div>
              <small>{text.qualification}</small>
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="alt">
          <div className="wrap two">
            <div>
              <div className="eyebrow">{text.aboutEyebrow}</div>
              <h2>{text.aboutTitle}</h2>
            </div>
            <div>
              {text.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios">
          <div className="wrap">
            <div className="eyebrow">{text.servicesEyebrow}</div>
            <h2>{text.servicesTitle}</h2>
            <div className="cols">
              {text.services.map((service) => (
                <div className="box" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              ))}
            </div>
            <p className="service-details">
              {text.modalities}
              <strong>{text.online}</strong>
              {text.videoCall}
              <strong>{text.inPerson}</strong>
              {text.languages}
              <strong>{text.german}</strong>
              {text.and}
              <strong>{text.english}</strong>.
            </p>
          </div>
        </section>

        <section id="proceso" className="alt">
          <div className="wrap">
            <div className="eyebrow">{text.processEyebrow}</div>
            <h2>{text.processTitle}</h2>
            <div className="cols">
              {text.process.map((step, index) => (
                <div className="box" key={step.title}>
                  <div className="num">{index + 1}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap two">
            <div>
              <div className="eyebrow">{text.commitmentEyebrow}</div>
              <h2>{text.commitmentTitle}</h2>
            </div>
            <ul className="tick">
              {text.commitments.map((commitment) => (
                <li key={commitment}>{commitment}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="contacto" className="alt contact">
          <div className="wrap">
            <div className="eyebrow">{text.contactEyebrow}</div>
            <h2>{text.contactTitle}</h2>
            <p className="lead">{text.contactLead}</p>
            <p>
              <a className="btn" href={`mailto:${text.email}`}>
                {text.email}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>{text.crisis}</p>
          <p>© 2026 {text.brand}</p>
        </div>
      </footer>
    </>
  );
}
