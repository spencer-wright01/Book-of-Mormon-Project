import Lightsaber from "./Lightsaber";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("") || "M";
}

function getSaberAura(color = "blue") {
  const themes = {
    red: {
      glow: "rgba(248, 113, 113, 0.5)",
      haze: "rgba(252, 165, 165, 0.22)",
    },
    green: {
      glow: "rgba(110, 231, 183, 0.48)",
      haze: "rgba(167, 243, 208, 0.2)",
    },
    blue: {
      glow: "rgba(125, 211, 252, 0.5)",
      haze: "rgba(186, 230, 253, 0.22)",
    },
    purple: {
      glow: "rgba(196, 181, 253, 0.52)",
      haze: "rgba(221, 214, 254, 0.24)",
    },
    yellow: {
      glow: "rgba(252, 211, 77, 0.52)",
      haze: "rgba(253, 230, 138, 0.24)",
    },
  };

  return themes[color?.toLowerCase()] || themes.blue;
}

export default function PlayerAvatar({
  player,
  size = "md",
  showLightsaber = true,
  label,
  className = "",
  variant = "badge",
}) {
  const avatarSizes = {
    sm: {
      shell: "h-24 w-24",
      halo: "h-28 w-28",
      head: "h-7 w-7",
      torso: "h-10 w-14",
      initials: "text-lg",
      saber: "sm",
      battleShell: "h-52 w-36",
      battleHead: "h-10 w-10",
      battleTorso: "h-20 w-16",
      battleArm: "h-16 w-3.5",
      battleLeg: "h-16 w-4",
      battleGlow: "h-44 w-28",
      battleCloak: "h-24 w-24",
    },
    md: {
      shell: "h-32 w-32",
      halo: "h-36 w-36",
      head: "h-9 w-9",
      torso: "h-14 w-20",
      initials: "text-2xl",
      saber: "md",
      battleShell: "h-64 w-44",
      battleHead: "h-12 w-12",
      battleTorso: "h-24 w-20",
      battleArm: "h-20 w-4",
      battleLeg: "h-20 w-5",
      battleGlow: "h-56 w-36",
      battleCloak: "h-28 w-32",
    },
    lg: {
      shell: "h-40 w-40",
      halo: "h-44 w-44",
      head: "h-11 w-11",
      torso: "h-16 w-24",
      initials: "text-3xl",
      saber: "lg",
      battleShell: "h-72 w-52",
      battleHead: "h-14 w-14",
      battleTorso: "h-28 w-24",
      battleArm: "h-24 w-5",
      battleLeg: "h-24 w-6",
      battleGlow: "h-64 w-44",
      battleCloak: "h-36 w-36",
    },
  };

  const scale = avatarSizes[size] || avatarSizes.md;
  const initials = getInitials(player?.name);
  const aura = getSaberAura(player?.lightsaberColor);

  if (variant === "battle") {
    return (
      <div
        aria-label={label || `${player?.title || "Master"} battle figure`}
        className={`relative flex flex-col items-center justify-end ${className}`}
        role="img"
      >
        <div
          aria-hidden="true"
          className={`player-battle-glow absolute bottom-10 rounded-full blur-3xl ${scale.battleGlow}`}
          style={{
            background: `radial-gradient(circle, ${aura.glow} 0%, ${aura.haze} 48%, transparent 76%)`,
          }}
        />
        <div className={`player-battle-shell relative ${scale.battleShell}`}>
          <div className="player-battle-platform absolute bottom-2 left-1/2 h-5 w-32 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-md" />
          <div
            aria-hidden="true"
            className={`player-battle-cloak absolute bottom-20 left-1/2 -translate-x-1/2 rounded-t-[3rem] rounded-b-[1.8rem] ${scale.battleCloak}`}
            style={{
              background: "linear-gradient(180deg, rgba(15,23,42,0.8), rgba(8,47,73,0.28) 58%, rgba(15,23,42,0.08))",
            }}
          />
          <div className={`player-battle-head absolute left-1/2 top-8 -translate-x-1/2 rounded-full ${scale.battleHead}`} />
          <div className="player-battle-hood absolute left-1/2 top-6 h-14 w-16 -translate-x-1/2 rounded-[2rem] border border-cyan-100/10 bg-slate-900/55" />
          <div className={`player-battle-torso absolute left-1/2 top-[5.25rem] -translate-x-1/2 rounded-[1.8rem] ${scale.battleTorso}`}>
            <span className="player-battle-emblem">{initials}</span>
          </div>
          <div className={`player-battle-arm player-battle-arm-left absolute left-[26%] top-24 ${scale.battleArm}`} />
          <div className={`player-battle-arm player-battle-arm-right absolute right-[25%] top-24 ${scale.battleArm}`} />
          <div className={`player-battle-leg player-battle-leg-left absolute bottom-10 left-[39%] ${scale.battleLeg}`} />
          <div className={`player-battle-leg player-battle-leg-right absolute bottom-10 right-[39%] ${scale.battleLeg}`} />
          <div className="player-battle-belt absolute left-1/2 top-[9.5rem] h-3 w-20 -translate-x-1/2 rounded-full bg-cyan-200/25" />
          {showLightsaber ? (
            <Lightsaber
              className="player-battle-saber absolute bottom-[5.5rem] right-[6%] rotate-[324deg] drop-shadow-[0_0_12px_rgba(255,255,255,0.24)]"
              color={player?.lightsaberColor || "Blue"}
              glowing
              intense
              label={`${player?.lightsaberColor || "Blue"} lightsaber held by ${player?.title || "the player"}`}
              size={size === "lg" ? "lg" : "md"}
            />
          ) : null}
        </div>
      </div>
    );
  }

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
