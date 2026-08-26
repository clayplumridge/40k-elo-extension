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

export interface EloResponse {
  publishedTimestamp: number;
  elo: DataRow[];
}

export interface DataTable {
  publishedTimestamp: number;
  elo: Map<string, DataRow[]>;
}

export function toTable(response: EloResponse): DataTable {
  return {
    publishedTimestamp: response.publishedTimestamp,
    elo: response.elo.reduce((table, row) => {
      if (typeof row.name !== "string") {
        return table;
      }

      const base = table.get(row.name.toLowerCase()) ?? [];

      table.set(row.name.toLowerCase(), [
        ...base,
        { ...row, name: row.name.toLowerCase() },
      ]);
      return table;
    }, new Map<string, DataRow[]>())
  };
}
