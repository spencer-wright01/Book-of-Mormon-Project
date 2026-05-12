const outcomes = [
  {
    title: "Faith in Jesus Christ and Discipleship",
    description:
      "This game helps players think about faith in Jesus Christ by showing how Book of Mormon figures chose to follow God. Each mission points back to discipleship, repentance, prayer, obedience, and coming unto Christ.",
  },
  {
    title: "Book of Mormon Doctrine in Context",
    description:
      "Each mission is based on a specific Book of Mormon passage. The game includes context, characters, and doctrinal principles so the scripture stories are not separated from their original meaning.",
  },
  {
    title: "Scriptural Literacy and Sound Exegesis",
    description:
      "The project encourages scripture literacy by connecting gameplay to references, context, intent, and doctrine. Players are not just told a moral lesson; they see how the lesson comes from the text.",
  },
  {
    title: "Responsible Personal Application",
    description:
      "Each mission includes a reflection question that asks players to apply the doctrine in a thoughtful way. The application should come from the passage instead of forcing a random meaning onto the scripture.",
  },
];

function AboutProject({ onBack }) {
  return (
    <>
      {onBack ? (
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white/20"
          >
            Back
          </button>
        </div>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-2">
        {outcomes.map((outcome, index) => (
          <article
            key={outcome.title}
            className="rounded-[2rem] border border-white/10 bg-slate-900/75 p-6 shadow-xl shadow-slate-950/30 backdrop-blur sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
              Outcome {index + 1}
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white">
              {outcome.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-200">
              {outcome.description}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-6 text-amber-50 shadow-lg shadow-slate-950/20 sm:p-8">
        <h2 className="text-2xl font-black tracking-tight">
          Why This Format Works
        </h2>
        <p className="mt-4 text-base leading-8">
          The Path Back turns scripture study into a guided adventure. Players
          do not just collect rewards. They practice remembering doctrine,
          connecting it to real Book of Mormon passages, and applying it in
          faithful ways that fit the stories themselves.
        </p>
      </section>
    </>
  );
}

export default AboutProject;
