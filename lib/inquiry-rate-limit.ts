const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 4;
const attempts = new Map<string, number[]>();

export function takeInquirySlot(key: string, now = Date.now()): boolean {
  const recent = (attempts.get(key) ?? []).filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= LIMIT) {
    attempts.set(key, recent);
    return false;
  }
  recent.push(now);
  attempts.set(key, recent);
  if (attempts.size > 1000) {
    for (const [entryKey, timestamps] of attempts) {
      if (!timestamps.some((timestamp) => now - timestamp < WINDOW_MS)) attempts.delete(entryKey);
    }
  }
  return true;
}

export function resetInquiryRateLimit() {
  attempts.clear();
}
