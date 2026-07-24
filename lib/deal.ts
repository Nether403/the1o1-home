/**
 * THE DEAL — pre-paint world seeding.
 *
 * Runs as an inline beforeInteractive script so <html data-hero> is set
 * before first paint: no flash, no hydration mismatch (the attribute is
 * outside React's tree; the root <html> uses suppressHydrationWarning).
 *
 * Deep links use the deal-eligible IDs from the canonical world registry.
 */
import { DEAL_WORLD_IDS, WORLDS, type WorldId } from "../worlds";

export const WORLD_IDS = DEAL_WORLD_IDS;

/** World of the Month: the featured world is dealt more often while fresh. */
export const FEATURED_WORLD: WorldId = "y2k";
const FEATURED = WORLDS[FEATURED_WORLD].featured!;
export const FEATURED_WEIGHT = FEATURED.weight;

export function getDealWorldIds(now = new Date()): WorldId[] {
  const timestamp = now.getTime();
  const guestIsActive = timestamp >= Date.parse(FEATURED.from) && timestamp < Date.parse(FEATURED.until);
  return guestIsActive ? [...WORLD_IDS] : WORLD_IDS.filter((id) => id !== FEATURED_WORLD);
}

export const DEAL_SCRIPT = `(function(){
  var d=document.documentElement;
  d.setAttribute('data-js','');
  var A=${JSON.stringify(WORLD_IDS)},F=${JSON.stringify(FEATURED_WORLD)},FW=${FEATURED_WEIGHT};
  var active=Date.now()>=Date.parse(${JSON.stringify(FEATURED.from)})&&Date.now()<Date.parse(${JSON.stringify(FEATURED.until)});
  var W=active?A:A.filter(function(x){return x!==F});
  var w;
  if(active&&Math.random()<FW){w=F;}
  else{var P=W.filter(function(x){return x!==F});w=P[Math.floor(Math.random()*P.length)];}
  try{var q=new URLSearchParams(location.search).get('w');if(q&&A.indexOf(q)>-1)w=q;}catch(e){}
  d.setAttribute('data-hero',w);
  /* device tier: lite = save-data, low memory/cores — heavy modules skip */
  try{
    var n=navigator;
    if((n.connection&&n.connection.saveData)||(n.deviceMemory&&n.deviceMemory<4)||(n.hardwareConcurrency&&n.hardwareConcurrency<4)){
      d.setAttribute('data-tier','lite');
    }
  }catch(e){}
})();`;

export function pickNextWorld(current: string): WorldId {
  const pool = getDealWorldIds().filter((w) => w !== current);
  return pool[Math.floor(Math.random() * pool.length)];
}
