import { addDays, toISODate } from "./dates";

export type AllocatedChunk = {
  date: string;
  unitFrom: number;
  unitTo: number;
};

/**
 * Splits `totalUnits` (pages/lectures) across `periodDays`, starting at
 * `startDate`.
 *
 * - totalUnits >= periodDays: every day gets at least 1 unit; any remainder
 *   is front-loaded onto the earliest days, leaving more slack near the end
 *   of the period for catch-up/review.
 * - totalUnits < periodDays: there's less to study than there are days, so
 *   instead of cramming everything into the first `totalUnits` consecutive
 *   days (leaving a long unused tail), the units are spread evenly across
 *   the whole period.
 */
export function allocate(
  totalUnits: number,
  periodDays: number,
  startDate: Date,
): AllocatedChunk[] {
  if (totalUnits <= 0 || periodDays <= 0) return [];

  if (totalUnits < periodDays) {
    const chunks: AllocatedChunk[] = [];
    for (let i = 0; i < totalUnits; i++) {
      const dayIndex = Math.floor((i * periodDays) / totalUnits);
      chunks.push({
        date: toISODate(addDays(startDate, dayIndex)),
        unitFrom: i + 1,
        unitTo: i + 1,
      });
    }
    return chunks;
  }

  const base = Math.floor(totalUnits / periodDays);
  const remainder = totalUnits % periodDays;

  const chunks: AllocatedChunk[] = [];
  let cursor = 1;

  for (let dayIndex = 0; dayIndex < periodDays; dayIndex++) {
    const amount = base + (dayIndex < remainder ? 1 : 0);
    const unitFrom = cursor;
    const unitTo = cursor + amount - 1;
    chunks.push({
      date: toISODate(addDays(startDate, dayIndex)),
      unitFrom,
      unitTo,
    });
    cursor += amount;
  }

  return chunks;
}

export function formatChunkAmount(
  chunk: Pick<AllocatedChunk, "unitFrom" | "unitTo">,
  unitLabel: string,
): string {
  return chunk.unitFrom === chunk.unitTo
    ? `${chunk.unitFrom}${unitLabel}`
    : `${chunk.unitFrom}-${chunk.unitTo}${unitLabel}`;
}
