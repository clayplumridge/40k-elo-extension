import { type EloResponse, toTable } from "./data";
import type { TabHandler } from "./tab_handlers/handler";
import { PairingsTabHandler } from "./tab_handlers/pairings";
import { PlacingsTabHandler } from "./tab_handlers/placings";
import { RosterTabHandler } from "./tab_handlers/roster";
import { throttle } from "./util";
import { urlWatcher } from "./watchers/url_watcher";

fetch("https://clayplumridge.github.io/40k-elo-extension/elo.json", {
  cache: "no-store",
})
  .then(async response => (await response.json()) as EloResponse)
  .then(data => {
    const table = toTable(data);

    urlWatcher(newValue => {
      const handler = resolveHandler(newValue);

      if (handler) {
        const observer = new MutationObserver(throttle(() => handler.apply(table), 50));
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
      }
    });
  });

function resolveHandler(urlString: string): TabHandler | undefined {
  const url = new URL(urlString);
  const activeTabValue = url.searchParams.get("active_tab") as TabName;
  if (activeTabValue) {
    return handlers[activeTabValue];
  }

  // Opening the event directly opens the Pairings tab, but doesn't set the active_tab param
  const round = url.searchParams.get("round");
  if (round !== undefined) {
    return handlers.pairings;
  }
}

type TabName = "roster" | "pairings" | "placings";

const handlers: Record<TabName, TabHandler> = {
  pairings: new PairingsTabHandler(),
  placings: new PlacingsTabHandler(),
  roster: new RosterTabHandler(),
} as const;
