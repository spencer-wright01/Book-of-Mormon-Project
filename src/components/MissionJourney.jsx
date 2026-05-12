import { useMemo, useState } from "react";
import scriptureFocus from "../data/scriptureFocus";
import PlayerAvatar from "./PlayerAvatar";

export default function MissionJourney({ mission, player, onBack, onStartChallenge }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});
  const focus = scriptureFocus[mission.scriptureFocusId];

  const currentScene = mission.scenes[sceneIndex];
  const choiceSelection = selectedChoices[currentScene.id];
  const selectedChoice = currentScene.choices?.find((choice) => choice.id === choiceSelection);
  const isLastScene = sceneIndex === mission.scenes.length - 1;

  const canContinue = useMemo(() => {
    if (!currentScene.choices?.length) {
      return true;
    }

    return Boolean(choiceSelection);
  }, [choiceSelection, currentScene.choices]);

  function handleChoice(choiceId) {
    setSelectedChoices((previous) => ({
      ...previous,
      [currentScene.id]: choiceId,
    }));
  }

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    if (isLastScene) {
      onStartChallenge();
      return;
    }

    setSceneIndex((value) => value + 1);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="glass-panel rounded-[2rem] border border-white/10 p-6">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">
            Mission Journey
          </p>
          <h2 className="mt-3 font-display text-4xl text-white">{mission.title}</h2>
          <div className="mt-5 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
            <div className="flex items-center gap-4">
              <PlayerAvatar player={player} showLightsaber={false} size="sm" />
              <div>
                <p className="font-display text-2xl text-white">{player.title}</p>
                <p className="mt-1 text-slate-300">
                  You are the one entering this training mission. {mission.character} is the scripture example guiding your path.
                </p>
              </div>
            </div>
          </div>
          <dl className="mt-5 space-y-4 text-slate-200">
            <div>
              <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">Character</dt>
              <dd className="mt-1 text-lg">{mission.character}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">Scripture</dt>
              <dd className="mt-1 text-lg">{mission.scriptureReference}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">Principle</dt>
              <dd className="mt-1 text-lg">{mission.principle}</dd>
            </div>
            <div>
              <dt className="text-sm uppercase tracking-[0.2em] text-slate-400">Reward</dt>
              <dd className="mt-1 text-lg">{mission.reward}</dd>
            </div>
          </dl>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/50 p-4">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Scene {sceneIndex + 1} of {mission.scenes.length}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-200 transition-all duration-300"
                style={{ width: `${((sceneIndex + 1) / mission.scenes.length) * 100}%` }}
              />
            </div>
          </div>

          {focus ? (
            <div className="mt-6 rounded-3xl border border-cyan-200/15 bg-cyan-300/10 p-4">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Scripture Focus</p>
              <p className="mt-2 font-display text-2xl text-white">{focus.title}</p>
              <p className="mt-2 text-sm text-cyan-100/80">{focus.reference}</p>
              <p className="mt-3 leading-7 text-slate-200">{focus.summary}</p>
            </div>
          ) : null}
        </aside>

        <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-amber-200/80">
            Story Scene
          </p>
          <p className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-300/10 px-4 py-3 text-base leading-7 text-cyan-50">
            {player.title} steps into a scripture memory chamber and learns what this story can teach for the final battle ahead.
          </p>
          <p className="mt-5 text-xl leading-9 text-slate-100">{currentScene.narration}</p>

          {currentScene.prompt ? (
            <div className="mt-8">
              <h3 className="font-display text-2xl text-white">{currentScene.prompt}</h3>
              <div className="mt-4 space-y-3">
                {currentScene.choices.map((choice) => {
                  const isSelected = choice.id === choiceSelection;

                  return (
                    <button
                      key={choice.id}
                      className={`block w-full rounded-3xl border px-5 py-4 text-left transition ${
                        isSelected
                          ? "border-cyan-200/60 bg-cyan-300/10 ring-2 ring-cyan-200/30"
                          : "border-white/10 bg-slate-950/45 hover:border-white/25 hover:bg-slate-900/85"
                      }`}
                      type="button"
                      onClick={() => handleChoice(choice.id)}
                    >
                      <span className="text-lg font-semibold text-white">{choice.text}</span>
                    </button>
                  );
                })}
              </div>

              {selectedChoice ? (
                <div className="mt-5 rounded-3xl border border-emerald-200/20 bg-emerald-300/10 p-4 text-slate-100">
                  <p className="font-semibold text-emerald-100">
                    {selectedChoice.id === currentScene.correctChoiceId ? "Faithful choice." : "Keep learning."}
                  </p>
                  <p className="mt-2 leading-7">{selectedChoice.feedback}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {isLastScene ? (
            <div className="mt-8 rounded-[1.75rem] border border-amber-200/20 bg-amber-300/10 p-5">
              <p className="font-display text-2xl text-white">Reward Incoming</p>
              <p className="mt-2 leading-7 text-slate-100">
                Finish this journey to receive <span className="font-semibold text-amber-100">{mission.reward}</span>,
                then charge it in your challenge.
              </p>
            </div>
          ) : null}

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Reflection Question</p>
            <p className="mt-3 text-lg leading-8 text-slate-100">{mission.reflectionQuestion}</p>
          </div>

          {focus ? (
            <div className="mt-6 rounded-[1.75rem] border border-amber-200/20 bg-amber-300/10 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-amber-100/80">Why This Scripture Matters</p>
              <ul className="mt-3 space-y-3 text-slate-100">
                {focus.teachingPoints.map((point) => (
                  <li key={point} className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Current content mode: local curated summary. Later, you can replace this with an approved verse excerpt using the query hint <span className="font-semibold text-slate-100">{focus.mcpQueryHint}</span>.
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className={`rounded-full px-6 py-3 font-display text-lg transition focus:outline-none focus:ring-2 ${
                canContinue
                  ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200 focus:ring-cyan-200"
                  : "cursor-not-allowed border border-white/10 bg-slate-800 text-slate-400 focus:ring-white/20"
              }`}
              disabled={!canContinue}
              onClick={handleContinue}
              type="button"
            >
              {isLastScene ? "Begin Power-Up Challenge" : "Continue Journey"}
            </button>
            <button
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={onBack}
              type="button"
            >
              Back to Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
