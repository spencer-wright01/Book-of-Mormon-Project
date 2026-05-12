import Lightsaber from "./Lightsaber";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "M";
}

export default function PlayerAvatar({
  player,
  size = "md",
  showLightsaber = true,
  label,
  className = "",
}) {
  const avatarSizes = {
    sm: {
      shell: "h-24 w-24",
      halo: "h-28 w-28",
      head: "h-7 w-7",
      torso: "h-10 w-14",
      initials: "text-lg",
      saber: "sm",
    },
    md: {
      shell: "h-32 w-32",
      halo: "h-36 w-36",
      head: "h-9 w-9",
      torso: "h-14 w-20",
      initials: "text-2xl",
      saber: "md",
    },
    lg: {
      shell: "h-40 w-40",
      halo: "h-44 w-44",
      head: "h-11 w-11",
      torso: "h-16 w-24",
      initials: "text-3xl",
      saber: "lg",
    },
  };

  const scale = avatarSizes[size] || avatarSizes.md;
  const initials = getInitials(player?.name);

  return (
    <div
      aria-label={label || `${player?.title || "Master"} avatar`}
      className={`relative flex flex-col items-center ${className}`}
      role="img"
    >
      <div
        aria-hidden="true"
        className={`absolute rounded-full bg-cyan-300/12 blur-2xl ${scale.halo}`}
      />
      <div
        className={`relative flex items-center justify-center rounded-full border border-white/15 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.12)] ${scale.shell}`}
      >
        <div className="absolute inset-2 rounded-full border border-cyan-200/10" />
        <div className="absolute top-4 h-6 w-16 rounded-full bg-cyan-300/10 blur-lg" />
        <div className={`absolute top-6 rounded-full border border-white/15 bg-slate-700 ${scale.head}`} />
        <div
          className={`absolute bottom-7 rounded-[1.4rem] border border-white/15 bg-gradient-to-b from-slate-600 via-slate-700 to-slate-900 ${scale.torso}`}
        />
        <div className={`relative font-display font-black tracking-[0.2em] text-cyan-100 ${scale.initials}`}>
          {initials}
        </div>
      </div>
      {showLightsaber ? (
        <Lightsaber
          className="-mt-2"
          color={player?.lightsaberColor || "Blue"}
          glowing
          intense
          size={scale.saber}
        />
      ) : null}
    </div>
  );
}
