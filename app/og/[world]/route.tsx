import { ImageResponse } from "next/og";
import { WORLDS, WORLD_ORDER, type WorldId } from "@/worlds";

/**
 * M2 — per-world OG images: shareable proof of range.
 *
 *   /og/swiss … /og/noir  — one card per register, set in its tokens
 *   /og/deal              — the composite "house of every style" card
 *
 * Deep links (?w=swiss) can be shared with a matching card by hand;
 * automatic per-?w metadata would force the page dynamic, so the static
 * page keeps /og/deal as its default (documented tradeoff).
 */
const SIZE = { width: 1200, height: 630 };

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ world: string }> }
): Promise<Response> {
  const { world } = await ctx.params;

  if (world === "deal") {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0A0A0A" }}>
          <div style={{ display: "flex", flex: 1 }}>
            {WORLD_ORDER.map((id) => (
              <div key={id} style={{ flex: 1, background: WORLDS[id].tokens.bg, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 28 }}>
                <div style={{ width: 14, height: 14, borderRadius: 999, background: WORLDS[id].tokens.accent }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", padding: "48px 64px", background: "#0A0A0A" }}>
            <div style={{ color: "#8a8f8a", fontSize: 22, letterSpacing: 6, marginBottom: 14 }}>THE1O1.ONE — THE HOUSE OF EVERY STYLE</div>
            <div style={{ color: "#F2F4F1", fontSize: 64, fontWeight: 700, lineHeight: 1.05 }}>
              We don&apos;t have a style. We have a standard.
            </div>
          </div>
        </div>
      ),
      SIZE
    );
  }

  if (!(WORLD_ORDER as string[]).includes(world)) {
    return new Response("unknown world", { status: 404 });
  }
  const w = WORLDS[world as WorldId];
  const italic = world === "maison" || world === "noir";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: w.tokens.bg, padding: "56px 72px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: w.tokens.accent, fontSize: 26, letterSpacing: 8, fontWeight: 700 }}>{w.label}</div>
          <div style={{ width: 22, height: 22, borderRadius: world === "toy" ? 999 : 0, background: w.tokens.accent }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: w.tokens.ink,
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              fontStyle: italic ? "italic" : "normal",
              textTransform: world === "maison" || world === "noir" ? "none" : "uppercase",
            }}
          >
            {"Make it impossible"}
          </div>
          <div style={{ color: w.tokens.accent, fontSize: 92, fontWeight: 800, lineHeight: 1.02, fontStyle: italic ? "italic" : "normal" }}>
            {"to ignore."}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: w.tokens.ink, opacity: 0.75, fontSize: 24, letterSpacing: 4 }}>
            THE1O1.ONE — ONE BRIEF · SIX WORLDS · ONE STANDARD
          </div>
          <div style={{ color: w.tokens.ink, opacity: 0.75, fontSize: 24, letterSpacing: 4 }}>{`?w=${w.id}`}</div>
        </div>
      </div>
    ),
    SIZE
  );
}
