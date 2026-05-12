const starPositions = [
  "left-[8%] top-[10%]",
  "left-[22%] top-[18%]",
  "left-[72%] top-[14%]",
  "left-[88%] top-[8%]",
  "left-[12%] top-[64%]",
  "left-[38%] top-[78%]",
  "left-[66%] top-[72%]",
  "left-[84%] top-[58%]",
];

function Layout({
  children,
  title = "The Path Back",
  subtitle = "A Book of Mormon Adventure Game",
  eyebrow = "Space Journey of Faith",
  actions,
  headerContent,
  footerContent,
  player,
  className = "",
  contentClassName = "",
}) {
  const playerLabel =
    player?.title || (player?.name ? `Master ${player.name}` : "");

  return (
    <div
      className={`relative min-h-screen overflow-hidden bg-slate-950 text-slate-50 ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_34%),linear-gradient(180deg,_#020617_0%,_#0f172a_48%,_#111827_100%)]" />
      <div className="absolute inset-0 opacity-80">
        {starPositions.map((position, index) => (
          <span
            key={position}
            aria-hidden="true"
            className={`absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-sm shadow-cyan-200/70 ${position} ${
              index % 2 === 0 ? "animate-pulse" : ""
            }`}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-white/10 bg-slate-900/65 px-5 py-5 shadow-2xl shadow-slate-950/40 backdrop-blur md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              <p className="mt-2 text-base text-cyan-100 sm:text-lg">
                {subtitle}
              </p>
              {playerLabel ? (
                <p className="mt-4 inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-100">
                  Welcome, {playerLabel}.
                </p>
              ) : null}
            </div>

            {(actions || headerContent) && (
              <div className="flex w-full max-w-xl flex-col gap-4 md:items-end">
                {actions ? (
                  <div className="flex w-full flex-wrap gap-3 md:justify-end">
                    {actions}
                  </div>
                ) : null}
                {headerContent ? <div className="w-full">{headerContent}</div> : null}
              </div>
            )}
          </div>
        </header>

        <main className={`flex-1 py-6 sm:py-8 ${contentClassName}`}>{children}</main>

        <footer className="pb-2 pt-2 text-center text-sm text-slate-300">
          {footerContent || (
            <p>
              Build courage, seek revelation, and remember Jesus Christ as you
              journey forward.
            </p>
          )}
        </footer>
      </div>
    </div>
  );
}

export default Layout;
