'use client';

import { useState, useRef } from "react";
import { JSX } from "react/jsx-runtime";

type ReasonSection = {
  title: string;
  reasons: string[];
};

const REASON_SECTIONS: ReasonSection[] = [
  {
    title: 'Quién eres',
    reasons: [
      'Hablas 3 idiomas',
      'Tu acento',
      'Eres graciosa',
      'Tu pierna',
    ],
  },
  {
    title: 'Cómo me haces sentir',
    reasons: [
      'Me siento muy cómodo hablando contigo',
      'Me relajas',
      'Puedo ser vulnerable contigo',
      'Agrandas mi ego cuando me dices que soy lindo',
    ],
  },
  {
    title: 'Lo que compartimos',
    reasons: [
      'Recuerdas las cosas que te digo',
      'Tenemos los mismos hermanos',
      'Quedarte despierta hasta tarde hablando conmigo',
      'Me enseñas alemán',
      'Juegas videojuegos conmigo',
    ],
  },
  {
    title: 'Sin filtro',
    reasons: [
      'Me dijiste "estúpido"',
      'Haces que esté pendiente del teléfono esperando tus mensajes',
      'No duermo bien por las noches por pensar en ti',
    ],
  },
];

type Answer = 'yes' | null;

type Position = {
  x: number;
  y: number;
};

