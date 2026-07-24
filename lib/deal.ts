/**
 * THE DEAL — pre-paint world seeding.
 *
 * Runs as an inline beforeInteractive script so <html data-hero> is set
 * before first paint: no flash, no hydration mismatch (the attribute is
 * outside React's tree; the root <html> uses suppressHydrationWarning).
 *
 * Deep links: ?w=swiss|maison|brut|term|toy|noir
 */
export const WORLD_IDS = ["swiss", "maison", "brut", "term", "toy", "noir", "y2k"] as const;

/** World of the Month: the featured world is dealt more often while fresh. */
export const FEATURED_WORLD = "y2k";
export const FEATURED_WEIGHT = 0.3;

export const DEAL_SCRIPT = `(function(){
  var d=document.documentElement;
  var W=${JSON.stringify(WORLD_IDS)};
  var F=${JSON.stringify(FEATURED_WORLD)},FW=${FEATURED_WEIGHT};
  var w;
  if(Math.random()<FW){w=F;}
  else{var P=W.filter(function(x){return x!==F});w=P[Math.floor(Math.random()*P.length)];}
  try{var q=new URLSearchParams(location.search).get('w');if(q&&W.indexOf(q)>-1)w=q;}catch(e){}
  d.setAttribute('data-hero',w);
  /* reveal-pending is set here (JS-land) so a no-JS visit never hides
     content — Interactions removes it on mount (M5 parity fix) */
  d.setAttribute('data-m1-pending','');
  /* device tier: lite = save-data, low memory/cores — heavy modules skip */
  try{
    var n=navigator;
    if((n.connection&&n.connection.saveData)||(n.deviceMemory&&n.deviceMemory<4)||(n.hardwareConcurrency&&n.hardwareConcurrency<4)){
      d.setAttribute('data-tier','lite');
    }
  }catch(e){}
})();`;

export function pickNextWorld(current: string): string {
  const pool = WORLD_IDS.filter((w) => w !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}
