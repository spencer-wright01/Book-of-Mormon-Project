import { useEffect, useMemo, useState } from "react";
import bossAttacks from "../data/bossAttacks";
import { getPowerUpCatalog } from "../utils/gameProgress";
import HealthBar from "./HealthBar";
import PlayerAvatar from "./PlayerAvatar";

function getOpeningText(playerTitle) {
  return `${playerTitle}, Darth Korvax rises from the shadows. Choose the right power-up to answer each attack.`;
}

export default function FinalBoss({ player, onBack, onVictory }) {
  const [playerHp, setPlayerHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [attackIndex, setAttackIndex] = useState(0);
  const [selectedPowerUp, setSelectedPowerUp] = useState("");
  const [battleText, setBattleText] = useState(getOpeningText(player.title));
  const [attackReady, setAttackReady] = useState(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isBossHit, setIsBossHit] = useState(false);
  const [damagePopup, setDamagePopup] = useState(null);

  const attack = bossAttacks[attackIndex];
  const powerUps = useMemo(() => getPowerUpCatalog(), []);
  const isDefeated = playerHp <= 0;
  const isVictory = bossHp <= 0;

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Space") {
        event.preventDefault();
        handleAttack();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function resetBattle() {
    setPlayerHp(100);
    setBossHp(100);
    setAttackIndex(0);
    setSelectedPowerUp("");
    setBattleText(getOpeningText(player.title));
    setAttackReady(false);
    setIsPlayerAttacking(false);
    setIsBossHit(false);
    setDamagePopup(null);
  }

  function handlePowerUpChoice(powerUpName) {
    if (attackReady || isDefeated || isVictory) {
      return;
    }

    setSelectedPowerUp(powerUpName);

    if (powerUpName === attack.correctPowerUp) {
      setAttackReady(true);
      setBattleText(`${attack.successMessage} Press SPACEBAR or tap Attack to strike.`);
      return;
    }

    const nextHp = Math.max(0, playerHp - attack.playerDamage);
    setPlayerHp(nextHp);
    setDamagePopup({ side: "player", amount: attack.playerDamage });
    setBattleText(attack.failureMessage);

    window.setTimeout(() => {
      setDamagePopup(null);
    }, 800);
  }

  function handleAttack() {
    if (!attackReady || isDefeated || isVictory) {
      return;
    }

    const damage = attack.bossDamage;
    const nextBossHp = Math.max(0, bossHp - damage);

    setIsPlayerAttacking(true);
    setIsBossHit(true);
    setDamagePopup({ side: "boss", amount: damage });
    setBattleText(`${player.title} answers with ${selectedPowerUp}.`);

    window.setTimeout(() => {
      setBossHp(nextBossHp);
    }, 180);

    window.setTimeout(() => {
      setIsPlayerAttacking(false);
      setIsBossHit(false);
      setDamagePopup(null);
      setAttackReady(false);
      setSelectedPowerUp("");

      if (nextBossHp <= 0) {
        setBattleText("Darth Korvax has been defeated.");
        onVictory();
        return;
      }

      setAttackIndex((value) => value + 1);
      setBattleText("Another wave of doubt approaches. Choose your next power-up.");
    }, 900);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="font-display text-sm uppercase tracking-[0.3em] text-amber-200/80">Final Boss</p>
              <h2 className="mt-3 font-display text-4xl text-white">Darth Korvax, the Keeper of Doubt</h2>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-200">
                Listen to each lie, answer with truth, and then strike with faith-filled courage.
              </p>
            </div>
            <button
              className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={onBack}
              type="button"
            >
              Back to Mission Map
            </button>
          </div>

          <div className="mt-8 grid gap-6 rounded-[2rem] border border-white/10 bg-slate-950/45 p-4 md:p-6 lg:grid-cols-2">
            <div className="battle-stage-panel relative overflow-hidden rounded-[1.5rem] border border-cyan-200/20 bg-slate-900/70 p-5">
              <div className="battle-stage-stars pointer-events-none absolute inset-0 opacity-80" />
              <HealthBar color="bg-cyan-300" current={playerHp} label={player.title} max={100} />
              {damagePopup?.side === "player" ? (
                <span className="damage-popup pointer-events-none absolute right-5 top-[4.5rem] text-3xl font-black text-rose-300">
                  -{damagePopup.amount}
                </span>
              ) : null}
              <div
                className={`relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/55 px-4 py-5 ${isPlayerAttacking ? "player-attack" : ""}`}
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl text-white">{player.title}</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.24em] text-cyan-100/70">Guardian of the Path</p>
                  </div>
                  <p className="max-w-[11rem] text-right text-sm leading-6 text-slate-300">
                    Your lightsaber shines {player.lightsaberColor.toLowerCase()} as you stand against doubt.
                  </p>
                </div>
                <div className="relative z-10 mt-4 flex min-h-[17rem] items-end justify-center">
                  <PlayerAvatar className="translate-y-2" player={player} size="lg" variant="battle" />
                </div>
              </div>
            </div>

            <div className="battle-stage-panel relative overflow-hidden rounded-[1.5rem] border border-amber-200/20 bg-slate-900/70 p-5">
              <div className="battle-stage-stars pointer-events-none absolute inset-0 opacity-65" />
              <HealthBar color="bg-amber-300" current={bossHp} label="Darth Korvax" max={100} />
              {damagePopup?.side === "boss" ? (
                <span className="damage-popup pointer-events-none absolute left-8 top-[4.5rem] text-3xl font-black text-amber-200">
                  -{damagePopup.amount}
                </span>
              ) : null}
              <div
                className={`relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/60 px-4 py-5 ${isBossHit ? "boss-hit" : ""}`}
              >
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl text-white">Darth Korvax</p>
                    <p className="mt-1 text-sm uppercase tracking-[0.24em] text-amber-100/70">Keeper of Doubt</p>
                  </div>
                  <p className="max-w-[11rem] text-right text-sm leading-6 text-slate-300">
                    A dramatic shadow-lord silhouette, but still safe and kid-friendly.
                  </p>
                </div>
                <div
                  aria-label="Darth Korvax battle figure"
                  className="korvax-figure-shell relative z-10 mt-4 flex min-h-[17rem] items-end justify-center"
                  role="img"
                >
                  <div className="korvax-ember-glow absolute bottom-14 h-44 w-36 rounded-full blur-3xl" />
                  <div className="korvax-figure relative h-72 w-52">
                    <div className="korvax-floor absolute bottom-2 left-1/2 h-5 w-32 -translate-x-1/2 rounded-full bg-amber-300/12 blur-md" />
                    <div className="korvax-cape absolute bottom-10 left-1/2 h-40 w-36 -translate-x-1/2 rounded-t-[3.5rem] rounded-b-[2rem]" />
                    <div className="korvax-shoulders absolute left-1/2 top-[4.7rem] h-20 w-32 -translate-x-1/2 rounded-[2.4rem] border border-white/6 bg-slate-900/85" />
                    <div className="korvax-head absolute left-1/2 top-8 h-14 w-14 -translate-x-1/2 rounded-full" />
                    <div className="korvax-hood absolute left-1/2 top-6 h-[4.5rem] w-[4.5rem] -translate-x-1/2 rounded-[2.4rem]" />
                    <div className="korvax-crown absolute left-1/2 top-5 h-8 w-[5.5rem] -translate-x-1/2" />
                    <div className="korvax-torso absolute left-1/2 top-[5.45rem] h-28 w-24 -translate-x-1/2 rounded-[2rem]" />
                    <div className="korvax-arm korvax-arm-left absolute left-[24%] top-[5.8rem] h-24 w-5" />
                    <div className="korvax-arm korvax-arm-right absolute right-[24%] top-[5.8rem] h-24 w-5" />
                    <div className="korvax-hand korvax-hand-left absolute bottom-[6.9rem] left-[23%] h-5 w-5 rounded-full" />
                    <div className="korvax-hand korvax-hand-right absolute bottom-[6.9rem] right-[23%] h-5 w-5 rounded-full" />
                    <div className="korvax-leg korvax-leg-left absolute bottom-9 left-[39%] h-24 w-6" />
                    <div className="korvax-leg korvax-leg-right absolute bottom-9 right-[39%] h-24 w-6" />
                    <div className="korvax-core absolute left-1/2 top-[7.2rem] h-10 w-10 -translate-x-1/2 rounded-full" />
                  </div>
                {isPlayerAttacking ? (
                  <div className="lightsaber-slash pointer-events-none absolute inset-y-12 left-6 right-6 rounded-full bg-gradient-to-r from-transparent via-white/90 to-transparent opacity-0" />
                ) : null}
              </div>
            </div>
            </div>
          </div>

          <div className="mt-6 rounded-[2rem] border border-white/10 bg-slate-950/45 p-6">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Battle Text</p>
            <p className="mt-3 text-xl leading-8 text-slate-100">{battleText}</p>
            {!isDefeated && !isVictory && attack ? (
              <>
                <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-5">
                  <p className="font-display text-2xl text-white">{attack.bossMove}</p>
                  <p className="mt-2 text-lg text-amber-100">"{attack.statement}"</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {powerUps.map((powerUp) => {
                    const isChosen = powerUp.name === selectedPowerUp;
                    return (
                      <button
                        key={powerUp.name}
                        className={`rounded-full border px-4 py-3 text-left transition ${
                          isChosen
                            ? "border-cyan-200/60 bg-cyan-300/10 ring-2 ring-cyan-200/30"
                            : "border-white/10 bg-slate-900/70 text-slate-100 hover:border-white/25 hover:bg-slate-800"
                        }`}
                        onClick={() => handlePowerUpChoice(powerUp.name)}
                        type="button"
                      >
                        {powerUp.name}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    className={`rounded-full px-6 py-3 font-display text-lg transition focus:outline-none focus:ring-2 ${
                      attackReady
                        ? "bg-amber-300 text-slate-950 hover:bg-amber-200 focus:ring-amber-200"
                        : "cursor-not-allowed border border-white/10 bg-slate-800 text-slate-400 focus:ring-white/20"
                    }`}
                    disabled={!attackReady}
                    onClick={handleAttack}
                    type="button"
                  >
                    {attackReady ? "Attack" : "Choose the right power-up first"}
                  </button>
                  <span className="self-center text-sm uppercase tracking-[0.22em] text-slate-400">
                    Spacebar also works
                  </span>
                </div>
              </>
            ) : null}

            {isDefeated ? (
              <div className="mt-6 rounded-[1.75rem] border border-rose-200/20 bg-rose-400/10 p-5">
                <p className="font-display text-3xl text-white">Darth Korvax struck back.</p>
                <p className="mt-2 leading-7 text-slate-100">
                  Your mission progress is still safe. Catch your breath and try the battle again.
                </p>
                <button
                  className="mt-4 rounded-full bg-rose-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                  onClick={resetBattle}
                  type="button"
                >
                  Retry Battle
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <aside>
          <div className="glass-panel rounded-[2rem] border border-white/10 p-6">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Battle Guide</p>
            <ol className="mt-4 space-y-3 text-slate-200">
              <li>1. Hear the lie clearly before you respond.</li>
              <li>2. Match the right power-up to the true doctrine.</li>
              <li>3. Strike when the truth is ready.</li>
            </ol>
            <p className="mt-6 font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Charged Responses</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {player.chargedPowerUps.map((powerUp) => (
                <span
                  key={powerUp}
                  className="rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 text-sm text-slate-100"
                >
                  {powerUp}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
