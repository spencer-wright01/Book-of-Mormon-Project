import Lightsaber from "./Lightsaber";

function Home({
  canContinue = false,
  onBeginJourney,
  onContinue,
  onAbout,
  player,
}) {
  const playerLabel =
    player?.title || (player?.name ? `Master ${player.name}` : "");

  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30 backdrop-blur sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-200">
          A Book of Mormon Quest
        </p>
        <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
          Complete scripture missions, earn power-ups, and walk the path back
          to Jesus Christ.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
          Complete scripture missions, earn power-ups, and defeat Darth
          Korvax by remembering faith, repentance, prayer, courage,
          revelation, and Jesus Christ.
        </p>

        {playerLabel ? (
          <div className="mt-6 rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-base text-emerald-50">
            Your last save is ready, {playerLabel}. Continue your mission when
            you are ready.
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onBeginJourney}
            className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-base font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-4 focus:ring-cyan-200/60"
          >
            Begin Journey
          </button>
          {canContinue ? (
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex items-center justify-center rounded-full border border-amber-300/60 bg-amber-300/10 px-6 py-3 text-base font-bold text-amber-100 transition hover:bg-amber-300/20 focus:outline-none focus:ring-4 focus:ring-amber-200/40"
            >
              Continue
            </button>
          ) : null}
          <button
            type="button"
            onClick={onAbout}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-base font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            About This Project
          </button>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="rounded-[2rem] border border-cyan-300/15 bg-slate-950/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">
                Adventure Awaits
              </p>
              <p className="mt-2 text-sm text-slate-200 sm:text-base">
                Scripture missions, power-ups, and a final stand against Darth
                Korvax.
              </p>
            </div>
            <Lightsaber color={player?.lightsaberColor || "blue"} glowing size="md" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-cyan-200/10 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/30 backdrop-blur sm:p-8">
          <h3 className="text-2xl font-black text-white">The Journey Ahead</h3>
          <ul className="mt-5 space-y-4 text-base leading-7 text-slate-200">
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Begin as a young defender of light with a chosen lightsaber color.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Train with Nephi, Enos, Alma, and the Savior&apos;s visit at
              Bountiful.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Charge each power-up so you can stand firm in the final battle
              against doubt.
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
}

export default Home;
