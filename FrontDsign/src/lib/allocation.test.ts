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

  it("skips zero-amount days when totalUnits < periodDays", () => {
    const chunks = allocate(10, 30, START);
    expect(chunks).toHaveLength(10);
    chunks.forEach((c, i) => {
      expect(c.unitFrom).toBe(i + 1);
      expect(c.unitTo).toBe(i + 1);
    });
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
