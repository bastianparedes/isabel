"use client";

import Image from "next/image";
import {
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Mail,
  Phone,
} from "lucide-react";
import { useState } from "react";

const LANGUAGE_COOKIE = "isabel-site-language";

const contactDetails = {
  email: "b.paredes.dev@gmail.com",
  phone: "+56993426163",
  phoneDisplay: "+56 9 9342 6163",
  calendar: "https://calendar.app.google/v5Z8EMTL6uDCEbgv6",
  instagram: "https://www.instagram.com/bastian.p.p",
  linkedin: "https://www.linkedin.com/in/bastianparedes/",
} as const;

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
    qualification:
      "Psychologin · Masterstudium Clinical Psychology and Psychotherapy (laufend)",
    aboutEyebrow: "Über mich",
    aboutTitle: "Hallo, ich bin Isabel",
    aboutParagraphs: [
      "Ich bin Psychologin und studiere derzeit im Master Clinical Psychology and Psychotherapy. Ich glaube, dass über das zu sprechen, was uns beschäftigt, mit einem Menschen, der wirklich zuhört, bereits der Anfang einer Veränderung sein kann.",
      "Deutsch ist meine Muttersprache und ich spreche fließend Englisch. Du kannst dich also in der Sprache ausdrücken, in der du dich am wohlsten fühlst. Jeder Mensch ist anders: Ich passe die Begleitung an deine Bedürfnisse an – nicht umgekehrt.",
    ],
    servicesEyebrow: "Angebot",
    servicesTitle: "Meine psychologischen Angebote",
    services: [
      {
        title: "Übungen mit Virtual Reality",
        image: "/services/virtual-reality.jpg",
        imageAlt: "Person mit VR-Headset bei einer therapeutischen Übung",
        description:
          "In einer geschützten virtuellen Umgebung können herausfordernde Situationen in deinem Tempo vorbereitet und geübt werden.",
      },
      {
        title: "Gesprächstherapie",
        image: "/services/talk-therapy.webp",
        imageAlt: "Psychologisches Gespräch in einer Praxis",
        description:
          "Regelmäßige Gespräche bieten Raum, Gedanken und Gefühle zu sortieren, Belastendes anzusprechen und gemeinsam nächste Schritte zu entwickeln.",
      },
      {
        title: "Klinisch-psychologische Begleitung",
        image: "/services/clinical-support.webp",
        imageAlt: "Frau nimmt zu Hause an einem psychologischen Videogespräch teil",
        description:
          "Individuelle Unterstützung bei emotionalen Belastungen, mit Fokus auf Emotionsregulation und alltagstaugliche Bewältigungsstrategien.",
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
    bookAppointment: "Termin vereinbaren",
    contactLead:
      "Schreib mir, und ich melde mich so bald wie möglich. Das erste Gespräch ist unverbindlich.",
    languageSelector: "Sprache auswählen",
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
      "Psychologist · Master’s in Clinical Psychology and Psychotherapy (in progress)",
    aboutEyebrow: "About me",
    aboutTitle: "Hello, I’m Isabel",
    aboutParagraphs: [
      "I’m a psychologist currently studying for a Master’s in Clinical Psychology and Psychotherapy. I believe that talking about what’s going on with someone who truly listens can be the beginning of change.",
      "German is my native language, and I speak English fluently. You can express yourself in whichever language feels most comfortable. Everyone is different: I adapt the support to your needs, not the other way around.",
    ],
    servicesEyebrow: "Services",
    servicesTitle: "Psychological support tailored to you",
    services: [
      {
        title: "Virtual reality exercises",
        image: "/services/virtual-reality.jpg",
        imageAlt: "Person wearing a VR headset during a therapy exercise",
        description:
          "In a supportive virtual environment, you can prepare for and practise challenging situations at your own pace.",
      },
      {
        title: "Ongoing talk therapy",
        image: "/services/talk-therapy.webp",
        imageAlt: "Psychological therapy session in a therapist's office",
        description:
          "Regular conversations offer space to explore thoughts and feelings, talk through what is difficult and work out next steps together.",
      },
      {
        title: "Clinical psychological support",
        image: "/services/clinical-support.webp",
        imageAlt: "Woman taking part in an online therapy session from home",
        description:
          "Individual support for emotional difficulties, focusing on emotional regulation and practical coping strategies for everyday life.",
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
    bookAppointment: "Book an appointment",
    contactLead:
      "Get in touch and I’ll reply as soon as I can. The initial conversation comes with no obligation.",
    languageSelector: "Select language",
  },
  es: {
    brand: "Isabel · Psicóloga",
    navigationLabel: "Navegación principal",
    aboutNav: "Sobre mí",
    servicesNav: "Servicios",
    processNav: "Cómo funciona",
    book: "Contacto",
    eyebrow: "Acompañamiento psicológico · Online y presencial",
    headline: "Un espacio seguro para comprender lo que sientes",
    lead: "Acompañamiento psicológico cercano, respetuoso y sin juicios, en alemán y en inglés. Un primer paso para sentirte mejor, a tu ritmo.",
    firstConversation: "Concertar una primera conversación",
    viewServices: "Ver servicios",
    qualification:
      "Psicóloga · Máster en Clinical Psychology and Psychotherapy (en curso)",
    aboutEyebrow: "Sobre mí",
    aboutTitle: "Hola, soy Isabel",
    aboutParagraphs: [
      "Soy psicóloga y actualmente estoy cursando el máster Clinical Psychology and Psychotherapy. Creo que hablar sobre lo que nos preocupa con alguien que escucha de verdad puede ser el comienzo de un cambio.",
      "El alemán es mi lengua materna y hablo inglés con fluidez. Puedes expresarte en el idioma con el que te sientas más a gusto. Cada persona es diferente: adapto el acompañamiento a tus necesidades, y no al revés.",
    ],
    servicesEyebrow: "Servicios",
    servicesTitle: "Acompañamiento psicológico a tu medida",
    services: [
      {
        title: "Ejercicios con realidad virtual",
        image: "/services/virtual-reality.jpg",
        imageAlt: "Persona con gafas de realidad virtual durante un ejercicio terapéutico",
        description:
          "En un entorno virtual seguro, puedes prepararte y practicar situaciones difíciles a tu ritmo.",
      },
      {
        title: "Terapia de conversación",
        image: "/services/talk-therapy.webp",
        imageAlt: "Sesión de acompañamiento psicológico en una consulta",
        description:
          "Las conversaciones periódicas ofrecen un espacio para explorar pensamientos y emociones, hablar de lo que te preocupa y encontrar juntos los siguientes pasos.",
      },
      {
        title: "Acompañamiento psicológico clínico",
        image: "/services/clinical-support.webp",
        imageAlt: "Mujer participando desde casa en una sesión psicológica por videollamada",
        description:
          "Apoyo individual ante dificultades emocionales, con énfasis en la regulación emocional y en estrategias prácticas para el día a día.",
      },
    ],
    modalities: "Sesiones: ",
    online: "online",
    videoCall: " (por videollamada) y ",
    inPerson: "presenciales",
    languages: ". Idiomas: ",
    german: "alemán",
    and: " e ",
    english: "inglés",
    processEyebrow: "Cómo funciona",
    processTitle: "Un proceso claro y sin compromiso",
    process: [
      {
        title: "Primer contacto",
        description:
          "Ponte en contacto conmigo y hablaremos brevemente para ver si puedo ayudarte.",
      },
      {
        title: "Primera conversación",
        description:
          "Nos conoceremos, me contarás tu situación y definiremos juntos tus objetivos.",
      },
      {
        title: "Acompañamiento",
        description:
          "Conversaciones periódicas y seguimiento de tu progreso, siempre a tu ritmo.",
      },
    ],
    commitmentEyebrow: "Mi compromiso",
    commitmentTitle: "Lo que puedes esperar",
    commitments: [
      "Confidencialidad y un trato respetuoso",
      "Escucha activa y sin juicios",
      "Acompañamiento adaptado a ti",
      "Formación continua en psicología clínica",
      "Conversaciones en el idioma en el que te sientas más a gusto",
    ],
    contactEyebrow: "Contacto",
    contactTitle: "Dar el primer paso suele ser lo más difícil",
    bookAppointment: "Agendar una cita",
    contactLead:
      "Escríbeme y te responderé lo antes posible. La primera conversación no implica ningún compromiso.",
    languageSelector: "Seleccionar idioma",
  },
} as const;

export type Language = keyof typeof content;

export default function HomeContent({
  initialLanguage,
}: {
  initialLanguage: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const text = content[language];

  function changeLanguage(nextLanguage: string) {
    if (nextLanguage !== "de" && nextLanguage !== "en" && nextLanguage !== "es") {
      return;
    }

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
            <select
              className="language-select"
              aria-label={text.languageSelector}
              value={language}
              onChange={(event) => changeLanguage(event.currentTarget.value)}
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
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
                <div className="box service-box" key={service.title}>
                  <Image
                    className="service-image"
                    src={service.image}
                    alt={service.imageAlt}
                    width={824}
                    height={1030}
                    loading={
                      service.image === "/services/virtual-reality.jpg"
                        ? "eager"
                        : undefined
                    }
                  />
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
            <div className="contact-methods">
              <a className="btn" href={`mailto:${contactDetails.email}`}>
                <Mail aria-hidden="true" size={18} />
                {contactDetails.email}
              </a>
              <a className="btn" href={`tel:${contactDetails.phone}`}>
                <Phone aria-hidden="true" size={18} />
                {contactDetails.phoneDisplay}
              </a>
              <a
                className="btn"
                href={contactDetails.calendar}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CalendarDays aria-hidden="true" size={18} />
                {text.bookAppointment}
              </a>
            </div>
            <p className="contact-links">
              <a
                className="btn ghost"
                href={`https://wa.me/${contactDetails.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L4 20l1.2-4A8.5 8.5 0 1 1 20.5 11.5Z" />
                  <path d="M8.7 8.2c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4-.1.6.5 1 1.3 1.8 2.3 2.3.2.1.4.1.6-.1l.6-.5c.2-.2.4-.2.6-.1l1.7.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.5.2-1.2.3-2.1 0a9.2 9.2 0 0 1-4.9-4.9c-.3-.9-.2-1.6 0-2.1Z" />
                </svg>
                WhatsApp
              </a>
              <a
                className="btn ghost"
                href={contactDetails.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Camera aria-hidden="true" size={18} />
                Instagram
              </a>
              <a
                className="btn ghost"
                href={contactDetails.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BriefcaseBusiness aria-hidden="true" size={18} />
                LinkedIn
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <p>© 2026 {text.brand}</p>
        </div>
      </footer>
    </>
  );
}
