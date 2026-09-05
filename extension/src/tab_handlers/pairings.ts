import type { DataTable } from "../data";
import { cleanUpName, isDefined } from "../util";
import type { TabHandler } from "./handler";

export class PairingsTabHandler implements TabHandler {
  apply(table: DataTable) {
    const tableBodyRoot = document.body.querySelector("[role=\"tabpanel\"]")
      ?.querySelector(".MuiGrid-item");
    if (!tableBodyRoot) {
      return;
    }

    // Indexed from the end because sometimes there's other elements (timer controls)
    const rowContainer = tableBodyRoot.children.item(
      tableBodyRoot.children.length - 2,
    );
    if (!rowContainer) {
      return;
    }

    const rowContainers = rowContainer.querySelectorAll(
      ".MuiGrid-item > a > .MuiGrid-container",
    );

    if (rowContainers.length <= 0) {
      return;
    }

    Array.from(rowContainers.values())
      .forEach(container => {
        const players = [
          container.children.item(1),
          container.children.item(2),
        ] as const;

        players.filter(isDefined)
          .forEach(playerCell => {
            // Indexed from the end because these rows can contain ancillary info like
            // Pod number, region, team name, etc.
            const afterEl = playerCell.children.item(
              playerCell.children.length - 3,
            );
            const name = cleanUpName(playerCell.children.item(0)?.textContent);
            if (!name || !afterEl) {
              return;
            }

            const eloList = table.elo
              .get(name.toLowerCase())
              ?.map(x => Math.round(x.elo));
            const elo = eloList?.[0] ?? "Unknown";

            const div =
              playerCell.querySelector("#elo-marker") ??
          document.createElement("div");
            div.id = "elo-marker";
            div.textContent = `ELO: ${elo}`;
            div.className = afterEl.className;
            afterEl.after(div);
          });
      });
  }
}
