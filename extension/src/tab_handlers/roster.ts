import type { DataTable } from "../data";
import { cleanUpName, isDefined } from "../util";
import type { TabHandler } from "./handler";

export class RosterTabHandler implements TabHandler {
  apply(table: DataTable) {
    const rowContainers = document.body.querySelector('[role="tabpanel"]')?.querySelector(".MuiGrid-item")?.children.item(1)?.querySelectorAll(".MuiGrid-item > .MuiGrid-container");
    if (!rowContainers || rowContainers.length <= 0) {
      return;
    }

    const rows = Array.from(rowContainers.values())
      .map((container) => {
        const nameNode = container.querySelector("p");
        const name = cleanUpName(nameNode?.childNodes[0].textContent);
        if (!nameNode || !name) {
          return undefined;
        }

        const eloList = table
          .get(name.toLowerCase())
          ?.map((x) => Math.round(x.elo));
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
  }
}
