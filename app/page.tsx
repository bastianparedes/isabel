'use client';

import { useState, useRef } from "react";
import { JSX } from "react/jsx-runtime";

const REASONS: string[] = [
  'Me dijiste "estúpido"',
  'Hablas 3 idiomas',
  'Tu acento',
  'Recuerdas las cosas que te digo',
  'Me siento muy cómodo hablando contigo',
  'Me relajas',
  'Puedo ser vulnerable contigo',
  'Tenemos los mismos hermanos',
  'Haces que esté pendiente al teléfono esperando tus mensajes',
  'Agrandas mi ego cuando me dices que soy lindo',
  'Tu pierna',
  'Quedarte despierta hasta tarde hablando conmigo',
  'Me enseñas alemán',
  'Juegas videojuegos conmigo',
  'Eres graciosa',
  'Me recuerdas que el amor aún es posible',
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
      <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-rose-50 via-pink-50 to-orange-50 px-6">
        <div className="text-center">
          <p className="text-5xl mb-4">🌹</p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#8B4A5C] mb-3">
            Sabía que dirías que sí
          </h1>

          <p className="text-[#A56B7A] text-lg">
            Gracias por hacerme la persona más feliz, Isabel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#FBE9EC] via-[#FFF4F0] to-[#FBE9EC] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-[#C98B9C] mb-3">
            Isabel
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-[#8B4A5C] leading-tight">
            Algunas de las razones por las que me gustas
          </h1>

          <div className="flex items-center justify-center gap-2 mt-5">
            <span className="h-px w-10 bg-[#D9788F]/40" />
            <span className="text-[#D4A574] text-lg">✦</span>
            <span className="h-px w-10 bg-[#D9788F]/40" />
          </div>
        </header>

        <ul className="space-y-4 mb-14">
          {REASONS.map((reason, index) => (
            <li
              key={index}
              className="flex items-start gap-4 bg-[#FFF8F5]/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-sm border border-[#F3D6DC]"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#F3D6DC] text-[#B5586F] font-serif flex items-center justify-center mt-0.5">
                {index + 1}
              </span>

              <p className="text-[#7A4655] text-base md:text-lg leading-relaxed">
                {reason}
              </p>
            </li>
          ))}
        </ul>

        {propose && (<div
          ref={containerRef}
          className="relative bg-[#FFF8F5] rounded-3xl shadow-md border border-[#F3D6DC] px-6 py-10 md:py-14 text-center overflow-hidden"
          style={{ minHeight: '260px' }}
        >
          <h2 className="font-serif text-2xl md:text-3xl text-[#8B4A5C] mb-2">
            Isabel, ¿quieres ser mi novia?
          </h2>

          <p className="text-[#B98A96] text-sm mb-10">Solo tienes que elegir una opción.</p>

          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setAnswer('yes')}
              type="button"
              className="px-8 py-3 rounded-full bg-[#D9788F] text-white font-medium text-lg shadow-md hover:bg-[#C9657D] active:scale-95 transition-all duration-150"
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
                    }
                  : undefined
              }
              className="px-8 py-3 rounded-full bg-white text-[#B5586F] font-medium text-lg border border-[#E8B7C2] shadow-sm hover:shadow-md"
            >
              No
            </button>
          </div>
        </div>)}
      </div>
    </div>
  );
}
