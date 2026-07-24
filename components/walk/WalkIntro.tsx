import { RELAY } from "@/content/launch";
import { WORLDS } from "@/worlds";

export default function WalkIntro() {
  return (
    <section id="walk" className="walk-intro" aria-labelledby="walk-title">
      <div className="walk-intro-head">
        <p className="walk-disclosure">{RELAY.disclosure} / {RELAY.id}</p>
        <h2 id="walk-title">One product.<br />Seven decisions.</h2>
        <p>
          Relay is a self-initiated AI-native product launch used to demonstrate product strategy, identity,
          interface, motion, and implementation. The product remains constant. Each world changes how the
          decision is framed, tested, and communicated.
        </p>
      </div>
      <ol className="walk-index" aria-label="Relay launch chapters">
        {RELAY.chapters.map((chapter, index) => {
          const world = WORLDS[chapter.world];
          return (
            <li key={chapter.world}>
              <a href={`#${world.sectionId}`}>
                <span>{String(index + 1).padStart(2, "0")} / {world.displayCode}</span>
                <b>{chapter.phase}</b>
                <small>{chapter.question}</small>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
