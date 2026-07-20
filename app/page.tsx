'use client';

import React, { JSX, useEffect, useMemo, useState } from "react";

/**
 * ────────────────────────────────────────────────────────────────
 * ROMANTIC PAGE — "long-distance love letter" theme (Chile → Germany)
 * React + TypeScript + TailwindCSS. No pre-built component libraries.
 * ────────────────────────────────────────────────────────────────
 * Edit the content in the constants marked "✏️ EDIT HERE"
 * to personalize the copy, date, and secret name.
 */

// ✏️ EDIT HERE — the date the relationship started
const START_DATE = new Date("2026-06-10T00:00:00");

// ✏️ EDIT HERE — secret keyword (checked case-insensitively, as a substring)
const SECRET_KEYWORD = "Bastián Gabriel Paredes Padget";

// ✏️ EDIT HERE — message revealed once the right word is typed
const SECRET_MESSAGE =
  "When we finally meet in person, I'll ask you to be my girlfriend and everybody will know you are my \"Polola\", because you are the one I choose, Isabel.";

// ✏️ EDIT HERE — the real itinerary toward being reunited
const ITINERARY = [
  {
    code: "01",
    title: "Talk every single day",
    detail: "Your good mornings that are my afternoons, my good nights that are your mornings.",
    stamp: "In progress",
  },
  {
    code: "02",
    title: "Play video games together",
    detail: "Even with terrible ping, I'd rather lose with you than win alone.",
    stamp: "In progress",
  },
  {
    code: "03",
    title: "Meet each other's families",
    detail: "Introduce ourselves where it counts: at the table of the other's home.",
    stamp: "Coming up",
  },
  {
    code: "04",
    title: "Fly to Germany",
    detail: "Cross the Atlantic, finally hold you, and ask you to be my girlfriend.",
    stamp: "The destination",
  },
];

