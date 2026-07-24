import { RELAY } from "@/content/launch";
import type { WorldId } from "@/worlds";

export default function LaunchArtifact({ world }: { world: WorldId }) {
  return (
    <article className={`launch-artifact artifact-${world}`} aria-label={`Relay decision artifact in the ${world} register`}>
      <header>
        <span>{RELAY.disclosure}</span>
        <span>{RELAY.id}</span>
      </header>
      <div className="artifact-title">
        <p>{RELAY.name} / product decision</p>
        <h3>{RELAY.artifact.title}</h3>
      </div>
      <div className="artifact-recommendation">
        <span>Recommendation</span>
        <p>{RELAY.artifact.recommendation}</p>
      </div>
      <div className="artifact-evidence">
        <span>Evidence attached</span>
        <ul>{RELAY.artifact.evidence.map((item, index) => <li key={item}>0{index + 1} — {item}</li>)}</ul>
      </div>
      <footer>
        <span>Human review required</span>
        <p>{RELAY.artifact.caveat}</p>
      </footer>
    </article>
  );
}
