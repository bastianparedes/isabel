"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CONFETTI_COLORS = [
  "#ff5d8f",
  "#17b68a",
  "#ffcf4a",
  "#6c63ff",
  "#ffffff",
  "#ff9a3c",
  "#3cc7ff",
];
const CANDLE_COUNT = 26;
const CANDLE_STORAGE_KEY = "birthday-candles-out";
const CANDLE_COLORS = ["#17b68a", "#6c63ff", "#ff5d8f", "#ff9a3c"];

const BALLOONS = [
  { left: "6%", color: "var(--sun)", delay: "0s" },
  { left: "22%", color: "var(--mint)", delay: "2.4s" },
  { left: "44%", color: "#fff", delay: "1.2s" },
  { left: "68%", color: "var(--sun)", delay: "3.6s" },
  { left: "86%", color: "var(--mint)", delay: ".6s" },
  { left: "14%", color: "#3cc7ff", delay: "4.4s" },
  { left: "34%", color: "#ff9a3c", delay: "5.5s" },
  { left: "56%", color: "var(--violet)", delay: "3s" },
  { left: "76%", color: "#3cc7ff", delay: "6.2s" },
];

type ConfettiPiece = {
  id: number;
  left: string;
  color: string;
  delay: string;
};

export default function Home() {
  const [candlesExtinguished, setCandlesExtinguished] = useState(0);
  const [candlesLoaded, setCandlesLoaded] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const nextConfettiId = useRef(0);

  const launchConfetti = useCallback((count: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pieces = Array.from({ length: count }, (_, index) => ({
      id: nextConfettiId.current++,
      left: `${Math.random() * 100}vw`,
      color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
      delay: `${Math.random() * 0.9}s`,
    }));
    const ids = new Set(pieces.map(({ id }) => id));

    setConfetti((current) => [...current, ...pieces]);
    window.setTimeout(
      () => setConfetti((current) => current.filter(({ id }) => !ids.has(id))),
      4200,
    );
  }, []);

  useEffect(() => {
    const savedCount = window.sessionStorage.getItem(CANDLE_STORAGE_KEY);
    const parsedCount =
      savedCount === "true" ? CANDLE_COUNT : Number.parseInt(savedCount ?? "0", 10);
    setCandlesExtinguished(
      Number.isNaN(parsedCount)
        ? 0
        : Math.min(CANDLE_COUNT, Math.max(0, parsedCount)),
    );
    setCandlesLoaded(true);
  }, []);

  function extinguishCandles() {
    if (!candlesLoaded || candlesExtinguished >= CANDLE_COUNT) return;

    const nextCount = candlesExtinguished + 1;
    window.sessionStorage.setItem(CANDLE_STORAGE_KEY, String(nextCount));
    setCandlesExtinguished(nextCount);
    if (nextCount === CANDLE_COUNT) launchConfetti(70);
  }

  return (
    <>
      <header className="hero">
        {BALLOONS.map((balloon) => (
          <span
            className="b"
            key={balloon.left}
            style={{
              left: balloon.left,
              background: balloon.color,
              animationDelay: balloon.delay,
            }}
            aria-hidden="true"
          />
        ))}
        <h1>¡Feliz cumpleaños, Isabel!</h1>
        <p className="de">Herzlichen Glückwunsch zum Geburtstag!</p>
        <div className="big px">26</div>
        <p className="date px">29 de noviembre</p>
      </header>
      <div className="rb" aria-hidden="true" />

      <main>
        <section className="box msg" aria-label="Mensaje">
          <h2 className="px">Para ti</h2>
          <p>
            Isabel, hoy empieza tu año 26. Que sea un año de buenas noticias,
            de un máster que avance con calma y de muchas conversaciones en
            español que te salgan cada vez más fluidas.
          </p>
          <p>
            Mereces un día entero de celebración, con pastel, risas y muchos videojuegos.
          </p>
          <p className="de2">
            Ich wünsche dir einen wunderschönen Geburtstag und ein tolles neues
            Lebensjahr!
          </p>
          <p className="px sig">— Aster</p>
        </section>

        <section className="box" aria-label="Deseos">
          <h2 className="px">Mis deseos para ti</h2>
          <div className="grid">
            <div className="g">
              <b>Que ganes</b>
              <small>en tus videojuegos</small>
            </div>
            <div className="g">
              <b>Que aprendas</b>
              <small>muchas palabras nuevas en español con vocabuo</small>
            </div>
            <div className="g">
              <b>Que descanses</b>
              <small>entre tantas horas de estudio en el máster</small>
            </div>
            <div className="g">
              <b>Que celebres</b>
              <small>cada logro de tu vida</small>
            </div>
          </div>
        </section>

        <section
          className={`box cake${candlesLoaded ? "" : " candles-loading"}`}
          id="cake"
          aria-label="Pastel con velas"
        >
          <h2 className="px">Pide un deseo</h2>
          <svg
            viewBox="0 0 300 190"
            role="img"
            aria-label="Pastel de cumpleaños con 26 velas"
          >
            {Array.from({ length: CANDLE_COUNT }, (_, index) => {
              const x = 22 + index * 10;

              return (
                <g
                  className={
                    index < candlesExtinguished
                      ? "candle extinguished"
                      : "candle"
                  }
                  key={index}
                >
                  <rect
                    x={x}
                    y="34"
                    width="4"
                    height="50"
                    fill={CANDLE_COLORS[index % CANDLE_COLORS.length]}
                  />
                  <ellipse
                    className="fl"
                    cx={x + 2}
                    cy="28"
                    rx="2.8"
                    ry="5.5"
                    fill="#ffcf4a"
                    style={{ animationDelay: `${(index % 10) * 0.07}s` }}
                  />
                  <g className="smoke" aria-hidden="true">
                    <circle cx={x + 2} cy="27" r="1.5" />
                    <circle cx={x + 2} cy="27" r="1.5" />
                    <circle cx={x + 2} cy="27" r="1.5" />
                  </g>
                </g>
              );
            })}
            <rect
              x="10"
              y="84"
              width="280"
              height="34"
              fill="#ff5d8f"
              stroke="#1b1f4b"
              strokeWidth="4"
            />
            <path
              d="M10 100 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0 q12 14 24 0"
              fill="none"
              stroke="#fff"
              strokeWidth="5"
            />
            <rect
              x="10"
              y="118"
              width="280"
              height="52"
              fill="#3cc7ff"
              stroke="#1b1f4b"
              strokeWidth="4"
            />
            <rect x="10" y="170" width="280" height="8" fill="#1b1f4b" />
          </svg>
          <button
            type="button"
            onClick={extinguishCandles}
            disabled={!candlesLoaded || candlesExtinguished >= CANDLE_COUNT}
          >
            {candlesExtinguished >= CANDLE_COUNT
              ? "Velas apagadas"
              : `Apagar vela ${candlesExtinguished + 1} de ${CANDLE_COUNT}`}
          </button>
          <div
            className={`wish${
              candlesExtinguished >= CANDLE_COUNT ? " on" : ""
            }`}
            id="wish"
            aria-live="polite"
          >
            <p>
              <b>¡Deseo concedido!</b>
            </p>
            <p className="de2">Dein Wunsch wird wahr!</p>
          </div>
        </section>
      </main>

      <div className="confetti-container" aria-hidden="true">
        {confetti.map((piece) => (
          <i
            className="c"
            key={piece.id}
            style={{
              left: piece.left,
              background: piece.color,
              animationDelay: piece.delay,
            }}
          />
        ))}
      </div>
    </>
  );
}
