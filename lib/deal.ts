/**
 * THE DEAL — pre-paint world seeding.
 *
 * Runs as an inline beforeInteractive script so <html data-hero> is set
 * before first paint: no flash, no hydration mismatch (the attribute is
 * outside React's tree; the root <html> uses suppressHydrationWarning).
 *
 * Deep links: ?w=swiss|maison|brut|term|toy|noir
 */
export const WORLD_IDS = ["swiss", "maison", "brut", "term", "toy", "noir"] as const;

export const DEAL_SCRIPT = `(function(){
  var W=${JSON.stringify(WORLD_IDS)};
  var w=W[Math.floor(Math.random()*W.length)];
  try{var q=new URLSearchParams(location.search).get('w');if(q&&W.indexOf(q)>-1)w=q;}catch(e){}
  document.documentElement.setAttribute('data-hero',w);
})();`;

export function pickNextWorld(current: string): string {
  const pool = WORLD_IDS.filter((w) => w !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}
