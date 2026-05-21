import { useState } from "react";
import missionBosses from "../data/missionBosses";
import scriptureFocus from "../data/scriptureFocus";
import HealthBar from "./HealthBar";
import PlayerAvatar from "./PlayerAvatar";

const PLAYER_MAX_HP = 70;

function getBossForMission(mission) {
  return missionBosses[mission.id] || {
    name: "Mission Guardian",
    title: "Keeper of the Gate",
    hp: 50,
    color: "bg-amber-300",
    opening: "A guardian blocks the path to the reward.",
    weakness: mission.principle,
    focusMove: "Stand in Truth",
    focusMessage: `${mission.character}'s lesson strengthens your strike.`,
    rewardMessage: `The guardian falls back, and ${mission.reward} is yours.`,
    moves: ["Turn back from the path.", "Forget what you have learned."],
  };
}

export default function MissionBoss({ mission, player, onBack, onComplete }) {
  const boss = getBossForMission(mission);
  const focus = scriptureFocus[mission.scriptureFocusId];
  const [playerHp, setPlayerHp] = useState(PLAYER_MAX_HP);
  const [bossHp, setBossHp] = useState(boss.hp);
  const [turn, setTurn] = useState(0);
  const [battleText, setBattleText] = useState(boss.opening);
  const [guarding, setGuarding] = useState(false);
  const [locked, setLocked] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [heroAction, setHeroAction] = useState("");
  const [bossAction, setBossAction] = useState("");
  const [damagePopup, setDamagePopup] = useState(null);

  function resetBattle() {
    setPlayerHp(PLAYER_MAX_HP);
    setBossHp(boss.hp);
    setTurn(0);
    setBattleText(boss.opening);
    setGuarding(false);
    setLocked(false);
    setWon(false);
    setLost(false);
    setHeroAction("");
    setBossAction("");
    setDamagePopup(null);
  }

  function resolveHeroAction(action) {
    if (locked || won || lost) {
      return;
    }

    const actionConfig = {
      strike: {
        damage: 13,
        text: `${player.title} rushes in with a lightsaber strike.`,
      },
      focus: {
        damage: 19,
        text: boss.focusMessage,
      },
      guard: {
        damage: 7,
        text: `${player.title} raises a guard and watches the enemy's pattern.`,
      },
    }[action];

    const nextBossHp = Math.max(0, bossHp - actionConfig.damage);

    setLocked(true);
    setHeroAction(action === "guard" ? "hero-guard" : "mission-hero-attack");
    setDamagePopup({ side: "boss", amount: actionConfig.damage });
    setBattleText(actionConfig.text);
    setGuarding(action === "guard");

    window.setTimeout(() => {
      setBossHp(nextBossHp);
    }, 180);

    window.setTimeout(() => {
      setHeroAction("");
      setDamagePopup(null);

      if (nextBossHp <= 0) {
        setWon(true);
        setLocked(false);
        setBattleText(boss.rewardMessage);
        return;
      }

      const bossMove = boss.moves[turn % boss.moves.length];
      const incomingDamage = action === "guard" || guarding ? 6 : 13;
      const nextPlayerHp = Math.max(0, playerHp - incomingDamage);

      setBossAction("mission-boss-attack");
      setDamagePopup({ side: "player", amount: incomingDamage });
      setBattleText(`${boss.name}: "${bossMove}"`);

      window.setTimeout(() => {
        setPlayerHp(nextPlayerHp);
      }, 180);

      window.setTimeout(() => {
        setBossAction("");
        setDamagePopup(null);
        setGuarding(false);
        setTurn((value) => value + 1);

        if (nextPlayerHp <= 0) {
          setLost(true);
          setBattleText(`${player.title} is pushed back from the gate. Try the mission boss again when you are ready.`);
          setLocked(false);
          return;
        }

        setLocked(false);
        setBattleText("The boss is open. Choose your next move.");
      }, 900);
    }, 720);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-amber-200/80">Mission Boss</p>
            <h2 className="mt-3 font-display text-4xl text-white">{boss.name}</h2>
            <p className="mt-2 text-lg text-slate-300">{boss.title}</p>
          </div>
          <button
            className="rounded-full border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
            onClick={onBack}
            type="button"
          >
            Back to Map
          </button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="grid gap-5 md:grid-cols-2">
              <div className={`mission-battle-panel relative overflow-hidden rounded-[1.5rem] border border-cyan-200/20 bg-slate-950/55 p-5 ${heroAction}`}>
                <HealthBar color="bg-cyan-300" current={playerHp} label={player.title} max={PLAYER_MAX_HP} />
                {damagePopup?.side === "player" ? (
                  <span className="damage-popup pointer-events-none absolute right-5 top-[4.5rem] text-3xl font-black text-rose-300">
                    -{damagePopup.amount}
                  </span>
                ) : null}
                <div className="mt-5 flex min-h-[16rem] items-end justify-center">
                  <PlayerAvatar player={player} size="md" variant="battle" />
                </div>
              </div>

              <div className={`mission-battle-panel relative overflow-hidden rounded-[1.5rem] border border-amber-200/20 bg-slate-950/55 p-5 ${bossAction}`}>
                <HealthBar color={boss.color} current={bossHp} label={boss.name} max={boss.hp} />
                {damagePopup?.side === "boss" ? (
                  <span className="damage-popup pointer-events-none absolute left-5 top-[4.5rem] text-3xl font-black text-amber-200">
                    -{damagePopup.amount}
                  </span>
                ) : null}
                <div className="mt-8 flex min-h-[15rem] items-end justify-center">
                  <div aria-label={`${boss.name} figure`} className="mission-boss-figure relative h-56 w-44" role="img">
                    <div className="mission-boss-aura absolute bottom-8 left-1/2 h-40 w-36 -translate-x-1/2 rounded-full blur-3xl" />
                    <div className="mission-boss-cloak absolute bottom-6 left-1/2 h-36 w-32 -translate-x-1/2 rounded-t-[3rem] rounded-b-[1.25rem]" />
                    <div className="mission-boss-head absolute left-1/2 top-8 h-14 w-14 -translate-x-1/2 rounded-full" />
                    <div className="mission-boss-torso absolute left-1/2 top-[5.5rem] h-24 w-24 -translate-x-1/2 rounded-[2rem]" />
                    <div className="mission-boss-arm mission-boss-arm-left absolute left-[19%] top-[6rem] h-20 w-5" />
                    <div className="mission-boss-arm mission-boss-arm-right absolute right-[19%] top-[6rem] h-20 w-5" />
                    <div className="mission-boss-core absolute left-1/2 top-[7.25rem] h-9 w-9 -translate-x-1/2 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Battle Text</p>
              <p className="mt-3 text-xl leading-8 text-slate-100">{battleText}</p>
            </div>

            {!won && !lost ? (
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-cyan-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  disabled={locked}
                  onClick={() => resolveHeroAction("strike")}
                  type="button"
                >
                  Saber Strike
                </button>
                <button
                  className="rounded-full bg-amber-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  disabled={locked}
                  onClick={() => resolveHeroAction("focus")}
                  type="button"
                >
                  {boss.focusMove}
                </button>
                <button
                  className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:cursor-not-allowed disabled:text-slate-500"
                  disabled={locked}
                  onClick={() => resolveHeroAction("guard")}
                  type="button"
                >
                  Guard
                </button>
              </div>
            ) : null}

            {won ? (
              <div className="mt-6 rounded-[1.75rem] border border-emerald-200/20 bg-emerald-300/10 p-5">
                <p className="font-display text-3xl text-white">{mission.reward} Acquired</p>
                <p className="mt-2 leading-7 text-slate-100">{mission.reflectionQuestion}</p>
                <button
                  className="mt-5 rounded-full bg-emerald-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  onClick={() => onComplete(mission)}
                  type="button"
                >
                  Claim Item
                </button>
              </div>
            ) : null}

            {lost ? (
              <div className="mt-6 rounded-[1.75rem] border border-rose-200/20 bg-rose-400/10 p-5">
                <p className="font-display text-3xl text-white">Try Again</p>
                <p className="mt-2 leading-7 text-slate-100">Your progress is safe. Restart this mission boss and make another run at the item.</p>
                <button
                  className="mt-5 rounded-full bg-rose-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-200"
                  onClick={resetBattle}
                  type="button"
                >
                  Retry Boss
                </button>
              </div>
            ) : null}
          </div>

          <aside className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">Reward Gate</p>
            <h3 className="mt-3 font-display text-3xl text-white">{mission.reward}</h3>
            <p className="mt-3 leading-7 text-slate-200">
              Weakness: <span className="font-semibold text-cyan-100">{boss.weakness}</span>
            </p>
            {focus ? (
              <div className="mt-5 rounded-2xl border border-cyan-200/15 bg-cyan-300/10 p-4">
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/80">Scripture Anchor</p>
                <p className="mt-2 font-display text-2xl text-white">{focus.reference}</p>
                <p className="mt-3 leading-7 text-slate-200">{focus.summary}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
