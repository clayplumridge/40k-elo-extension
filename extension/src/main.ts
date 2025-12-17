import { toTable, type DataRow } from "./data";
import type { TabHandler } from "./tab_handlers/handler";
import { PairingsTabHandler } from "./tab_handlers/pairings";
import { PlacingsTabHandler } from "./tab_handlers/placings";
import { RosterTabHandler } from "./tab_handlers/roster";
import { urlWatcher } from "./watchers/url_watcher";

fetch("https://clayplumridge.github.io/40k-elo-extension/elo.json", {
  cache: "no-store",
})
  .then(async (response) => (await response.json()) as DataRow[])
  .then((data) => {
    const table = toTable(data);

    urlWatcher((newValue) => {
      const url = new URL(newValue);
      const activeTab = url.searchParams.get("active_tab") as TabName;

      if (activeTab) {
        const handler = handlers.get(activeTab);

        if (handler) {
          return handler.start(table);
        }
      } else {
        // Opening the event directly opens the Pairings tab, but doesn't set the active_tab param
        const round = url.searchParams.get("round");
        if (round !== undefined) {
          return handlers.get("pairings")!.start(table);
        }
      }
    });
  });

type TabName = "roster" | "pairings" | "placings";

const handlers = new Map<TabName, TabHandler>([
  ["roster", new RosterTabHandler()],
  ["pairings", new PairingsTabHandler()],
  ["placings", new PlacingsTabHandler()],
]);
