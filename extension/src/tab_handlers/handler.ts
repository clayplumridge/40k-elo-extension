import type { DataTable } from "../data";

export interface TabHandler {
  apply(dataTable: DataTable): void;
}