export default function Proposal(): JSX.Element {
  const propose = false;
  const [noButtonPosition, setNoButtonPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [attempts, setAttempts] = useState<number>(0);
  const [answer, setAnswer] = useState<Answer>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const moveButtonAway = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    const container = containerRef.current;
    const button = noButtonRef.current;

    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxX = Math.max(0, containerRect.width - buttonRect.width);
    const maxY = Math.max(0, containerRect.height - buttonRect.height);

    const cursorX = event.clientX - containerRect.left;
    const cursorY = event.clientY - containerRect.top;

    const minimumDistance =
      Math.max(buttonRect.width, buttonRect.height) * 1.3;

    let newX: number;
    let newY: number;
    let searchAttempts = 0;

    do {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;

      const centerX = newX + buttonRect.width / 2;
      const centerY = newY + buttonRect.height / 2;

      const distance = Math.hypot(
        centerX - cursorX,
        centerY - cursorY
      );

      searchAttempts++;

      if (distance >= minimumDistance || searchAttempts > 30) {
        break;
      }
    } while (true);

    setNoButtonPosition({ x: newX!, y: newY! });
    setAttempts((current) => current + 1);
  };

  if (answer === 'yes') {
    return (
      <div
        className="min-h-screen w-full flex items-center justify-center px-6"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, #fff9f0 0%, #f3e4d8 55%, #e8d2c2 100%)',
          fontFamily: "'Lora', Georgia, serif",
        }}
      >
        <div className="text-center max-w-md">
          <div
            className="mx-auto mb-8 flex items-center justify-center"
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #c4374a, #7a1d2c)',
              boxShadow: '0 6px 18px rgba(122, 29, 44, 0.35)',
            }}
          >
            <span style={{ color: '#f3d9b8', fontSize: '26px', fontFamily: "'Playfair Display', serif" }}>
              &amp;
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              color: '#5c2a2e',
              fontStyle: 'italic',
            }}
          >
            Sabía que dirías que sí
          </h1>

          <p style={{ color: '#8a5a52', fontSize: '1.2rem', letterSpacing: '0.02em' }}>
            Gracias por hacerme la persona más feliz, Isabel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center py-16 px-4"
      style={{
        background: '#ece1d3',
        fontFamily: "'Lora', Georgia, serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,500;1,600&family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

        .love-letter {
          background-color: #fbf6ec;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(155, 44, 62, 0.035), transparent 38%),
            radial-gradient(circle at 82% 78%, rgba(201, 160, 92, 0.05), transparent 42%);
          position: relative;
        }
        .love-letter::before {
          content: '';
          position: absolute;
          inset: 14px;
          border: 1px solid rgba(155, 44, 62, 0.18);
          pointer-events: none;
        }
        .seal-wrap {
          opacity: 0;
          transform: translateY(-14px) scale(0.85);
          animation: drop-seal 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
        }
        @keyframes drop-seal {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .ink-line {
          opacity: 0;
          transform: translateY(8px);
          animation: write-in 0.6s ease-out forwards;
        }
        @keyframes write-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .seal-wrap, .ink-line { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
        .section-mark {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
        }
      `}</style>

      <div className="w-full max-w-2xl">
        <div className="love-letter rounded-sm shadow-xl px-8 md:px-16 py-14 md:py-20">

          <header className="text-center mb-14 relative">
            <div className="seal-wrap mx-auto mb-7 flex items-center justify-center" style={{ width: '58px', height: '58px' }}>
              <div
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 32% 28%, #c4374a, #7a1d2c 70%)',
                  boxShadow: '0 4px 10px rgba(122, 29, 44, 0.3), inset 0 1px 2px rgba(255,255,255,0.25)',
                }}
              >
                <span style={{ color: '#f3d9b8', fontSize: '22px', fontFamily: "'Playfair Display', serif" }}>
                  I
                </span>
              </div>
            </div>

            <p
              className="text-xs uppercase mb-4"
              style={{ color: '#b08968', letterSpacing: '0.3em' }}
            >
              Para Isabel
            </p>

            <h1
              className="text-4xl md:text-5xl leading-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#5c2a2e',
                fontStyle: 'italic',
                fontWeight: 600,
              }}
            >
              Algunas razones por las que me gustas
            </h1>

            <div className="flex items-center justify-center gap-3 mt-6">
              <span style={{ height: '1px', width: '48px', background: 'rgba(155, 44, 62, 0.3)' }} />
              <span className="section-mark text-xl" style={{ color: '#c9a05c' }}>♥</span>
              <span style={{ height: '1px', width: '48px', background: 'rgba(155, 44, 62, 0.3)' }} />
            </div>
          </header>

          <div className="space-y-12">
            {REASON_SECTIONS.map((section, sectionIndex) => (
              <section key={sectionIndex}>
                <h2
                  className="section-mark text-2xl mb-5 flex items-center gap-3"
                  style={{ color: '#9b2c3e' }}
                >
                  <span aria-hidden="true" style={{ color: '#c9a05c', fontSize: '1rem' }}>✦</span>
                  {section.title}
                </h2>

                <ul className="space-y-3.5">
                  {section.reasons.map((reason, reasonIndex) => {
                    return (
                      <li
                        key={reasonIndex}
                        className="ink-line flex items-start gap-3 pl-1"
                        style={{
                          borderBottom: '1px solid rgba(155, 44, 62, 0.12)',
                          paddingBottom: '0.85rem',
                          animationDelay: `${0.15 + reasonIndex * 0.05}s`,
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 shrink-0"
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            background: '#c9a05c',
                          }}
                        />
                        <p
                          className="text-base md:text-lg leading-relaxed"
                          style={{ color: '#5c3a3a' }}
                        >
                          {reason}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p
              className="section-mark text-xl"
              style={{ color: '#9b2c3e' }}
            >
              y muchas más que aún no caben aquí.
            </p>
          </div>
        </div>

        {propose && (
          <div
            ref={containerRef}
            className="relative rounded-sm shadow-xl border px-6 py-10 md:py-14 text-center overflow-hidden mt-8"
            style={{ minHeight: '260px', background: '#fbf6ec', borderColor: 'rgba(155, 44, 62, 0.18)' }}
          >
            <h2
              className="text-2xl md:text-3xl mb-2"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#5c2a2e', fontStyle: 'italic' }}
            >
              Isabel, ¿quieres ser mi novia?
            </h2>

            <p style={{ color: '#b08968' }} className="text-sm mb-10">
              Solo tienes que elegir una opción.
            </p>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={() => setAnswer('yes')}
                type="button"
                className="px-8 py-3 rounded-full text-white font-medium text-lg shadow-md active:scale-95 transition-all duration-150"
                style={{ background: '#9b2c3e' }}
              >
                Sí
              </button>

              <button
                ref={noButtonRef}
                type="button"
                onMouseEnter={moveButtonAway}
                onClick={moveButtonAway}
                style={
                  attempts > 0
                    ? {
                        left: `${noButtonPosition.x}px`,
                        position: 'absolute' as const,
                        top: `${noButtonPosition.y}px`,
                        transition: 'left 0.25s ease, top 0.25s ease',
                        background: '#fff',
                        color: '#9b2c3e',
                        borderColor: 'rgba(155, 44, 62, 0.3)',
                      }
                    : {
                        background: '#fff',
                        color: '#9b2c3e',
                        borderColor: 'rgba(155, 44, 62, 0.3)',
                      }
                }
                className="px-8 py-3 rounded-full font-medium text-lg border shadow-sm hover:shadow-md"
              >
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
