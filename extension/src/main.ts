import { toTable, type DataRow } from "./data";
import type { TabHandler } from "./tab_handlers/handler";
import { PairingsTabHandler } from "./tab_handlers/pairings";
import { RosterTabHandler } from "./tab_handlers/roster";
import {urlWatcher} from "./watchers/url_watcher";

fetch("https://clayplumridge.github.io/40k-elo-extension/elo.json", {cache: "no-store"})
  .then(async response => (await response.json()) as DataRow[])
  .then(data => {
    const table = toTable(data);

    urlWatcher((newValue) => {
      const url = new URL(newValue);
      const activeTab = url.searchParams.get("active_tab");

      if(activeTab) {
        const handler = handlers.get(activeTab);

        if(handler) {
          return handler.start(table);
        }
      }
    });
  });

const handlers = new Map<string, TabHandler>(
  [
    ["roster", new RosterTabHandler()],
    ["pairings", new PairingsTabHandler()]
  ]
);