// ✏️ EDIT HERE — things you love about her (click to reveal each one)
const LIKES = [
  {
    label: "Your smile",
    detail: "You turn the night into day."
  },
  {
    label: "Your patience with me",
    detail: "Thank you for taking care of my heart. It's a little fragile, and it's in your hands."
  },
  {
    label: "German",
    detail: "You motivate me to keep learning German."
  },
  {
    label: "You make me better",
    detail: "You make me want to become an even better person, both for myself and for us."
  },
  {
    label: "You listen to me",
    detail: "You never judge me when I tell you about my thoughts, feelings, or the things happening in my life."
  },
  {
    label: "You share your life with me",
    detail: "You share every part of your life with me—the sad moments, the happy ones, the ordinary, the boring, the frustrating, and even the private ones."
  },
  {
    label: "You're committing to us",
    detail: "I know you told me you're afraid of this becoming real and that you might end up getting hurt. But now I can see that, little by little, you're making it more and more real. For example, by introducing me to your family and by letting people on Discord know I'm your almost-boyfriend."
  },
  {
    label: "Your lips",
    detail: "I love every detail of your body, but if I had to choose my favorite, it would definitely be your lips."
  }
];

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getElapsed(from: Date): TimeLeft {
  const diff = Math.max(0, Date.now() - from.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

const HEART_FIELD = [
  { left: "6%", size: 14, delay: "0s", dur: "9s" },
  { left: "18%", size: 9, delay: "2s", dur: "11s" },
  { left: "32%", size: 12, delay: "4.5s", dur: "8s" },
  { left: "48%", size: 8, delay: "1s", dur: "12s" },
  { left: "63%", size: 13, delay: "3.5s", dur: "10s" },
  { left: "78%", size: 10, delay: "6s", dur: "9s" },
  { left: "90%", size: 11, delay: "0.5s", dur: "13s" },
];

export default function App(): JSX.Element {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Cormorant+Garamond:wght@400;500;600&family=Parisienne&family=Space+Mono:wght@400;700&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const [time, setTime] = useState<TimeLeft>(() => getElapsed(START_DATE));

  useEffect(() => {
    const id = setInterval(() => setTime(getElapsed(START_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const toggleReveal = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const [nameInput, setNameInput] = useState("");
  const unlocked = useMemo(
    () => nameInput.trim().toLowerCase().includes(SECRET_KEYWORD.toLowerCase()),
    [nameInput]
  );

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "radial-gradient(120% 90% at 50% 0%, #4A1420 0%, #33101C 45%, #250B15 100%)",
        fontFamily: "'Cormorant Garamond', serif",
        color: "#F6E6DE",
      }}
    >
      <style>{`
        @keyframes float-heart {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.55; }
          90% { opacity: 0.35; }
          100% { transform: translateY(-620px) scale(1.15); opacity: 0; }
        }
        @keyframes fly-path {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        @keyframes dash-move { to { stroke-dashoffset: -32; } }
        @keyframes rise-fade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes unfold {
          from { opacity: 0; transform: scaleY(0.85); }
          to { opacity: 1; transform: scaleY(1); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,87,0.0); }
          50% { box-shadow: 0 0 22px 2px rgba(212,168,87,0.25); }
        }
        .heart-particle { position: absolute; bottom: -40px; animation-name: float-heart; animation-timing-function: ease-in; animation-iteration-count: infinite; color: #E8748F; }
        .plane-anim {
          offset-path: path("M 12 92 C 90 24, 210 24, 288 10");
          animation: fly-path 7s linear infinite;
        }
        .dash-anim { animation: dash-move 1.8s linear infinite; }
        .rise { animation: rise-fade 0.6s ease both; }
        .unfold { animation: unfold 0.35s ease both; transform-origin: top; }
        .glow { animation: glow-pulse 3.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .plane-anim, .dash-anim, .rise, .unfold, .glow, .heart-particle { animation: none !important; }
        }
        input:focus-visible, button:focus-visible {
          outline: 2px solid #D4A857;
          outline-offset: 3px;
        }
      `}</style>

      {/* ───────────────── HERO ───────────────── */}
      <section className="relative overflow-hidden px-6 pt-24 pb-24 sm:pt-32 sm:pb-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {HEART_FIELD.map((h, i) => (
            <span
              key={i}
              className="heart-particle"
              style={{ left: h.left, fontSize: h.size, animationDelay: h.delay, animationDuration: h.dur }}
            >
              ♥
            </span>
          ))}
        </div>

        <div className="relative mx-auto max-w-3xl text-center">
          <p
            className="mb-6"
            style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.6rem", color: "#D4A857" }}
          >
            a letter from Chile, addressed to Germany
          </p>

          <h1
            className="text-4xl leading-[1.15] sm:text-6xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontStyle: "italic" }}
          >
            We have been together for
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base sm:text-lg" style={{ color: "#D9B8AE" }}>
            counting every heartbeat since June 10, 2026
          </p>

          {/* flight path */}
          <div className="relative mx-auto mt-10 h-24 max-w-md">
            <svg viewBox="0 0 300 100" className="h-full w-full" fill="none">
              <path
                d="M 12 92 C 90 24, 210 24, 288 10"
                stroke="#6B2A38"
                strokeWidth="2"
                strokeDasharray="1 11"
                strokeLinecap="round"
                className="dash-anim"
              />
              <circle cx="12" cy="92" r="4" fill="#D4A857" />
              <circle cx="288" cy="10" r="4" fill="#E8748F" />
              <text x="4" y="78" fill="#D9B8AE" fontSize="12" fontFamily="'Cormorant Garamond', serif">
                You
              </text>
              <text x="272" y="28" fill="#D9B8AE" fontSize="12" fontFamily="'Cormorant Garamond', serif">
                Me
              </text>
            </svg>
            <div className="plane-anim absolute left-0 top-0 text-lg" aria-hidden="true">
              💌
            </div>
          </div>

          {/* counter */}
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-4 gap-2 sm:gap-4">
            {[
              { value: time.days, label: "days" },
              { value: time.hours, label: "hours" },
              { value: time.minutes, label: "min" },
              { value: time.seconds, label: "sec" },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="glow rounded-2xl border px-2 py-4 sm:px-4 sm:py-6"
                style={{ borderColor: "#6B2A38", background: "rgba(74,20,32,0.55)" }}
              >
                <span
                  className="block text-2xl tabular-nums sm:text-4xl"
                  style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: "#F6E6DE" }}
                >
                  {unit.label === "days" ? unit.value : pad(unit.value)}
                </span>
                <span
                  className="mt-1 block text-[10px] tracking-[0.15em] sm:text-xs"
                  style={{ color: "#D4A857", fontFamily: "'Space Mono', monospace" }}
                >
                  {unit.label.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm" style={{ color: "#B98A94", fontStyle: "italic" }}>
            and counting, until we do not have to anymore.
          </p>
        </div>
      </section>

      {/* ───────────────── PLANS / ITINERARY ───────────────── */}
      {/* <section className="px-6 py-20 sm:py-28" style={{ background: "rgba(20,7,12,0.5)" }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-2 text-center"
            style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.5rem", color: "#D4A857" }}
          >
            what we are promising each other
          </p>
          <h2
            className="mb-12 text-center text-3xl sm:text-4xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontStyle: "italic" }}
          >
            Our road to Germany
          </h2>

          <div className="relative">
            <div
              className="absolute left-6.75 top-2 bottom-2 w-px sm:left-8.75"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, #6B2A38 0, #6B2A38 5px, transparent 5px, transparent 11px)",
              }}
              aria-hidden="true"
            />
            <ol className="space-y-8">
              {ITINERARY.map((step) => (
                <li key={step.code} className="relative flex gap-5 sm:gap-6">
                  <span
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border text-base sm:h-17.5 sm:w-17.5"
                    style={{
                      borderColor: "#D4A857",
                      background: "#33101C",
                      color: "#D4A857",
                      fontFamily: "'Fraunces', serif",
                      fontStyle: "italic",
                    }}
                  >
                    {step.code}
                  </span>
                  <div
                    className="flex-1 rounded-2xl border px-5 py-4"
                    style={{ borderColor: "#6B2A38", background: "rgba(74,20,32,0.4)" }}
                  >
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <h3
                        className="text-lg sm:text-xl"
                        style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}
                      >
                        {step.title}
                      </h3>
                      <span
                        className="shrink-0 text-xs italic"
                        style={{ color: step.stamp === "The destination" ? "#E8748F" : "#B98A94" }}
                      >
                        {step.stamp}
                      </span>
                    </div>
                    <p className="text-base" style={{ color: "#D9B8AE" }}>
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section> */}

      {/* ───────────────── THINGS I LOVE ABOUT YOU ───────────────── */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <p
            className="mb-2 text-center"
            style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.5rem", color: "#D4A857" }}
          >
            a bouquet of reasons
          </p>
          <h2
            className="mb-3 text-center text-3xl sm:text-4xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontStyle: "italic" }}
          >
            Things I love about you
          </h2>
          <p className="mb-10 text-center text-base" style={{ color: "#D9B8AE" }}>
            tap each heart to open it
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {LIKES.map((like, i) => {
              const open = revealed.has(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleReveal(i)}
                  aria-expanded={open}
                  className="rounded-2xl border p-4 text-left transition-colors sm:p-5"
                  style={{
                    borderColor: open ? "#E8748F" : "#6B2A38",
                    background: open ? "rgba(74,20,32,0.55)" : "rgba(51,16,28,0.5)",
                  }}
                >
                  <span
                    className="mb-2 block text-lg"
                    style={{ color: open ? "#E8748F" : "#8C4A56" }}
                    aria-hidden="true"
                  >
                    {open ? "❤" : "♡"}
                  </span>
                  <span
                    className="block text-base sm:text-lg"
                    style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, color: "#F6E6DE" }}
                  >
                    {like.label}
                  </span>
                  {open ? (
                    <p className="unfold mt-3 text-sm leading-relaxed" style={{ color: "#D9B8AE" }}>
                      {like.detail}
                    </p>
                  ) : (
                    <span className="mt-3 block text-xs italic" style={{ color: "#8C4A56" }}>
                      tap to open
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── SECRET SPOT ───────────────── */}
      <section className="px-6 py-20 sm:py-28" style={{ background: "rgba(20,7,12,0.5)" }}>
        <div className="mx-auto max-w-lg text-center">
          <p
            className="mb-2"
            style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.5rem", color: "#D4A857" }}
          >
            sealed with a kiss
          </p>
          <h2
            className="mb-3 text-3xl sm:text-4xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontStyle: "italic" }}
          >
            A secret letter
          </h2>
          <p className="mb-8 text-base" style={{ color: "#D9B8AE" }}>
            to open it, type my full name.
          </p>

          <label htmlFor="secret-name" className="sr-only">
            Type my full name
          </label>
          <input
            id="secret-name"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="my full name..."
            autoComplete="off"
            className="w-full rounded-full border bg-transparent px-5 py-3 text-center text-base outline-none"
            style={{
              borderColor: unlocked ? "#D4A857" : "#6B2A38",
              color: "#F6E6DE",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          />

          {true && (
            <div
              className="unfold mt-6 rounded-2xl border px-6 py-6 text-left"
              style={{ borderColor: "#D4A857", background: "rgba(74,20,32,0.55)" }}
            >
              <p
                className="mb-2"
                style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.3rem", color: "#D4A857" }}
              >
                for you
              </p>
              <p className="text-base leading-relaxed sm:text-lg" style={{ color: "#F6E6DE" }}>
                {SECRET_MESSAGE}
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="px-6 py-10 text-center">
        <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "1.3rem", color: "#8C4A56" }}>
          made with the distance still between us, for when there wont be any left
        </p>
      </footer>
    </div>
  );
}
