import Specimen from "@/components/specimen/Specimen";
import { SPECIMEN_VARIANTS } from "@/content/specimen";

export default function Y2k() {
  return (
    <>
      {/* ————— SEAM GATE — guest world, flare sweep ————— */}
      <div className="seam" id="s-y2k" data-w="y2k" data-label="LOADING — G·01 Y2K CHROME" aria-hidden="true">
        <div className="s-kick">THE WALK — GUEST GATE · WORLD OF THE MONTH</div>
        <h3 className="chrome-txt">
          NOW LOADING → WORLD_07
          <br />
          Y2K CHROME
        </h3>
        <div className="flare" />
      </div>

      {/* ————— G·01 — WORLD OF THE MONTH ————— */}
      <section className="world" id="w-y2k" data-w="y2k" data-label="G·01 — WORLD OF THE MONTH" aria-labelledby="y2k-title">
        <div className="y2k-blob" aria-hidden="true" />
        <span className="wtag ea">G·01 / WORLD OF THE MONTH — JULY 2026 EDITION: Y2K CHROME</span>
        <h2 className="chrome-txt ea" id="y2k-title">
          The future,
          <br />
          as remembered.
        </h2>
        <p className="lede ea">
          The house adds a chair every month. A guest register joins The Walk and the deal — fully
          committed, budget-gated, gone when its month ends. This one is July&apos;s:{" "}
          <b>liquid metal, capsule interfaces, and exactly one lens flare</b> — earned ironically.
        </p>

        <div className="caps">
          <div className="cap ea">
            <div className="cn">PROGRAM // 01</div>
            <h3>A new world, monthly</h3>
            <p>
              Registers here are coordinated by a <b>shared registry</b> — identity, walk position,
              tokens, cursor, wipe personality — then authored by hand. A guest arrives as one pull
              request. Next month: a different chair at the same table.
            </p>
          </div>
          <div className="cap ea">
            <div className="cn">REGISTER // 02</div>
            <h3>Chrome, sincerely</h3>
            <p>
              Michroma set wide, silver gradients doing the work brushed aluminium used to, a cursor
              of actual liquid metal, and a blob that follows you around like it&apos;s 1999 and the
              future still gleams.
            </p>
          </div>
          <div className="cap ea">
            <div className="cn">COMMISSION // 03</div>
            <h3>Your register, next</h3>
            <p>
              This is also the offer: bring a brand, get a world. If your problem deserves its own
              design language, <b>that&apos;s a conversation</b> —{" "}
              <a href="#inquiry">open the channel ↘</a>.
            </p>
          </div>
        </div>

        <Specimen world="y2k" variant={SPECIMEN_VARIANTS.y2k} />
      </section>
    </>
  );
}
