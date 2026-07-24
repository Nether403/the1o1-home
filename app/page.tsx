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
import Y2k from "@/components/worlds/Y2k";
import Noir from "@/components/worlds/Noir";
import End from "@/components/End";
import ProofPath from "@/components/proof/ProofPath";
import WalkIntro from "@/components/walk/WalkIntro";
import InquirySection from "@/components/inquiry/InquirySection";

/**
 * THE WALK — one product argument across six core worlds and one guest.
 * Sections are server-rendered; all behavior mounts once via <Interactions/>.
 */
export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Chrome />
      <Nav />
      <Dial />
      <main id="main-content">
        <Hero />
        <ProofPath />
        <WalkIntro />
        <Swiss />
        <Maison />
        <Brut />
        <Term />
        <Toy />
        <Y2k />
        <Noir />
        <InquirySection />
      </main>
      <End />
      <Interactions />
      <Motion />
      <Modules />
    </>
  );
}
