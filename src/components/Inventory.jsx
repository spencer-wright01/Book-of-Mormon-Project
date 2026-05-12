import { getPowerUpCatalog, LIGHTSABER_STYLES } from "../utils/gameProgress";
import Lightsaber from "./Lightsaber";
import PlayerAvatar from "./PlayerAvatar";

export default function Inventory({ player, missions, onBack, onReset }) {
  const catalog = getPowerUpCatalog();
  const lightsaberStyle = LIGHTSABER_STYLES[player.lightsaberColor];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Inventory</p>
          <h2 className="mt-3 font-display text-4xl text-white">{player.title}</h2>
          <p className="mt-3 text-lg text-slate-200">
            Lightsaber Color: <span className="font-semibold text-white">{player.lightsaberColor}</span>
          </p>
          <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5">
            <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <PlayerAvatar player={player} size="md" />
              <div>
                <p className="font-display text-2xl text-white">Hero Loadout</p>
                <p className="mt-2 leading-7 text-slate-300">
                  This is your custom character. Master {player.name} is the one traveling the mission path, learning from scripture heroes, and wearing the armor you unlock.
                </p>
                <div className="mt-4">
                  <Lightsaber color={player.lightsaberColor} glowing intense />
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <span className={`rounded-full px-4 py-2 text-sm font-semibold text-slate-950 ${lightsaberStyle.accent}`}>
                {player.lightsaberColor} Blade
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                Completed Missions: {player.completedMissions.length}/6
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                Charged Power-Ups: {player.chargedPowerUps.length}/6
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
              <h3 className="font-display text-2xl text-white">Completed Missions</h3>
              <ul className="mt-3 space-y-2 text-slate-200">
                {missions.map((mission) => (
                  <li key={mission.id}>
                    {player.completedMissions.includes(mission.id) ? "Completed" : "Waiting"}: {mission.title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
              <h3 className="font-display text-2xl text-white">Charged Power-Ups</h3>
              <ul className="mt-3 space-y-2 text-slate-200">
                {catalog.map((powerUp) => (
                  <li key={powerUp.name}>
                    {player.chargedPowerUps.includes(powerUp.name) ? "Charged" : "Locked"}: {powerUp.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="rounded-full bg-cyan-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
              onClick={onBack}
              type="button"
            >
              Return to Mission Map
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

        <div className="grid gap-4">
          {catalog.map((powerUp) => {
            const earned = player.earnedPowerUps.includes(powerUp.name);
            const charged = player.chargedPowerUps.includes(powerUp.name);
            const status = charged ? "Charged" : earned ? "Earned" : "Locked";

            return (
              <article key={powerUp.name} className="glass-panel overflow-hidden rounded-[1.75rem] border border-white/10 p-5">
                <div className={`mb-4 h-2 rounded-full ${charged ? lightsaberStyle.accent : "bg-slate-700"}`} />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-display text-2xl text-white">{powerUp.name}</p>
                    <p className="mt-2 text-slate-300">{powerUp.shortDescription}</p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                    Status: {status}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Principle</p>
                    <p className="mt-2 text-slate-100">{powerUp.principle}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Source Mission</p>
                    <p className="mt-2 text-slate-100">{powerUp.sourceMission}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Armor Role</p>
                  <p className="mt-2 text-slate-100">
                    {charged
                      ? `Fully charged and battle-ready for ${player.title}.`
                      : earned
                        ? `Earned by ${player.title}, but still waiting to be fully charged.`
                        : `Still locked in the mission vault. ${player.title} has not earned it yet.`}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
