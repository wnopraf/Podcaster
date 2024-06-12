import { PodcastSearch } from "@/views/podcast-list/components/podcast-search";
import { useSearch } from "@/views/podcast-list/hooks/search-util";

import podcastsJson from "../fixtures/podcast.json";

const podcasts = JSON.parse(podcastsJson.contents) as Podcaster.PodCastApi;
const criteriaChars = ["ab", "om", "dav", "luri", "juan", "ari", "car", "joe"];
describe("PodcastSearch", () => {
  criteriaChars.forEach((elm) => {
    const searchByCriteria = filterCriteria(elm, podcasts.feed.entry);
    it(`it should flter by ${elm}`, () => {
      // @ts-expect-error mount type hurts
      cy.mount(<PodcastSearchMock data={podcasts.feed.entry} />);
      cy.get("input").type(elm);
      cy.get("span").contains(searchByCriteria.length);

      cy.get("li").should("have.length", searchByCriteria.length);
      if (searchByCriteria.length === 0) {
        cy.get("p").contains("No podcasts found");
      }
    });
  });
});

function PodcastSearchMock({ data }: { data: Podcaster.PodCast[] }) {
  const { filteredPodcasts, setSearch } = useSearch(data);

  return (
    <div>
      <PodcastSearch
        setSearch={setSearch}
        filterResults={filteredPodcasts.current.length}
      />
      {filteredPodcasts.current.length === 0 && <p>No podcasts found</p>}
      <ul>
        {filteredPodcasts.current.map((elm) => {
          return (
            <li>
              <p>{elm["im:artist"].label}</p>
              <p>{elm["im:name"].label}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function filterCriteria(criteria: string, podcasts: Podcaster.PodCast[]) {
  const podcastsToUpperCase = podcasts.map((elm) => ({
    ["im:artist"]: elm["im:artist"].label.toLowerCase(),
    ["im:name"]: elm["im:name"].label.toLowerCase(),
  }));
  const author = podcastsToUpperCase.filter((elm) => {
    return elm["im:artist"].includes(criteria);
  });
  const podcastName = podcastsToUpperCase.filter((elm) => {
    if (author.includes(elm)) {
      return false;
    }
    return elm["im:name"].includes(criteria);
  });
  return [...podcastName, ...author];
}
