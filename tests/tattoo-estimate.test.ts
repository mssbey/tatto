import { describe, expect, it } from "vitest";
import { estimateTattoo, type TattooOptions } from "../src/lib/tattoo-estimate";

const base: TattooOptions = { width: 1, height: 1, color: "black", region: "clean", detail: "simple", design: "ready" };

describe("tattoo budget estimate", () => {
  it("retains a minimum budget for very small tattoos", () => {
    expect(estimateTattoo(base)).toEqual({ low: 2000, high: 3100, area: 1 });
    expect(estimateTattoo({ ...base, width: 5, height: 5 }).low).toBe(2000);
  });
  it("increases the budget with size and additional work", () => {
    const standard = estimateTattoo({ ...base, width: 15, height: 15 });
    for (const extra of [{ color: "color" }, { region: "coverup" }, { detail: "detailed" }, { design: "custom" }] as Partial<TattooOptions>[]) {
      expect(estimateTattoo({ ...base, width: 15, height: 15, ...extra }).low).toBeGreaterThan(standard.low);
    }
  });
  it("rejects invalid dimensions rather than returning a misleading price", () => {
    for (const width of [0, 31, -1, NaN, Infinity, 1.5]) {
      expect(() => estimateTattoo({ ...base, width })).toThrow(RangeError);
    }
  });
});
