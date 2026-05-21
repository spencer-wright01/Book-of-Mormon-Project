import { getPowerUpCatalog, LIGHTSABER_STYLES } from "../utils/gameProgress";
import Lightsaber from "./Lightsaber";
import PlayerAvatar from "./PlayerAvatar";

export default function Inventory({ player, missions, onBack, onReset }) {
  const catalog = getPowerUpCatalog();
  const lightsaberStyle = LIGHTSABER_STYLES[player.lightsaberColor];
  const missionTotal = missions.length;
  const activeCompletedCount = missions.filter((mission) => player.completedMissions.includes(mission.id)).length;
  const activeChargedCount = missions.filter((mission) => player.chargedPowerUps.includes(mission.reward)).length;
  const completedMissionTitles = missions
    .filter((mission) => player.completedMissions.includes(mission.id))
    .map((mission) => mission.title);

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="space-y-4">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Inventory</p>
            <h2 className="font-display text-4xl text-white">{player.title}</h2>
            <p className="text-lg leading-8 text-slate-200">
              This is your hero loadout. {player.title} is the learner on the path, collecting armor and power-ups from each scripture guide.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className={`rounded-full px-4 py-2 text-sm font-semibold text-slate-950 ${lightsaberStyle.accent}`}>
                {player.lightsaberColor} Blade
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                Missions: {activeCompletedCount}/{missionTotal}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                Charged: {activeChargedCount}/{missionTotal}
              </span>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/50 p-5">
            <div className="grid gap-5 md:grid-cols-[0.8fr_1.2fr] md:items-center">
              <PlayerAvatar player={player} size="md" />
              <div>
                <p className="font-display text-2xl text-white">Hero Loadout</p>
                <p className="mt-2 leading-7 text-slate-300">
                  Your lightsaber and armor show the lessons you have already claimed. What is charged here can be carried into the final battle.
                </p>
                <div className="mt-4">
                  <Lightsaber color={player.lightsaberColor} glowing intense />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Mission Log</p>
            <div className="mt-3 space-y-2 text-slate-200">
              {missions.map((mission) => {
                const completed = player.completedMissions.includes(mission.id);

                return (
                  <div key={mission.id} className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 px-4 py-3">
                    <span className="font-medium text-white">{mission.title}</span>
                    <span className="text-sm uppercase tracking-[0.18em] text-slate-400">
                      {completed ? "Completed" : "Waiting"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Ready for Battle</p>
            <p className="mt-3 text-lg leading-8 text-slate-200">
              {completedMissionTitles.length
                ? `${player.title} has already completed ${completedMissionTitles.length} mission${completedMissionTitles.length === 1 ? "" : "s"}.`
                : `${player.title} is just beginning the journey.`}
            </p>
            <ul className="mt-4 space-y-2 text-slate-300">
              {player.chargedPowerUps.length ? (
                catalog
                  .filter((powerUp) => player.chargedPowerUps.includes(powerUp.name))
                  .map((powerUp) => <li key={powerUp.name}>Charged: {powerUp.name}</li>)
              ) : (
                <li>No charged power-ups yet.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {catalog.map((powerUp) => {
            const earned = player.earnedPowerUps.includes(powerUp.name);
            const charged = player.chargedPowerUps.includes(powerUp.name);
            const status = charged ? "Charged" : earned ? "Earned" : "Locked";

            return (
              <article
                key={powerUp.name}
                className="glass-panel overflow-hidden rounded-[1.75rem] border border-white/10 px-5 py-5"
              >
                <div className={`mb-4 h-2 rounded-full ${charged ? lightsaberStyle.accent : "bg-slate-700"}`} />
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="font-display text-2xl text-white">{powerUp.name}</p>
                    <p className="mt-2 leading-7 text-slate-300">{powerUp.shortDescription}</p>
                    <p className="mt-3 text-sm text-slate-400">
                      {powerUp.principle} | {powerUp.sourceMission}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                    {status}
                  </span>
                </div>
                <p className="mt-4 text-slate-100">
                  {charged
                    ? `Fully charged and battle-ready for ${player.title}.`
                    : earned
                      ? `Earned by ${player.title}, but still waiting to be fully charged.`
                      : "Still locked in the mission vault."}
                </p>
              </article>
            );
          })}
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
    </section>
  );
}
