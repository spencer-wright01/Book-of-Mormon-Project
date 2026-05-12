function resolveBarColor(color) {
  if (!color) {
    return { className: "bg-emerald-400", style: undefined };
  }

  const looksLikeCssColor =
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("hsl") ||
    ["red", "green", "blue", "yellow", "purple", "orange", "pink"].includes(color);

  if (looksLikeCssColor) {
    return { className: "", style: { backgroundColor: color } };
  }

  return { className: color, style: undefined };
}

function HealthBar({
  label,
  current,
  max,
  color = "bg-emerald-400",
  className = "",
}) {
  const safeMax = max > 0 ? max : 1;
  const clampedCurrent = Math.max(0, Math.min(current, safeMax));
  const percentage = Math.round((clampedCurrent / safeMax) * 100);
  const barColor = resolveBarColor(color);
  const accessibleLabel = `${label}: ${clampedCurrent} out of ${safeMax} health points remaining`;

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm font-semibold text-slate-100">
        <span>{label}</span>
        <span aria-hidden="true">
          {clampedCurrent}/{safeMax}
        </span>
      </div>
      <div
        aria-label={accessibleLabel}
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={clampedCurrent}
        className="h-4 w-full overflow-hidden rounded-full border border-white/15 bg-slate-900/80"
        role="meter"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor.className}`}
          style={{ width: `${percentage}%`, ...barColor.style }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-300">{accessibleLabel}</p>
    </div>
  );
}

export default HealthBar;
