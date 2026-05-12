import { useState } from "react";
import scriptureFocus from "../data/scriptureFocus";
import PlayerAvatar from "./PlayerAvatar";

function getPassingScore(questionCount) {
  return Math.max(2, Math.ceil(questionCount * 0.67));
}

export default function PowerUpChallenge({ mission, player, onBack, onComplete }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const focus = scriptureFocus[mission.scriptureFocusId];

  const currentQuestion = mission.challengeQuestions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const passingScore = getPassingScore(mission.challengeQuestions.length);

  function handleSelect(option) {
    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: option,
    }));
  }

  function handleNext() {
    if (!selectedAnswer) {
      return;
    }

    if (currentQuestionIndex === mission.challengeQuestions.length - 1) {
      const nextScore = mission.challengeQuestions.reduce((total, question) => {
        return total + ((answers[question.id] ?? (question.id === currentQuestion.id ? selectedAnswer : null)) === question.correctAnswer ? 1 : 0);
      }, 0);

      setResults({
        score: nextScore,
        passed: nextScore >= passingScore,
      });
      return;
    }

    setCurrentQuestionIndex((value) => value + 1);
  }

  function handleRetry() {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResults(null);
  }

  if (results) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-8">
        <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-cyan-200/80">
            Power-Up Challenge Results
          </p>
          <h2 className="mt-3 font-display text-4xl text-white">{mission.reward}</h2>
          <p className="mt-3 text-xl text-slate-100">
            You answered {results.score} out of {mission.challengeQuestions.length} correctly.
          </p>
          <p className="mt-2 text-slate-300">
            You need {passingScore} correct answers to fully charge this power-up.
          </p>

          <div className="mt-6 space-y-4">
            {mission.challengeQuestions.map((question) => {
              const answer = answers[question.id];
              const isCorrect = answer === question.correctAnswer;

              return (
                <article
                  key={question.id}
                  className={`rounded-3xl border p-5 ${
                    isCorrect
                      ? "border-emerald-200/20 bg-emerald-300/10"
                      : "border-amber-200/20 bg-amber-300/10"
                  }`}
                >
                  <h3 className="font-display text-2xl text-white">{question.question}</h3>
                  <p className="mt-2 text-slate-100">
                    Your answer: <span className="font-semibold">{answer || "No answer selected"}</span>
                  </p>
                  <p className="mt-2 text-slate-100">
                    Correct answer: <span className="font-semibold">{question.correctAnswer}</span>
                  </p>
                  <p className="mt-3 leading-7 text-slate-200">{question.explanation}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">Reflection Question</p>
            <p className="mt-3 text-lg leading-8 text-slate-100">{mission.reflectionQuestion}</p>
          </div>

          {focus ? (
            <div className="mt-6 rounded-[1.75rem] border border-cyan-200/15 bg-cyan-300/10 p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/80">Scripture Prompt</p>
              <p className="mt-3 text-lg leading-8 text-slate-100">{focus.devotionalPrompt}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {results.passed ? (
              <button
                className="rounded-full bg-cyan-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                onClick={() => onComplete(mission)}
                type="button"
              >
                Charge Power-Up and Return to Map
              </button>
            ) : (
              <button
                className="rounded-full bg-amber-300 px-6 py-3 font-display text-lg text-slate-950 transition hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-200"
                onClick={handleRetry}
                type="button"
              >
                Try Challenge Again
              </button>
            )}

            <button
              className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30"
              onClick={onBack}
              type="button"
            >
              Back to Map
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-8">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="glass-panel rounded-[2rem] border border-white/10 p-6">
          <p className="font-display text-sm uppercase tracking-[0.28em] text-cyan-200/80">
            Power-Up Challenge
          </p>
          <h2 className="mt-3 font-display text-4xl text-white">{mission.reward}</h2>
          <p className="mt-4 leading-8 text-slate-200">
            {player.title}, answer questions about the story, the doctrine, and how it applies in real life so your armor becomes battle-ready.
          </p>
          <div className="mt-5 flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
            <PlayerAvatar player={player} showLightsaber={false} size="sm" />
            <div>
              <p className="font-display text-xl text-white">Power-Up Charging Chamber</p>
              <p className="mt-1 text-slate-300">This reward belongs to your custom hero, not to the scripture character.</p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/45 p-4">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Question {currentQuestionIndex + 1} of {mission.challengeQuestions.length}
            </p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-amber-200 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / mission.challengeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {focus ? (
            <div className="mt-6 rounded-3xl border border-cyan-200/15 bg-cyan-300/10 p-4">
              <p className="text-sm uppercase tracking-[0.22em] text-cyan-100/80">Scripture Anchor</p>
              <p className="mt-2 font-display text-2xl text-white">{focus.reference}</p>
              <p className="mt-3 leading-7 text-slate-200">{focus.summary}</p>
            </div>
          ) : null}
        </aside>

        <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-amber-200/80">
            Challenge Question
          </p>
          <p className="mt-4 rounded-2xl border border-cyan-200/15 bg-cyan-300/10 px-4 py-3 text-base leading-7 text-cyan-50">
            {player.title} is charging the {mission.reward} by remembering what the scripture story teaches.
          </p>
          <h3 className="mt-4 font-display text-3xl text-white">{currentQuestion.question}</h3>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = option === selectedAnswer;

              return (
                <button
                  key={option}
                  className={`block w-full rounded-3xl border px-5 py-4 text-left transition ${
                    isSelected
                      ? "border-cyan-200/60 bg-cyan-300/10 ring-2 ring-cyan-200/30"
                      : "border-white/10 bg-slate-950/45 hover:border-white/25 hover:bg-slate-900/85"
                  }`}
                  onClick={() => handleSelect(option)}
                  type="button"
                >
                  <span className="text-lg font-semibold text-white">{option}</span>
                </button>
              );
            })}
          </div>

          {selectedAnswer ? (
            <div className="mt-5 rounded-3xl border border-cyan-200/20 bg-cyan-300/10 p-4">
              <p className="font-semibold text-cyan-100">
                {selectedAnswer === currentQuestion.correctAnswer ? "Strong answer." : "Thoughtful effort."}
              </p>
              <p className="mt-2 leading-7 text-slate-100">{currentQuestion.explanation}</p>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className={`rounded-full px-6 py-3 font-display text-lg transition focus:outline-none focus:ring-2 ${
                selectedAnswer
                  ? "bg-cyan-300 text-slate-950 hover:bg-cyan-200 focus:ring-cyan-200"
                  : "cursor-not-allowed border border-white/10 bg-slate-800 text-slate-400 focus:ring-white/20"
              }`}
              disabled={!selectedAnswer}
              onClick={handleNext}
              type="button"
            >
              {currentQuestionIndex === mission.challengeQuestions.length - 1 ? "See Results" : "Next Question"}
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
