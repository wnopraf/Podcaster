import { describe, expect, it } from "vitest";

import { millsToMinuteFormat } from "./episode-list.util";

describe("Duration podcast format", () => {
  const hourQuarter = (60 + 15) * 60 * 1000; // 01:15:00
  const threeH50M20s = ((3 * 60 + 50) * 60 + 20) * 1000; // 03:50:20
  const seventeenM8S = (17 * 60 + 8) * 1000; //17:08
  const twelveH10S = (12 * 60 + 10) * 1000; // 12:10
  const nineteenH0M4S = (19 * 60 * 60 + 4) * 1000; // 19:00:04

  it("should format podcast duration the right way", () => {
    expect(millsToMinuteFormat(undefined)).toBe("00:00");
    expect(millsToMinuteFormat(hourQuarter)).toBe("01:15:00");
    expect(millsToMinuteFormat(threeH50M20s)).toBe("03:50:20");
    expect(millsToMinuteFormat(seventeenM8S)).toBe("17:08");
    expect(millsToMinuteFormat(twelveH10S)).toBe("12:10");
    expect(millsToMinuteFormat(nineteenH0M4S)).toBe("19:00:04");
  });
});
