'use client';

import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
import { Heart, X, Plus } from "lucide-react";

interface Palette {
  bg: string;
  bg2: string;
  gold: string;
  goldSoft: string;
  rose: string;
  cream: string;
  lavender: string;
}

const palette: Palette = {
  bg: "#150C1F",
  bg2: "#241531",
  gold: "#E7B95C",
  goldSoft: "rgba(231,185,92,0.28)",
  rose: "#D8768A",
  cream: "#F3E9DC",
  lavender: "#9C8FAE",
};

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  gold: boolean;
}

interface CountdownBlock {
  value: number;
  label: string;
}

function nextDecemberFirst(): Date {
  const now = new Date();
  const year =
    now.getMonth() === 11 && now.getDate() > 1
      ? now.getFullYear() + 1
      : now.getFullYear();

  const d = new Date(year, 11, 1, 0, 0, 0);

  if (d.getTime() < now.getTime()) {
    d.setFullYear(d.getFullYear() + 1);
  }

  return d;
}

function formatDateEs(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function useCountdown(target: Date): CountdownState {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, target.getTime() - now);
  const totalSeconds = Math.floor(remaining / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: remaining <= 0,
  };
}

export default function App() {
  const [targetDate, setTargetDate] = useState<Date>(nextDecemberFirst);
  const countdown = useCountdown(targetDate);

  const [reasons, setReasons] = useState<string[]>([
    "Porque tu risa es mi lugar favorito del mundo.",
    "Porque contigo hasta los días grises se sienten más ligeros.",
    "Porque me escuchas de verdad, no solo esperas tu turno para hablar.",
        "Porque construimos, entre los dos, algo que solo nosotros entendemos.",
    "Porque me haces querer ser una mejor persona, sin pedírmelo.",
    "Porque en los planes pequeños también encuentro los mejores recuerdos.",
    "Porque tu calma me sostiene cuando el mundo se acelera.",
    "Porque elegirte no ha dejado de sentirse como la decisión correcta.",
  ]);

  const [newReason, setNewReason] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Generar las estrellas una sola vez (compatible con React 19)
  const [stars] = useState<Star[]>(() =>
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 6,
      duration: Math.random() * 3 + 3,
      gold: Math.random() > 0.75,
    }))
  );

  function addReason(): void {
    const text = newReason.trim();
    if (!text) return;

    setReasons((r) => [...r, text]);
    setNewReason("");
    inputRef.current?.focus();
  }

  function removeReason(index: number): void {
    setReasons((r) => r.filter((_, i) => i !== index));
  }

  function handleDateChange(
    e: ChangeEvent<HTMLInputElement>
  ): void {
    const [y, m, d] = e.target.value
      .split("-")
      .map(Number);

    if (!y || !m || !d) return;

    setTargetDate(new Date(y, m - 1, d));
  }

  function handleReasonKeyDown(
    e: KeyboardEvent<HTMLInputElement>
  ): void {
    if (e.key === "Enter") {
      addReason();
    }
  }

  const dateInputValue =
    `${targetDate.getFullYear()}-` +
    `${pad(targetDate.getMonth() + 1)}-` +
    `${pad(targetDate.getDate())}`;

  const blocks: CountdownBlock[] = [
    {
      value: countdown.days,
      label: "días",
    },
    {
      value: countdown.hours,
      label: "horas",
    },
    {
      value: countdown.minutes,
      label: "minutos",
    },
    {
      value: countdown.seconds,
      label: "segundos",
    },
  ];

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: `radial-gradient(
          ellipse at 50% -10%,
          ${palette.bg2} 0%,
          ${palette.bg} 55%
        )`,
        color: palette.cream,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap');

        .font-display {
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .font-body {
          font-family: 'Jost', sans-serif;
        .tabular {
          font-variant-numeric: tabular-nums;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: .15;
          }

          50% {
            opacity: 1;
          }
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8) sepia(1) saturate(3) hue-rotate(0deg);
          cursor: pointer;
        }
      `}</style>

      {/* campo de estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute rounded-full"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: s.gold
                ? palette.gold
                : palette.cream,
              animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28 font-body">

        {/* ---------- CUENTA REGRESIVA ---------- */}

        <header className="text-center mb-16 md:mb-24">

          <p
            className="text-xs md:text-sm tracking-[0.35em] uppercase mb-5"
            style={{ color: palette.gold }}
          >
            Cuenta regresiva
          </p>

          <h1
            className="font-display italic text-3xl md:text-5xl leading-tight mb-3"
            style={{ color: palette.cream }}
          >
            Faltan para el {formatDateEs(targetDate)}
          </h1>

          <div className="flex items-center justify-center gap-2 mt-6 mb-10">
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: palette.lavender }}
            >
              cambiar fecha
            </span>

            <input
              type="date"
              value={dateInputValue}
              onChange={handleDateChange}
              className="bg-transparent text-sm px-2 py-1 outline-none border-b"
              style={{
                borderColor: palette.goldSoft,
                color: palette.cream,
                colorScheme: "dark",
              }}
            />
          </div>

          {countdown.done ? (
            <p
              className="font-display italic text-2xl"
              style={{ color: palette.rose }}
            >
              El día ha llegado.
            </p>
          ) : (
            <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
              {blocks.map((b, i) => (
                <div
                  key={b.label}
                  className="flex items-center gap-3 md:gap-6"
                >
                  <div className="flex flex-col items-center min-w-17.5 md:min-w-22.5">
                    <span
                      className="font-display tabular text-5xl md:text-6xl leading-none"
                      style={{ color: palette.gold }}
                    >
                      {pad(b.value)}
                    </span>

                    <span
                      className="text-[11px] md:text-xs uppercase tracking-[0.25em] mt-2"
                      style={{ color: palette.lavender }}
                    >
                      {b.label}
                    </span>
                  </div>
                                  {i < blocks.length - 1 && (
                    <span
                      className="font-display text-3xl md:text-4xl -mt-4"
                      style={{ color: palette.goldSoft }}
                    >
                      :
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </header>

        {/* separador con corazón */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: palette.goldSoft }}
          />
          <Heart
            size={16}
            style={{ color: palette.rose }}
            fill={palette.rose}
          />
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: palette.goldSoft }}
          />
        </div>

        {/* ---------- RAZONES ---------- */}
        <section>
          <div className="text-center mb-12">
            <h2
              className="font-display italic text-3xl md:text-4xl mb-2"
              style={{ color: palette.cream }}
            >
              Razones para estar contigo
            </h2>

            <p
              className="text-sm"
              style={{ color: palette.lavender }}
            >
              una lista que sigue creciendo, {reasons.length}{" "}
              {reasons.length === 1 ? "razón" : "razones"} por ahora
            </p>
          </div>

          <ul className="space-y-0 mb-8">
            {reasons.map((reason, i) => (
              <li
                key={i}
                className="group flex items-start gap-4 py-4 border-b"
                style={{
                  borderColor: "rgba(231,185,92,0.12)",
                }}
              >
                <Heart
                  size={14}
                  className="mt-1.5 shrink-0"
                  style={{ color: palette.rose }}
                  fill={palette.rose}
                />

                <p
                  className="flex-1 font-display italic text-lg md:text-xl leading-relaxed"
                  style={{ color: palette.cream }}
                >
                  {reason}
                </p>

                <button
                  onClick={() => removeReason(i)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1.5"
                  aria-label="Eliminar razón"
                >
                  <X
                    size={15}
                    style={{ color: palette.lavender }}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* añadir nueva razón */}
          <div className="flex items-center gap-3 pt-2">
            <Plus
              size={16}
              className="shrink-0"
              style={{ color: palette.gold }}
            />

            <input
              ref={inputRef}
              type="text"
              value={newReason}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewReason(e.target.value)
              }
              onKeyDown={handleReasonKeyDown}
              placeholder="Escribe una razón más..."
              className="flex-1 bg-transparent outline-none text-base font-body py-2 border-b"
              style={{
                borderColor: palette.goldSoft,
                color: palette.cream,
              }}
            />
                    <button
              onClick={addReason}
              className="text-xs uppercase tracking-widest px-4 py-2 border rounded-full transition-colors"
              style={{
                borderColor: palette.gold,
                color: palette.gold,
              }}
            >
              Añadir
            </button>
          </div>
        </section>

        {/* ---------- FOOTER ---------- */}
        <footer className="text-center mt-20 md:mt-28">
          <p
            className="font-display italic text-sm"
            style={{ color: palette.lavender }}
          >
            hecho con cariño, hoy {formatDateEs(new Date())}
          </p>
        </footer>
      </div>
    </div>
  );
}
