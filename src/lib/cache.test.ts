import casual from "casual";
import { beforeAll, describe, expect, it } from "vitest";

import { Cache } from "@/lib/cache";

const podcastCache = new Cache();
beforeAll(() => {
  podcastCache.setCache("podcasts", "randomresource", 30 * 1000);
});

describe("Basic cache interface", () => {
  it("should retrieve  null", () => {
    expect(podcastCache.setCache("podcasts", "randomUrl")).toBeUndefined();
  });
  it("should get item cache", () => {
    expect(podcastCache.getItem("podcasts")).not.toBeNull();
  });
  it("should have setted cache item", () => {
    podcastCache.setItem("podcasts", generateRandomPodcasts());
    expect(podcastCache.getItem("podcasts")?.data).toBeInstanceOf(Array);
  });
  it("should not be revalidated", () => {
    expect(podcastCache.isRevalidated("podcasts")).toBe(false);
  });

  it("should not be revalidated before timeout", () => {
    expect(podcastCache.isRevalidated("podcasts")).toBe(false);
  });

  it("should be revalidated after timeout", () => {
    podcastCache.setCacheMillis("podcasts", Date.now() - 2 * 1000);
    expect(podcastCache.isRevalidated("podcasts")).toBe(true);
  });
});

casual.define("podcast", () => {
  return {
    name: casual.name,
    title: casual.title,
    duation: casual.unix_time,
  };
});
function generateRandomPodcasts(podcastLenght = 3) {
  // @ts-expect-error no library ts support
  const podcasts = new Array(podcastLenght).fill(casual.podcast);
  return podcasts;
}

/* function timeoutPromise(timeout: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, timeout);
  });
} */
