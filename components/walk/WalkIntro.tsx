import { SPECIMEN } from "@/content/specimen";
import { WORLD_ORDER, WORLDS, type WorldId } from "@/worlds";

/** One-line note per register — what the visitor is walking into. */
const WALK_NOTES: Record<WorldId, string> = {
  swiss: "The origin, on the grid",
  maison: "The services, in Bodoni",
  brut: "The work, no decoration",
  term: "The machine room, queryable",
  toy: "Physics with manners",
  y2k: "Guest register — this month only",
  noir: "The ask, under a flashlight",
};

/**
 * THE WALK — the index. Names what the visitor is about to experience and
 * why it exists: one brief, every register, one standard. Doubles as a
 * no-JS navigation surface for the seven worlds.
 */
export default function WalkIntro() {
  return (
    <section id="walk" className="walk-intro" aria-labelledby="walk-title">
      <div className="walk-intro-head">
        <p className="walk-disclosure">THE WALK / SEVEN REGISTERS · ONE STANDARD</p>
        <h2 id="walk-title">One brief.<br />Every register.</h2>
        <p>
          Below, a single brief — <b>&ldquo;{SPECIMEN.ask}&rdquo;</b> — travels through seven fully
          committed design worlds. Each changes the typography, palette, motion language, cursor, and
          interaction signature. The words never change. <b>The standard never changes.</b> That is
          the whole argument, and this is the evidence.
        </p>
      </div>
      <ol className="walk-index" aria-label="The seven worlds">
        {WORLD_ORDER.map((id, index) => {
          const world = WORLDS[id];
          return (
            <li key={id}>
              <a href={`#${world.sectionId}`}>
                <span>{String(index + 1).padStart(2, "0")} / {world.displayCode}</span>
                <b>{world.shortName}</b>
                <small>{WALK_NOTES[id]}</small>
              </a>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
