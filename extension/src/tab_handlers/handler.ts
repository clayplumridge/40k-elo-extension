import type { DataTable } from "../data";

export interface TabHandler {
  start(dataTable: DataTable): () => void;
}
