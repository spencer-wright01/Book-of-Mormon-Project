import { useMemo, useState } from "react";
import scriptureFocus from "../data/scriptureFocus";
import PlayerAvatar from "./PlayerAvatar";

export default function MissionJourney({ mission, player, onBack, onStartMissionBoss }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState({});
  const focus = scriptureFocus[mission.scriptureFocusId];

  const currentScene = mission.scenes[sceneIndex];
  const choiceSelection = selectedChoices[currentScene.id];
  const selectedChoice = currentScene.choices?.find((choice) => choice.id === choiceSelection);
  const isLastScene = sceneIndex === mission.scenes.length - 1;
  const mentorLine = useMemo(() => {
    const mentorName = mission.character;
    const baseLine = `${mentorName} guides ${player.title} through this memory-path so the story becomes a lesson you can carry into your own fight against doubt.`;

    const linesByMission = {
      "The Brass Plates Mission":
        `${mentorName} walks beside ${player.title} like a steady Jedi guide, teaching that brave obedience begins when you choose to move forward before the whole path is visible.`,
      "The Prayer in the Wilderness":
        `${mentorName} becomes a quiet guide for ${player.title}, showing that real strength grows in honest prayer and in opening your whole heart to God.`,
      "The Change of Alma":
        `${mentorName} teaches ${player.title} that no one is stuck forever, because Jesus Christ can change hearts and lead them back into the light.`,
      "The Shining Stones":
        `${mentorName} mentors ${player.title} through uncertainty, showing that faithful questions and revelation can bring light to dark places.`,
      "The Title of Liberty":
        `${mentorName} trains ${player.title} to stand with courage, remember sacred promises, and defend what is good without losing kindness.`,
      "The Light at Bountiful":
        `${mentorName} helps ${player.title} slow down and listen, because this mission points directly to Jesus Christ and the invitation to come unto Him.`,
    };

    return linesByMission[mission.title] ?? baseLine;
  }, [mission.character, mission.title, player.title]);
  const mentorPrompt = useMemo(() => {
    if (currentScene.prompt) {
      return `${mission.character} asks, "${currentScene.prompt}"`;
    }

    return `${mission.character} keeps leading ${player.title} deeper into the story.`;
  }, [currentScene.prompt, mission.character, player.title]);

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
      onStartMissionBoss();
      return;
    }

    setSceneIndex((value) => value + 1);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="glass-panel overflow-hidden rounded-[2rem] border border-white/10">
        <div className="border-b border-white/10 px-6 py-6 md:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">
                Mission Journey
              </p>
              <h2 className="font-display text-4xl text-white">{mission.title}</h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-200">{mentorLine}</p>
            </div>
            <div className="flex items-center gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/45 px-4 py-4">
              <PlayerAvatar player={player} showLightsaber={false} size="sm" />
              <div className="min-w-0">
                <p className="font-display text-2xl text-white">{player.title}</p>
                <p className="text-sm text-slate-300">Guided by {mission.character}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 text-slate-100">
              Scripture: {mission.scriptureReference}
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 text-slate-100">
              Principle: {mission.principle}
            </span>
            <span className="rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 text-slate-100">
              Reward: {mission.reward}
            </span>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between text-sm uppercase tracking-[0.22em] text-slate-400">
              <span>
                Scene {sceneIndex + 1} of {mission.scenes.length}
              </span>
              <span>{Math.round(((sceneIndex + 1) / mission.scenes.length) * 100)}% complete</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-200 transition-all duration-300"
                style={{ width: `${((sceneIndex + 1) / mission.scenes.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-6 md:px-8 md:py-8">
          <div className="rounded-[1.75rem] border border-cyan-200/15 bg-cyan-300/10 px-5 py-4">
            <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/80">Guide Transmission</p>
            <p className="mt-2 text-base leading-7 text-cyan-50">{mentorPrompt}</p>
          </div>

          <div className="mt-6 space-y-5">
            <p className="text-xl leading-9 text-slate-100">{currentScene.narration}</p>

            {focus ? (
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/45 px-5 py-4">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Scripture Focus</p>
                <p className="mt-2 font-display text-2xl text-white">{focus.title}</p>
                <p className="mt-1 text-sm text-cyan-100/80">{focus.reference}</p>
                <p className="mt-3 leading-7 text-slate-200">{focus.summary}</p>
              </div>
            ) : null}
          </div>

          {currentScene.prompt ? (
            <div className="mt-8">
              <h3 className="font-display text-2xl text-white">Choose Your Response</h3>
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
                <div className="mt-5 rounded-[1.5rem] border border-emerald-200/20 bg-emerald-300/10 p-4 text-slate-100">
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
                then win it from the mission boss.
              </p>
            </div>
          ) : null}

          {focus ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[1.75rem] border border-amber-200/20 bg-amber-300/10 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-amber-100/80">Why This Scripture Matters</p>
                <ul className="mt-3 space-y-3 text-slate-100">
                  {focus.teachingPoints.map((point) => (
                    <li key={point} className="rounded-2xl border border-white/10 bg-slate-950/35 px-4 py-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Reflection Question</p>
                <p className="mt-3 text-lg leading-8 text-slate-100">{mission.reflectionQuestion}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Current content mode: local curated summary. Later, you can replace this with an approved verse excerpt using the query hint <span className="font-semibold text-slate-100">{focus.mcpQueryHint}</span>.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Reflection Question</p>
              <p className="mt-3 text-lg leading-8 text-slate-100">{mission.reflectionQuestion}</p>
            </div>
          )}

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
              {isLastScene ? "Face Mission Boss" : "Continue Journey"}
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
