import { WORLDS, WORLD_ORDER } from "@/worlds";

export default function Dial() {
  return (
    <nav className="dial" id="dial" aria-label="World chapters">
      <a href="#hero" data-t="#hero" aria-label="The Deal"><i>THE DEAL</i></a>
      {WORLD_ORDER.map((id) => {
        const world = WORLDS[id];
        return <a key={id} href={`#${world.sectionId}`} data-t={`#${world.sectionId}`} aria-label={world.label}><i>{world.displayCode} {id === "y2k" ? "GUEST" : id.toUpperCase()}</i></a>;
      })}
      <a href="#end" data-t="#end" aria-label="Epilogue"><i>EPILOGUE</i></a>
    </nav>
  );
}
