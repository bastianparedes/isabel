"use client";

import { useEffect, useRef, useState } from "react";

const START_DATE = new Date(2026, 5, 10, 0, 0, 0);

const PHRASES = [
  "Estúpido",
  "You are pretty stupid",
  "Maripollo",
  "I am happy for you... you dumb motherfucker !",
  "Is it your face?",
  "Eins, uno, eins, uno... EINS... UNO !!!",
];

const MONTHS = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

type TimeParts = {
  days: number;
  hours: string;
  minutes: string;
  seconds: string;
};

function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function getElapsedTime(): TimeParts {
  const totalSeconds = Math.max(
    0,
    Math.floor((Date.now() - START_DATE.getTime()) / 1000),
  );
  const totalDays = Math.floor(totalSeconds / 86_400);
  return {
    days: totalDays,
    hours: String(Math.floor(totalSeconds / 3600) % 24).padStart(2, "0"),
    minutes: String(Math.floor(totalSeconds / 60) % 60).padStart(2, "0"),
    seconds: String(totalSeconds % 60).padStart(2, "0"),
  };
}

const TIME_UNITS: { key: keyof TimeParts; label: string }[] = [
  { key: "days", label: "días" },
  { key: "hours", label: "horas" },
  { key: "minutes", label: "minutos" },
  { key: "seconds", label: "segundos" },
];

