export type PodCast = PodCastApi["entry"][0];
export interface PodCastApi {
 feed: {
  author: {
   name: {
    label: string;
   };
   uri: {
    label: string;
   };
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
}
