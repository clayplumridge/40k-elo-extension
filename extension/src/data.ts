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
    // For some reason one row has object as the type
    if(typeof row.name !== "string") {
      console.log(row);
      return table;
    }

    const base = table.get(row.name) ?? [];

    table.set(row.name, [
      ...base,
      { ...row, name: row.name },
    ]);
    return table;
  }, new Map<string, DataRow[]>());
}
