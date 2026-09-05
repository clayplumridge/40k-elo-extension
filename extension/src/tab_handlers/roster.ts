import type { DataTable } from "../data";
import { cleanUpName, isDefined } from "../util";
import type { TabHandler } from "./handler";

export class RosterTabHandler implements TabHandler {
  apply(eloTable: DataTable) {
    const tableContainer = document.body.querySelector('[role="tabpanel"]')?.querySelector(".MuiGrid-item")?.children.item(1);
    if (!tableContainer) {
      return;
    }

    const testTeamHeading = tableContainer.children.item(0)?.querySelector(".MuiBox-root");
    if (testTeamHeading) {
      renderTeams(eloTable, tableContainer);
    } else {
      renderSingles(eloTable, tableContainer);
    }
  }
}

function renderTeams(eloTable: DataTable, tableContainer: Element) {
  const teamContainers = tableContainer.querySelectorAll(":scope > .MuiGrid-item");

  for (let teamContainer of teamContainers) {
    const teamHeaderCell = teamContainer.children.item(0)?.children.item(0) as HTMLDivElement | undefined;
    if (!teamHeaderCell) {
      continue;
    }

    const playerCells = teamContainer.querySelectorAll(":scope > .MuiGrid-item");
    const details = Array.from(playerCells).map(cell => getDetailsForPlayerCell(eloTable, cell)).filter(isDefined);
    const averageElo = (details.reduce((prev, curr) => prev + curr?.eloNumber, 0) / details.length).toFixed(0);
    const maxElo = details.reduce((prev, curr) => prev > curr.eloNumber ? prev : curr.eloNumber, 0);

    details.forEach(renderPlayerCell);

    const eloContainer = teamHeaderCell.querySelector("#elo-container") as HTMLDivElement | undefined ?? document.createElement("div");
    eloContainer.id = "elo-container"
    eloContainer.style.display = "flex";
    eloContainer.style.flexDirection = "column";
    eloContainer.style.alignItems = "flex-end";

    const existingAvgDiv = eloContainer.querySelector('#avg-elo');
    const avgDiv = existingAvgDiv ?? document.createElement("div");
    avgDiv.id = 'avg-elo';
    avgDiv.textContent = `Avg ELO: ${averageElo}`;
    if (!existingAvgDiv) {
      eloContainer.appendChild(avgDiv);
    }

    const existingMaxDiv = eloContainer.querySelector('#max-elo');
    const maxDiv = existingMaxDiv ?? document.createElement("div");
    maxDiv.id = 'max-elo';
    maxDiv.textContent = `Max ELO: ${maxElo}`;
    if (!existingMaxDiv) {
      eloContainer.appendChild(maxDiv);
    }

    const teamNameCell = teamHeaderCell.children.item(0) as HTMLDivElement | undefined;
    const checkinStatusCell = teamHeaderCell.children.item(teamHeaderCell.children.length - 1) as HTMLDivElement | undefined;

    if (teamNameCell && checkinStatusCell) {
      teamHeaderCell.style.alignItems = "center";
      teamNameCell.style.flexBasis = "50%";
      eloContainer.style.flexBasis = "20%";
      checkinStatusCell.style.flexBasis = "30%";
      checkinStatusCell.style.maxWidth = "30%";
    }

    checkinStatusCell?.before(eloContainer);
  }
}

function getDetailsForPlayerCell(eloTable: DataTable, cell: Element) {
  const nameNode = cell.querySelector("p");
  const name = cleanUpName(nameNode?.childNodes[0].textContent);
  if (!nameNode || !name) {
    return undefined;
  }

  const eloList = eloTable.elo
    .get(name.toLowerCase())
    ?.map((x) => Math.round(x.elo));

  return {
    cell,
    name,
    eloNumber: eloList?.[0] ?? 1500,
    eloString: eloList?.[0] ?? "Unknown",
    nameNode,
  };
}

function renderPlayerCell(details: Exclude<ReturnType<typeof getDetailsForPlayerCell>, undefined>) {
  const { cell, nameNode, eloString } = details;

  const div = cell.querySelector("#elo-marker") ?? document.createElement("div");
  div.id = "elo-marker";
  div.textContent = `ELO: ${eloString}`;
  nameNode.after(div);
}

function renderSingles(eloTable: DataTable, tableContainer: Element) {
  const rowContainers = tableContainer?.querySelectorAll(".MuiGrid-item > .MuiGrid-container");
  if (!rowContainers || rowContainers.length <= 0) {
    return;
  }

  Array.from(rowContainers.values())
    .map(cell => getDetailsForPlayerCell(eloTable, cell))
    .filter(isDefined)
    .forEach(renderPlayerCell);
}
