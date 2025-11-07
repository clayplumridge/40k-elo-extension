import type { DataTable } from "../data";
import { watchForElement } from "../element_watcher";
import type { TabHandler } from "./handler";

export class RosterTabHandler implements TabHandler {
  start(table: DataTable) {
    return watchForElement(document.body, '[role="tabpanel"]', (e) =>
      this.handleElementFound(e, table)
    );
  }

  private handleElementFound(el: Element, table: DataTable) {
    const tableBodyRoot = el.querySelector(".MuiGrid-item");
    if (!tableBodyRoot) {
      return;
    }

    const rowContainer = tableBodyRoot.children.item(1);
    if (!rowContainer) {
      return;
    }

    const updateRows = () => {
      const rowContainers = rowContainer.querySelectorAll(
        ".MuiGrid-item > .MuiGrid-container"
      );
      if (rowContainers.length <= 0) {
        return;
      }

      const rows = Array.from(rowContainers.values())
        .map((container) => {
          const nameNode = container.querySelector("p");
          const name = nameNode?.childNodes[0].textContent;
          if (!nameNode || !name) {
            return undefined;
          }

          const eloList = table.get(name)?.map((x) => Math.round(x.elo));
          const elo = eloList?.[0] ?? "Unknown";

          return {
            container,
            name,
            elo,
            nameNode,
          };
        })
        .filter(isDefined);

      rows.forEach(({ container, nameNode, elo }) => {
        const div =
          container.querySelector("#elo-marker") ??
          document.createElement("div");
        div.id = "elo-marker";
        div.textContent = `ELO: ${elo}`;
        nameNode.after(div);
      });
    };

    const interval = setInterval(updateRows, 200);
    return () => clearInterval(interval);
  }
}

function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
