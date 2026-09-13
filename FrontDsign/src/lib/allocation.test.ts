import { describe, expect, it } from "vitest";
import { allocate } from "./allocation";

const START = new Date("2026-01-01T00:00:00");

describe("allocate", () => {
  it("splits evenly when totalUnits divides periodDays", () => {
    const chunks = allocate(90, 30, START);
    expect(chunks).toHaveLength(30);
    expect(chunks.every((c) => c.unitTo - c.unitFrom + 1 === 3)).toBe(true);
    expect(chunks[0]).toEqual({ date: "2026-01-01", unitFrom: 1, unitTo: 3 });
    expect(chunks[29]).toEqual({ date: "2026-01-30", unitFrom: 88, unitTo: 90 });
  });

  it("front-loads the remainder onto the earliest days", () => {
    const chunks = allocate(100, 30, START);
    expect(chunks).toHaveLength(30);
    // base = 3, remainder = 10 -> first 10 days get 4, remaining 20 get 3
    for (let i = 0; i < 10; i++) {
      expect(chunks[i].unitTo - chunks[i].unitFrom + 1).toBe(4);
    }
    for (let i = 10; i < 30; i++) {
      expect(chunks[i].unitTo - chunks[i].unitFrom + 1).toBe(3);
    }
    expect(chunks[0]).toEqual({ date: "2026-01-01", unitFrom: 1, unitTo: 4 });
    expect(chunks[29]).toEqual({ date: "2026-01-30", unitFrom: 98, unitTo: 100 });
  });

  it("spreads totalUnits evenly across periodDays when totalUnits < periodDays", () => {
    const chunks = allocate(10, 30, START);
    expect(chunks).toHaveLength(10);
    // evenly divides: every 3rd day
    expect(chunks.map((c) => c.date)).toEqual([
      "2026-01-01",
      "2026-01-04",
      "2026-01-07",
      "2026-01-10",
      "2026-01-13",
      "2026-01-16",
      "2026-01-19",
      "2026-01-22",
      "2026-01-25",
      "2026-01-28",
    ]);
    chunks.forEach((c, i) => {
      expect(c.unitFrom).toBe(i + 1);
      expect(c.unitTo).toBe(i + 1);
    });
  });

  it("spreads a small lecture count evenly instead of front-loading (12 lectures / 30 days)", () => {
    const chunks = allocate(12, 30, START);
    expect(chunks).toHaveLength(12);
    // spread across the full 30-day period, not crammed into the first 12 days
    const dayOffsets = chunks.map((c) => {
      const [y, m, d] = c.date.split("-").map(Number);
      const day = new Date(y, m - 1, d);
      return Math.round((day.getTime() - START.getTime()) / 86_400_000);
    });
    expect(dayOffsets).toEqual([0, 2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27]);
    expect(Math.max(...dayOffsets)).toBeLessThan(30);
  });

  it("gives every day exactly 1 unit when totalUnits === periodDays", () => {
    const chunks = allocate(30, 30, START);
    expect(chunks).toHaveLength(30);
    expect(chunks.every((c) => c.unitFrom === c.unitTo)).toBe(true);
  });

  it("puts the whole total on a single day when periodDays === 1", () => {
    const chunks = allocate(250, 1, START);
    expect(chunks).toEqual([{ date: "2026-01-01", unitFrom: 1, unitTo: 250 }]);
  });

  it("returns nothing for non-positive inputs", () => {
    expect(allocate(0, 30, START)).toEqual([]);
    expect(allocate(100, 0, START)).toEqual([]);
  });
});
