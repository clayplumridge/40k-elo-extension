import type { TabHandler } from "./tab_handlers/handler";
import { RosterTabHandler } from "./tab_handlers/roster";
import {urlWatcher} from "./url_watcher";

urlWatcher((newValue) => {
  const url = new URL(newValue);
  const activeTab = url.searchParams.get("active_tab");

  if(activeTab) {
    const handler = handlers.get(activeTab);

    if(handler) {
      return handler.start();
    }
  }
});

const handlers = new Map<string, TabHandler>(
  [
    ["roster", new RosterTabHandler()]
  ]
);