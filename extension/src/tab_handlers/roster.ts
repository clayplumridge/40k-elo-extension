import { watchForElement } from "../element_watcher";
import type { TabHandler } from "./handler";

export class RosterTabHandler implements TabHandler {
    start() {
        return watchForElement(document.body, '[role="tabpanel"]', e => this.handleElementFound(e));
    }

    private handleElementFound(el: Element) {
        const tableBodyRoot = el.querySelector(".MuiGrid-item");
        if(!tableBodyRoot) {
            console.log("Failed to find table root");
            return false;
        }

        const rowContainer = tableBodyRoot.children.item(1);
        if(!rowContainer) {
            console.log("Failed to find row container");
            return false;
        }

        const rowContainers = rowContainer.querySelectorAll(".MuiGrid-item > .MuiGrid-container");
        if(rowContainers.length <= 0) {
            console.log("Failed to find rowContainers");
            return false;
        }

        const rows = Array.from(rowContainers.values()).map(container => {
            const nameNode = container.querySelector('p');
            const name = nameNode?.childNodes[0].textContent;
            if(!nameNode || !name) {
                return undefined;
            }

            const elo = nameToElo(name);
            return {
                name, elo, nameNode
            }
        }).filter(isDefined);

        rows.forEach(({ nameNode, elo }) => {
            const div = document.createElement('div');
            div.textContent = `ELO: ${elo}`;
            nameNode.after(div);
        });

        console.log(rows);
        return true;
    }
}

const eloMap = new Map<string, number>([
    ["Frank Viruet", 9000]
]);

function nameToElo(name: string) {
    if(eloMap.has(name)) {
        return `${eloMap.get(name)}`;
    }

    return "Unknown";
}

function isDefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}