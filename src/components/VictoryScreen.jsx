import { getPowerUpCatalog } from "../utils/gameProgress";
import Lightsaber from "./Lightsaber";

const LEARNED_PRINCIPLES = [
  "Faith and obedience",
  "Sincere prayer",
  "Repentance through Jesus Christ",
  "Faith and revelation",
  "Courage and covenant loyalty",
  "Coming unto Christ",
];

export default function VictoryScreen({ player, onReturnToMap, onOpenInventory, onReplayBattle, onReset }) {
  const catalog = getPowerUpCatalog();

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="glass-panel victory-glow rounded-[2.25rem] border border-emerald-200/20 p-6 md:p-10">
        <p className="font-display text-sm uppercase tracking-[0.32em] text-emerald-200/80">Victory Screen</p>
        <h2 className="mt-4 font-display text-5xl text-white md:text-6xl">Victory, {player.title}!</h2>
        <p className="mt-4 text-2xl text-slate-100">Darth Korvax has been defeated.</p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-200">
          You completed the journey, charged every power-up, and answered doubt with truth from the Book of Mormon.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6">
            <p className="font-display text-2xl text-white">Chosen Lightsaber</p>
            <p className="mt-2 text-slate-300">{player.lightsaberColor}</p>
            <div className="mt-5">
              <Lightsaber color={player.lightsaberColor} glowing />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6">
            <p className="font-display text-2xl text-white">Power-Ups Fully Charged</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {catalog.map((powerUp) => (
                <div key={powerUp.name} className="rounded-3xl border border-emerald-200/15 bg-emerald-300/10 p-4">
                  <p className="font-semibold text-white">{powerUp.name}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{powerUp.principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/45 p-6">
            <p className="font-display text-2xl text-white">Principles Learned</p>
            <ul className="mt-4 space-y-3 text-slate-100">
              {LEARNED_PRINCIPLES.map((principle) => (
                <li key={principle} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  {principle}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-amber-200/20 bg-amber-300/10 p-6">
            <p className="font-display text-2xl text-white">Final Reflection</p>
            <p className="mt-4 text-xl leading-8 text-slate-100">
              Which power-up or principle do you want to use most in your real life this week?
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="rounded-full bg-cyan-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            onClick={onReturnToMap}
            type="button"
          >
            Return to Mission Map
          </button>
          <button
            className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={onOpenInventory}
            type="button"
          >
            View My Power-Ups
          </button>
          <button
            className="rounded-full border border-amber-200/20 px-6 py-3 font-semibold text-amber-100 transition hover:bg-amber-300/10 focus:outline-none focus:ring-2 focus:ring-amber-200/30"
            onClick={onReplayBattle}
            type="button"
          >
            Replay Final Battle
          </button>
          <button
            className="rounded-full border border-red-200/20 px-6 py-3 font-semibold text-red-100 transition hover:bg-red-400/10 focus:outline-none focus:ring-2 focus:ring-red-200/30"
            onClick={onReset}
            type="button"
          >
            Reset Game
          </button>
        </div>
      </div>
    </section>
  );
}
