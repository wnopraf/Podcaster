import { BrowserRouter } from "react-router-dom";
import { PodcastSearchData } from "@/views/podcast-list/";
import { filterCriteria } from "@/views/podcast-list/hooks/search-util";

import podcastsJson from "../fixtures/podcast.json";

const podcasts = JSON.parse(podcastsJson.contents) as Podcaster.PodCastApi;
const criteriaChars = ["ab", "om", "dav", "luri", "juan", "ari", "car", "joe"];
describe("PodcastSearch", () => {
  criteriaChars.forEach((elm) => {
    const searchByCriteria = filterCriteria(elm, podcasts.feed.entry);
    it(`it should flter by ${elm}`, () => {
      // @ts-expect-error ts no recognize cypress types
      cy.mount(
        <BrowserRouter>
          <PodcastSearchData data={podcasts.feed.entry} />
        </BrowserRouter>
      );
      cy.get("input").type(elm);
      cy.get("span").contains(searchByCriteria.length);

      cy.get("a").should("have.length", searchByCriteria.length);
      if (searchByCriteria.length === 0) {
        cy.get("p").contains("no podcasts found");
      }
    });
  });
});
