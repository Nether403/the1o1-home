import { SPECIMEN, specimenCaption, type SpecimenVariant } from "@/content/specimen";
import { WORLDS, type WorldId } from "@/worlds";

/**
 * THE SPECIMEN — one brief, re-set in every register.
 *
 * The recurring device that carries the whole argument: same words, seven
 * worlds, one standard. Each world dresses it in its own typography and
 * casing via `.specimen` CSS scoped under the world id.
 */
export default function Specimen({ world, variant }: { world: WorldId; variant: SpecimenVariant }) {
  const w = WORLDS[world];
  return (
    <div className="specimen ea">
      <div className="spec-cap">{specimenCaption(world)}</div>
      <div className="card">
        <div className="bh">
          <span>BRIEF {SPECIMEN.id}</span>
          <span>{w.displayCode} / {w.shortName}</span>
        </div>
        <div className={`ask${world === "y2k" ? " chrome-txt" : ""}`}>{variant.ask}</div>
        <div className="meta">
          {variant.meta.map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
