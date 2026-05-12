const saberColors = {
  red: {
    bladeClass: "bg-red-400",
    glowClass: "shadow-[0_0_28px_rgba(248,113,113,0.95)]",
    auraClass: "bg-red-300/35",
    ringClass: "ring-red-300/70",
  },
  green: {
    bladeClass: "bg-emerald-300",
    glowClass: "shadow-[0_0_28px_rgba(110,231,183,0.95)]",
    auraClass: "bg-emerald-300/35",
    ringClass: "ring-emerald-200/70",
  },
  blue: {
    bladeClass: "bg-sky-300",
    glowClass: "shadow-[0_0_28px_rgba(125,211,252,0.95)]",
    auraClass: "bg-sky-300/35",
    ringClass: "ring-sky-200/70",
  },
  purple: {
    bladeClass: "bg-violet-300",
    glowClass: "shadow-[0_0_28px_rgba(196,181,253,0.95)]",
    auraClass: "bg-violet-300/35",
    ringClass: "ring-violet-200/70",
  },
  yellow: {
    bladeClass: "bg-amber-300",
    glowClass: "shadow-[0_0_28px_rgba(252,211,77,0.95)]",
    auraClass: "bg-amber-300/35",
    ringClass: "ring-amber-200/70",
  },
};

const sizeClasses = {
  sm: {
    wrapper: "h-16 w-24",
    blade: "h-2 w-16",
    emitter: "h-3 w-2",
    handle: "h-4 w-7",
  },
  md: {
    wrapper: "h-24 w-36",
    blade: "h-3 w-24",
    emitter: "h-4 w-2.5",
    handle: "h-5 w-10",
  },
  lg: {
    wrapper: "h-32 w-52",
    blade: "h-4 w-36",
    emitter: "h-5 w-3",
    handle: "h-6 w-14",
  },
};

function Lightsaber({
  color = "blue",
  size = "md",
  glowing = false,
  intense = false,
  className = "",
  label,
}) {
  const theme = saberColors[color?.toLowerCase()] || saberColors.blue;
  const scale = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      aria-label={label || `${color} lightsaber`}
      role="img"
      className={`inline-flex items-center justify-center ${scale.wrapper} ${className}`}
    >
      <div className="relative flex items-center">
        {glowing ? (
          <div
            aria-hidden="true"
            className={`absolute left-12 right-0 h-8 rounded-full blur-xl ${theme.auraClass} ${intense ? "animate-pulse opacity-100" : "opacity-75"}`}
          />
        ) : null}
        <div
          aria-hidden="true"
          className={`${scale.handle} rounded-l-full rounded-r-md border border-slate-400 bg-gradient-to-b from-slate-100 via-slate-500 to-slate-900 shadow-lg shadow-slate-950/60`}
        />
        <div
          aria-hidden="true"
          className={`${scale.emitter} rounded-r-sm bg-gradient-to-r from-slate-300 to-white`}
        />
        <div
          aria-hidden="true"
          className={`${scale.blade} rounded-r-full ring-2 ${
            theme.ringClass
          } ${theme.bladeClass} ${
            glowing ? `${theme.glowClass} ${intense ? "animate-pulse" : ""}` : "shadow-md shadow-white/10"
          }`}
        />
      </div>
    </div>
  );
}

export default Lightsaber;
