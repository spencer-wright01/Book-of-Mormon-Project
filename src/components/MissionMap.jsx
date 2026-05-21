import MissionCard from "./MissionCard";
import PlayerAvatar from "./PlayerAvatar";
import Lightsaber from "./Lightsaber";

export default function MissionMap({
  player,
  missions,
  missionStatuses,
  bossUnlocked,
  onSelectMission,
  onOpenInventory,
  onOpenAbout,
  onOpenBoss,
  onGoHome,
  onReset,
}) {
  const nextMission = missions.find((mission) => missionStatuses[mission.id] === "available");

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/45 p-6 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(250,204,21,0.12),_transparent_28%)]" />
        <div className="relative flex flex-col gap-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                Mission Map
              </p>
              <h2 className="font-display text-4xl text-white md:text-5xl">
                Welcome, {player?.title}.
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-slate-200">
                Your hero is traveling the path. The scripture figures become wise guides along the way, helping you train for the day you face Darth Korvax.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/55 px-4 py-4">
              <PlayerAvatar player={player} size="md" />
              <div className="min-w-0">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active Hero</p>
                <p className="mt-1 font-display text-2xl text-white">{player?.title}</p>
                <p className="mt-2 text-slate-300">{player?.lightsaberColor} saber equipped</p>
                <div className="mt-3">
                  <Lightsaber color={player?.lightsaberColor} glowing intense size="sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Missions Completed: {player.completedMissions.length}/6
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Power-Ups Charged: {player.chargedPowerUps.length}/6
                </span>
                <span className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white">
                  Next Stop: {nextMission ? nextMission.title : "Final Battle"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {missions.map((mission, index) => (
                  <div key={mission.id} className="flex items-center gap-3">
                    <div className="status-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900 font-display text-base text-white">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white">{mission.title}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{missionStatuses[mission.id]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-full bg-cyan-300 px-5 py-3 font-display text-lg text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                onClick={onOpenInventory}
                type="button"
              >
                View Power-Ups
              </button>
              <button
                className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
                onClick={onOpenAbout}
                type="button"
              >
                About This Project
              </button>
              <button
                className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
                onClick={onGoHome}
                type="button"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            status={missionStatuses[mission.id]}
            onSelect={() => onSelectMission(mission)}
          />
        ))}
      </div>

      <div className="mt-8 rounded-[2rem] border border-amber-200/20 bg-slate-950/45 p-6 shadow-xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="font-display text-sm uppercase tracking-[0.3em] text-amber-200/80">
              Final Battle
            </p>
            <h3 className="mt-3 font-display text-3xl text-white">Darth Korvax, the Keeper of Doubt</h3>
            <p className="mt-3 text-slate-200 leading-7">
              When every mission is complete and every power-up is charged, your hero can step into the last battle.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              className={`rounded-full px-6 py-3 font-display text-lg transition focus:outline-none focus:ring-2 ${
                bossUnlocked
                  ? "bg-amber-300 text-slate-950 hover:bg-amber-200 focus:ring-amber-200"
                  : "cursor-not-allowed border border-white/10 bg-slate-800 text-slate-400 focus:ring-white/20"
              }`}
              disabled={!bossUnlocked}
              onClick={onOpenBoss}
              type="button"
            >
              Enter Final Battle
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

        <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-950/45 px-5 py-4">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-300">Current Status</p>
          <p className="mt-2 font-display text-2xl text-white">
            {bossUnlocked ? "Unlocked and ready" : "Locked until your armor is fully charged"}
          </p>
          <p className="mt-2 text-slate-300">
            Complete each mission in order and finish every challenge to open the last door.
          </p>
        </div>
      </div>
    </section>
  );
}
