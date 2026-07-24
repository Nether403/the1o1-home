import LaunchArtifact from "@/components/artifact/LaunchArtifact";

export default function Y2k() {
  return (
    <>
      <div className="seam" id="s-y2k" data-w="y2k" data-label="LOADING — G·01 Y2K CHROME" aria-hidden="true">
        <div className="s-kick">RELAY — CHAPTER 06 / ROLLOUT CONSOLE</div>
        <h3 className="chrome-txt">
          NOW LOADING → RELAY_BETA
          <br />
          Y2K CHROME
        </h3>
        <div className="flare" />
      </div>

      <section className="world" id="w-y2k" data-w="y2k" data-label="G·01 — RELAY / ROLLOUT CONSOLE" aria-labelledby="y2k-title">
        <div className="y2k-blob" aria-hidden="true" />
        <span className="wtag ea">G·01 / GUEST WORLD — RELAY PRIVATE BETA CONTROL SURFACE</span>
        <h2 className="chrome-txt ea" id="y2k-title">
          Ship the future,
          <br />
          then watch it closely.
        </h2>
        <p className="lede ea">
          A private beta is not a smaller launch. It is a deliberately instrumented argument. Relay enters
          with one audience, one decision workflow, and <b>exactly enough telemetry to learn where trust breaks.</b>
        </p>

        <div className="caps">
          <div className="cap ea">
            <div className="cn">BETA // 01</div>
            <h3>Invite the right doubt</h3>
            <p>
              Start with product teams already making consequential calls. The beta recruits reviewers,
              not passive early adopters.
            </p>
          </div>
          <div className="cap ea">
            <div className="cn">LAUNCH // 02</div>
            <h3>Teach the boundary</h3>
            <p>
              The founder narrative demonstrates citations, caveats, and human ownership before it demonstrates speed.
            </p>
          </div>
          <div className="cap ea">
            <div className="cn">LOOP // 03</div>
            <h3>Measure the review</h3>
            <p>
              Target signals: evidence opened, recommendations challenged, decisions revised, and reversal criteria recorded.
            </p>
          </div>
        </div>

        <div className="artifact-wrap ea"><LaunchArtifact world="y2k" /></div>
      </section>
    </>
  );
}