const normalizeAnswer = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("de");

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState<TimeParts>({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [flippedCards, setFlippedCards] = useState<Set<number>>(() => new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioVolume, setAudioVolume] = useState(1);
  const [fullName, setFullName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [city, setCity] = useState("");
  const [siblings, setSiblings] = useState("");
  const [instrument, setInstrument] = useState("");

  useEffect(() => {
    const updateTime = () => setTime(getElapsedTime());
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  const startDateLabel = `Desde el ${START_DATE.getDate()} de ${
    MONTHS[START_DATE.getMonth()]
  } de ${START_DATE.getFullYear()}`;
  const unlocked =
    normalizeAnswer(fullName) === "bastián gabriel paredes padget" &&
    birthDay === "30" &&
    birthMonth === "4" &&
    birthYear === "1995" &&
    city === "Puerto Montt" &&
    siblings === "3" &&
    instrument === "gitarre";

  useEffect(() => {
    if (!unlocked) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  }, [unlocked]);

  function toggleCard(index: number) {
    setFlippedCards((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  async function toggleAudio() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    setAudioError("");
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setAudioError("No se pudo reproducir la canción. Inténtalo de nuevo.");
    }
  }

  return (
    <main className="postal-sheet mx-auto my-0 max-w-[1120px] px-7 pt-11 pb-14 sm:my-7">
      <header className="flex flex-wrap items-start justify-between gap-3.5">
        <div className="postage-stamp" aria-label="Chile a Alemania">
          <b aria-hidden="true">♥</b>
          Chile → Alemania
        </div>
      </header>

      <h1 className="postal-title mt-8 text-center">
        Para ti, mi Isabel
      </h1>
      <p className="postal-route mb-8 text-center italic">
        Una carta que cruza el océano
      </p>

      <div className="country-decorations" role="img" aria-label="Chile y Alemania">
        <span className="country-flag chile-flag" aria-hidden="true">
          <svg viewBox="0 0 60 40">
            <path fill="#fff" d="M0 0h60v20H0z" />
            <path fill="#d52b1e" d="M0 20h60v20H0z" />
            <path fill="#0039a6" d="M0 0h20v20H0z" />
            <path
              fill="#fff"
              d="m10 3.5 1.9 5.8H18l-4.9 3.6 1.9 5.8-5-3.6-4.9 3.6L7 12.9l-5-3.6h6.1z"
            />
          </svg>
        </span>
        <span className="country-route" aria-hidden="true">
          <span>♥</span>
        </span>
        <span className="country-flag germany-flag" aria-hidden="true">
          <svg viewBox="0 0 60 40">
            <path fill="#181818" d="M0 0h60v13.34H0z" />
            <path fill="#d00" d="M0 13.33h60v13.34H0z" />
            <path fill="#ffce00" d="M0 26.66h60V40H0z" />
          </svg>
        </span>
      </div>

      <div className="desktop-layout">
        <div className="letter-column">
          <section className="letter mx-auto mb-4 max-w-[600px]">
            <p className="letter-greeting">Mi cielo,</p>
            <p>
              Aunque nos separan miles de kilómetros, un océano y varias horas
              de diferencia, cada día te siento más cerca. Cada mensaje, cada
              videollamada y cada “te quero Basti” tuyo son lo mejor de mi día.
              Gracias llamarme todos los días y por hacer que la distancia sea solo un
              número. Un día ese número será cero.
            </p>
            <p>Te quiero.</p>
            <p className="letter-signature">— Tu chileno</p>
          </section>

          <div className="wax-seal" aria-hidden="true">
            ♥
          </div>
        </div>

        <section className="time-panel" aria-labelledby="time-heading">
          <h2 id="time-heading" className="postal-heading text-center">
            Nuestro tiempo juntos
          </h2>
          <p className="section-caption mb-4 text-center italic">
            {startDateLabel}
          </p>
          <div
            className="counter mx-auto mb-16 grid max-w-[640px] grid-cols-[repeat(auto-fit,minmax(104px,1fr))] gap-3.5"
            aria-label="Tiempo juntos"
            aria-live="off"
          >
            {TIME_UNITS.map(({ key, label }) => (
              <div className="time-unit text-center" key={key}>
                <b>{time[key]}</b>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby="postcards-heading">
        <h2 id="postcards-heading" className="postal-heading text-center">
          Nuestras postales
        </h2>
        <p className="section-caption text-center italic">
          Fahre mit der Maus über jede Postkarte (oder tippe darauf)
        </p>
        <div className="postcard-grid mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-5">
          {PHRASES.map((phrase, index) => {
            const isFlipped = flippedCards.has(index);

            return (
              <button
                key={phrase}
                type="button"
                className={`postcard h-[180px] w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 ${
                  isFlipped ? "is-flipped" : ""
                }`}
                onClick={() => toggleCard(index)}
                aria-label={`${isFlipped ? "Ocultar" : "Revelar"} postal ${
                  index + 1
                }`}
                aria-pressed={isFlipped}
              >
                <span className="postcard-inner">
                  <span
                    className="postcard-face postcard-front"
                    aria-hidden={isFlipped}
                  >
                    ♥<span>Postal {index + 1}</span>
                  </span>
                  <span
                    className="postcard-face postcard-back"
                    aria-hidden={!isFlipped}
                  >
                    “{phrase}”
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <footer className="postal-footer mt-[60px] text-center">
        Ich gehöre dir
      </footer>

      <section className="surprise-gate" aria-labelledby="surprise-heading">
        <h2 id="surprise-heading" className="postal-heading text-center">
          Eine kleine Überraschung
        </h2>
        <p className="section-caption surprise-description text-center italic">
          Beantworte alle Fragen richtig, dann wartet eine Überraschung auf dich.
        </p>

        <div className="question-grid">
          <div className="question-field">
            <label htmlFor="full-name">Wie lautet mein vollständiger Name?</label>
            <input
              id="full-name"
              type="text"
              autoComplete="off"
              placeholder="Vollständigen Namen eingeben"
              value={fullName}
              onChange={(event) => setFullName(event.currentTarget.value)}
            />
          </div>

          <fieldset className="question-field birthdate-field">
            <legend>Wann bin ich geboren?</legend>
            <div className="birthdate-selects">
              <label>
                <span>Tag</span>
                <select
                  aria-label="Geburtstag"
                  value={birthDay}
                  onChange={(event) => setBirthDay(event.currentTarget.value)}
                >
                  <option value="">Tag</option>
                  {Array.from({ length: 31 }, (_, index) => index + 1).map(
                    (day) => (
                      <option key={day} value={String(day)}>
                        {day}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label>
                <span>Monat</span>
                <select
                  aria-label="Geburtsmonat"
                  value={birthMonth}
                  onChange={(event) => setBirthMonth(event.currentTarget.value)}
                >
                  <option value="">Monat</option>
                  {[
                    "Januar",
                    "Februar",
                    "März",
                    "April",
                    "Mai",
                    "Juni",
                    "Juli",
                    "August",
                    "September",
                    "Oktober",
                    "November",
                    "Dezember",
                  ].map((month, index) => (
                    <option key={month} value={String(index + 1)}>
                      {month}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Jahr</span>
                <select
                  aria-label="Geburtsjahr"
                  value={birthYear}
                  onChange={(event) => setBirthYear(event.currentTarget.value)}
                >
                  <option value="">Jahr</option>
                  {Array.from({ length: 60 }, (_, index) => 1960 + index).map(
                    (year) => (
                      <option key={year} value={String(year)}>
                        {year}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>
          </fieldset>

          <div className="question-field">
            <label htmlFor="home-city">Aus welcher Stadt komme ich?</label>
            <select
              id="home-city"
              value={city}
              onChange={(event) => setCity(event.currentTarget.value)}
            >
              <option value="">Stadt auswählen</option>
              {["Santiago", "Valparaíso", "Puerto Montt", "Concepción"].map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="question-field">
            <label htmlFor="siblings">Wie viele Geschwister habe ich?</label>
            <select
              id="siblings"
              value={siblings}
              onChange={(event) => setSiblings(event.currentTarget.value)}
            >
              <option value="">Anzahl auswählen</option>
              {Array.from({ length: 7 }, (_, count) => count).map((count) => (
                <option key={count} value={String(count)}>
                  {count}
                </option>
              ))}
            </select>
          </div>

          <div className="question-field">
            <label htmlFor="instrument">
              Welches Musikinstrument spiele ich?
            </label>
            <select
              id="instrument"
              value={instrument}
              onChange={(event) => setInstrument(event.currentTarget.value)}
            >
              <option value="">Instrument auswählen</option>
              {["Klavier", "Gitarre", "Schlagzeug", "Geige"].map((option) => (
                <option key={option} value={option.toLocaleLowerCase("de")}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {unlocked ? (
          <>
            <p className="surprise-success" role="status">
              Alle Antworten sind richtig. Deine Überraschung wartet auf dich ♥
            </p>
            <audio
              ref={audioRef}
              src="/song.mp3"
              preload="none"
              onEnded={() => setIsPlaying(false)}
              onLoadedMetadata={(event) => {
                setAudioDuration(event.currentTarget.duration);
                setAudioCurrentTime(event.currentTarget.currentTime);
              }}
              onTimeUpdate={(event) =>
                setAudioCurrentTime(event.currentTarget.currentTime)
              }
              onError={() =>
                setAudioError(
                  "Das Lied konnte nicht geladen werden. Bitte versuche es erneut.",
                )
              }
            />
            <div className="music-control">
              <button
                type="button"
                className="music-button"
                onClick={toggleAudio}
                aria-pressed={isPlaying}
              >
                <span aria-hidden="true">{isPlaying ? "Ⅱ" : "▶"}</span>
                {isPlaying ? "Lied pausieren" : "Überraschung abspielen"}
              </button>
              <div className="audio-tools">
                <div className="audio-seek">
                  <label className="sr-only" htmlFor="song-progress">
                    Position des Liedes
                  </label>
                  <input
                    id="song-progress"
                    type="range"
                    min="0"
                    max={audioDuration || 0}
                    step="0.1"
                    value={Math.min(audioCurrentTime, audioDuration || 0)}
                    disabled={!audioDuration}
                    onChange={(event) => {
                      const nextTime = Number(event.currentTarget.value);
                      setAudioCurrentTime(nextTime);
                      if (audioRef.current)
                        audioRef.current.currentTime = nextTime;
                    }}
                  />
                  <div className="audio-time" aria-hidden="true">
                    <span>{formatAudioTime(audioCurrentTime)}</span>
                    <span>{formatAudioTime(audioDuration)}</span>
                  </div>
                </div>
                <div className="audio-volume">
                  <label htmlFor="song-volume">Lautstärke</label>
                  <input
                    id="song-volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={audioVolume}
                    onChange={(event) => {
                      const nextVolume = Number(event.currentTarget.value);
                      setAudioVolume(nextVolume);
                      if (audioRef.current)
                        audioRef.current.volume = nextVolume;
                    }}
                  />
                  <span className="sr-only" aria-live="polite">
                    {Math.round(audioVolume * 100)}%
                  </span>
                </div>
              </div>
              {audioError && (
                <p className="music-error" role="alert">
                  {audioError}
                </p>
              )}
            </div>
          </>
        ) : (
          <p className="surprise-locked" role="status">
            Beantworte die Fragen, um die Überraschung freizuschalten.
          </p>
        )}
      </section>
    </main>
  );
}
