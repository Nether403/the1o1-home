import Chrome from "@/components/spine/Chrome";
import Nav from "@/components/spine/Nav";
import Dial from "@/components/spine/Dial";
import Interactions from "@/components/spine/Interactions";
import Motion from "@/components/spine/Motion";
import Modules from "@/components/spine/Modules";
import Hero from "@/components/Hero";
import Swiss from "@/components/worlds/Swiss";
import Maison from "@/components/worlds/Maison";
import Brut from "@/components/worlds/Brut";
import Term from "@/components/worlds/Term";
import Toy from "@/components/worlds/Toy";
import Noir from "@/components/worlds/Noir";
import End from "@/components/End";

/**
 * THE WALK — one semantic spine, six worlds, designed seams.
 * Sections are server-rendered; all behavior mounts once via <Interactions/>.
 */
export default function Page() {
  return (
    <main>
      <a className="skip-link" href="#w-noir">Skip to contact</a>
      <Chrome />
      <Nav />
      <Dial />
      <Hero />
      <Swiss />
      <Maison />
      <Brut />
      <Term />
      <Toy />
      <Noir />
      <End />
      <Interactions />
      <Motion />
      <Modules />
    </main>
  );
}
