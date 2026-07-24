/**
 * World-swap transitions.
 *
 * M1: minimal same-document swap with a CSS fade fallback.
 * M2: full View Transitions API choreography per WipeSpec
 *     (document.startViewTransition), with this function kept as the
 *     universal fallback path.
 */
export function swapWorld(next: string, apply: () => void): void {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduce && typeof doc.startViewTransition === "function") {
    doc.startViewTransition(() => {
      document.documentElement.setAttribute("data-hero", next);
      apply();
    });
    return;
  }
  document.documentElement.setAttribute("data-hero", next);
  apply();
}
