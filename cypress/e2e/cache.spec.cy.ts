import { CacheLS } from "@/lib/local-storage-cache";

describe("cache lifecycle", () => {
  let lsCache: CacheLS<Podcaster.PodCastApi>;
  let cacheItem: unknown;
  before(() => {
    lsCache = new CacheLS<Podcaster.PodCastApi>();
    lsCache.setCache("podcast-list", "fake resource", 3 * 60 * 1000);
    cacheItem = lsCache.getItem("podcast-list");
  });
  it("should complete a full cache lifecycle", () => {
    cy.log("cacheItem", cacheItem);
    expect(cacheItem).not.to.be.null;
    expect(lsCache.isRevalidated("podcast-list")).to.be.true;
    // renew store cache
    lsCache.setItem("podcast-list", {
      feed: { entry: [] },
    } as unknown as Podcaster.PodCastApi);
    // check again cache revalidation
    expect(lsCache.isRevalidated("podcast-list")).to.be.false;
    // fake cache timestamp
    lsCache.setLastSaved("podcast-list", Date.now() - 2 * 60 * 1000);

    expect(lsCache.isRevalidated("podcast-list")).to.be.true;
  });
});
