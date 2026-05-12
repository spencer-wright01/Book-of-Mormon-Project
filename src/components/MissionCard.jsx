const statusConfig = {
  locked: {
    badge: "Locked",
    description: "This mission is still locked. Complete the earlier mission first.",
    badgeClass: "border-white/15 bg-slate-900 text-slate-200",
    buttonLabel: "Mission Locked",
  },
  available: {
    badge: "Available",
    description: "This mission is ready to begin.",
    badgeClass: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100",
    buttonLabel: "Start Mission",
  },
  completed: {
    badge: "Completed",
    description: "You completed this mission. Return any time to review it.",
    badgeClass: "border-emerald-300/40 bg-emerald-300/10 text-emerald-100",
    buttonLabel: "Review Mission",
  },
  charged: {
    badge: "Power-Up Charged",
    description: "This mission is complete and its power-up is fully charged.",
    badgeClass: "border-amber-300/40 bg-amber-300/10 text-amber-100",
    buttonLabel: "Replay Mission",
  },
};

function MissionCard({
  mission,
  status = "locked",
  onSelect,
  className = "",
}) {
  const resolvedStatus = statusConfig[status] || statusConfig.locked;
  const isLocked = status === "locked";

  return (
    <article
      className={`flex h-full flex-col rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 backdrop-blur ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Mission {mission?.missionNumber}
          </p>
          <h3 className="mt-2 text-2xl font-black tracking-tight text-white">
            {mission?.title}
          </h3>
        </div>
        <span
          className={`inline-flex rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] ${resolvedStatus.badgeClass}`}
        >
          {resolvedStatus.badge}
        </span>
      </div>

      <dl className="mt-5 space-y-4 text-sm text-slate-200">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <dt className="font-semibold uppercase tracking-wide text-slate-300">
            Story
          </dt>
          <dd className="mt-1 text-base text-white">{mission?.character}</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <dt className="font-semibold uppercase tracking-wide text-slate-300">
            Scripture Reference
          </dt>
          <dd className="mt-1 text-base text-white">
            {mission?.scriptureReference}
          </dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <dt className="font-semibold uppercase tracking-wide text-slate-300">
            Principle
          </dt>
          <dd className="mt-1 text-base text-white">{mission?.principle}</dd>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <dt className="font-semibold uppercase tracking-wide text-slate-300">
            Reward
          </dt>
          <dd className="mt-1 text-base text-white">{mission?.reward}</dd>
        </div>
      </dl>

      {mission?.shortSummary ? (
        <p className="mt-5 text-base leading-7 text-slate-200">
          {mission.shortSummary}
        </p>
      ) : null}

      <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-slate-950/40 p-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
          Mission Status
        </p>
        <p className="mt-2 text-base text-white">{resolvedStatus.badge}</p>
        <p className="mt-1 text-sm leading-6 text-slate-300">
          {resolvedStatus.description}
        </p>
      </div>

      <div className="mt-6 pt-2">
        <button
          type="button"
          onClick={() => onSelect?.(mission)}
          disabled={isLocked}
          aria-disabled={isLocked}
          className={`w-full rounded-full px-5 py-3 text-base font-bold transition focus:outline-none focus:ring-4 ${
            isLocked
              ? "cursor-not-allowed border border-white/10 bg-slate-800 text-slate-400 focus:ring-white/10"
              : "bg-cyan-300 text-slate-950 hover:bg-cyan-200 focus:ring-cyan-200/50"
          }`}
        >
          {resolvedStatus.buttonLabel}
        </button>
      </div>
    </article>
  );
}

export default MissionCard;
