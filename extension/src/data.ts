export interface DataRow {
  name: string;
  rank: number;
  elo: number;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
}

export type DataTable = Map<string, DataRow[]>;

export function toTable(rows: DataRow[]): DataTable {
  return rows.reduce((table, row) => {
    if(typeof row.name !== "string") {
      return table;
    }

    const base = table.get(row.name.toLowerCase()) ?? [];

    table.set(row.name.toLowerCase(), [
      ...base,
      { ...row, name: row.name.toLowerCase() },
    ]);
    return table;
  }, new Map<string, DataRow[]>());
}
