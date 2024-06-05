declare namespace Podcaster {
  interface PodCastApi {
    feed: {
      author: {
        name: {
          label: string;
        };
        uri: {
          label: string;
        };
      };
      entry: {
        "im:name": {
          label: string;
        };
        "im:image": {
          label: string;
          attributes: {
            height: number;
          };
        }[];
        summary: {
          label: string;
        };
        "im:price": {
          label: string;
          attributes: {
            amount: string;
            currency: "USD";
          };
        };
        "im:contentType": {
          attributes: {
            term: "Podcast";
            label: "Podcast";
          };
        };
        rights: {
          label: string;
        };
        title: {
          label: string;
        };
        link: {
          attributes: {
            rel: "alternative";
            type: "text/html";
            href: string;
          };
        };
        id: {
          label: string;
          attributes: {
            "im:id": string;
          };
        };
        "im:artist": {
          label: string;
          attributes: {
            href: string;
          };
        };
        category: {
          attributes: {
            "im:id": string;
            term: "Music";
            scheme: string;
            label: "Music";
          };
        };
        "im:releaseDate": {
          label: string;
          attributes: {
            label: string;
          };
        };
      }[];
    };
  }
  type PodCast = PodCastApi["feed"]["entry"][0];
  interface PodcastDetail {
    resultCount: number;
    results: {
      trackId: number;
      artisName: string;
      trackName: string;
      releaseDate: string;
      trackTimeMillis: number;
      description: string;
      episodeUrl: string;
      artworkUrl160: string;
      episodeContentTipe: "audio";
      shortDescription: string;
      collectionName: string;
      kind: "podcast" | "podcast-episode";
    }[];
  }
}
