import type { DataTable } from "../data";
import { cleanUpName } from "../util";
import type { TabHandler } from "./handler";

export class PlacingsTabHandler implements TabHandler {
  apply(table: DataTable) {
    const rowContainers = document.body.querySelector('[role="tabpanel"]')?.querySelector(".MuiGrid-item")?.children.item(1)?.querySelectorAll(".MuiGrid-item > .MuiGrid-container");

    if (!rowContainers || rowContainers.length <= 0) {
      return;
    }

    Array.from(rowContainers.values()).forEach((container) => {
      // First item is their placing number
      const contentNode = container.children.item(1);
      if (!contentNode) {
        return;
      }

      const nameNode = contentNode.querySelector("p");
      // Slice to trim off teams and nations
      const nameSegments = nameNode?.childNodes[0].textContent?.split(" - ");
      if (!nameNode || !nameSegments) {
        return;
      }

      const name = cleanUpName((
        nameSegments?.length > 1 ? nameSegments.slice(0, -1) : nameSegments
      )
        .join("")
        .trim());
      const eloList = table.elo
        .get(name.toLowerCase())
        ?.map((x) => Math.round(x.elo));
      const elo = eloList?.[0] ?? "Unknown";

      const factionNode = contentNode.children.item(
        contentNode.children.length - 2
      );

      const div =
        container.querySelector("#elo-marker") ??
        document.createElement("div");
      div.id = "elo-marker";
      div.textContent = `ELO: ${elo}`;
      div.className = factionNode?.className ?? "";
      nameNode.after(div);
    });
  }
}
