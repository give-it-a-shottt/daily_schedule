import { addDays, toISODate } from "./dates";

export type AllocatedChunk = {
  date: string;
  unitFrom: number;
  unitTo: number;
};

/**
 * Splits `totalUnits` (pages/lectures) evenly across `periodDays`, starting
 * at `startDate`. Any remainder is front-loaded onto the earliest days so
 * the tail of the period has more slack for catch-up/review.
 *
 * Days that would receive 0 units (totalUnits < periodDays) are omitted
 * rather than emitted as empty chunks.
 */
export function allocate(
  totalUnits: number,
  periodDays: number,
  startDate: Date,
): AllocatedChunk[] {
  if (totalUnits <= 0 || periodDays <= 0) return [];

  const base = Math.floor(totalUnits / periodDays);
  const remainder = totalUnits % periodDays;

  const chunks: AllocatedChunk[] = [];
  let cursor = 1;

  for (let dayIndex = 0; dayIndex < periodDays; dayIndex++) {
    const amount = base + (dayIndex < remainder ? 1 : 0);
    if (amount === 0) continue;

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
