export const logger = {
  info: (...params: Parameters<Console["log"]>) => {
    console.log("[elo extension]", ...params);
  },
  warn: (...params: Parameters<Console["log"]>) => {
    console.warn("[elo extension]", ...params);
  },
  error: (...params: Parameters<Console["log"]>) => {
    console.error("[elo extension]", ...params);
  },
};
