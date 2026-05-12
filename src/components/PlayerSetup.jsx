import { useState } from "react";
import { LIGHTSABER_OPTIONS, LIGHTSABER_STYLES } from "../utils/gameProgress";
import Lightsaber from "./Lightsaber";

export default function PlayerSetup({ initialPlayer, onSave, onBack }) {
  const defaultColor = initialPlayer?.lightsaberColor || LIGHTSABER_OPTIONS[2];
  const [name, setName] = useState(initialPlayer?.name || "");
  const [lightsaberColor, setLightsaberColor] = useState(defaultColor);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setError("Please enter your name before beginning the journey.");
      return;
    }

    setError("");
    onSave(cleanName, lightsaberColor);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
        <div className="grid gap-8 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="space-y-5">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-cyan-200/80">
              Player Setup
            </p>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Choose your path, future defender.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-slate-200">
              Enter your name, choose a lightsaber color, and prepare to become a helper of faith,
              courage, revelation, and Jesus Christ.
            </p>
            <div className="rounded-3xl border border-cyan-300/20 bg-slate-950/40 p-5">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/70">Preview</p>
              <p className="mt-3 font-display text-3xl text-white">
                {name.trim() ? `Welcome, Master ${name.trim()}.` : "Welcome, Master Adventurer."}
              </p>
              <p className="mt-2 text-slate-300">
                Your chosen lightsaber will shine in your profile, your missions, and the final
                battle against Darth Korvax.
              </p>
            </div>
          </div>

          <form className="space-y-6 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-6" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="font-display text-2xl text-white">Your Name</span>
              <input
                className="w-full rounded-2xl border border-white/15 bg-slate-900/80 px-4 py-3 text-lg text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
                maxLength={24}
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>

            <fieldset className="space-y-3">
              <legend className="font-display text-2xl text-white">Lightsaber Color</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {LIGHTSABER_OPTIONS.map((option) => {
                  const isSelected = option === lightsaberColor;
                  const style = LIGHTSABER_STYLES[option];

                  return (
                    <button
                      key={option}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        isSelected
                          ? "border-white/50 bg-white/10 ring-2 ring-cyan-200/50"
                          : "border-white/10 bg-slate-900/60 hover:border-white/25 hover:bg-slate-900/90"
                      }`}
                      type="button"
                      onClick={() => setLightsaberColor(option)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`h-3.5 w-3.5 rounded-full ${style.accent}`} aria-hidden="true" />
                        <span className="font-semibold text-white">{option}</span>
                      </div>
                      <div className="mt-3">
                        <Lightsaber color={option} size="sm" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {error ? (
              <p className="rounded-2xl border border-amber-300/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-cyan-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                type="submit"
              >
                Begin as Master {name.trim() || "Adventurer"}
              </button>
              <button
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-slate-100 transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
                type="button"
                onClick={onBack}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
