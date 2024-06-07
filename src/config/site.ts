const ALLOW_ORIGINS_SERVICE = `https://api.allorigins.win/get?url=`;
export const PODCAST_LIST_URL =
  ALLOW_ORIGINS_SERVICE +
  encodeURIComponent(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
export const PODCAST_DETAIL_ROOT_URL =
  ALLOW_ORIGINS_SERVICE +
  encodeURIComponent("https://itunes.apple.com/lookup?id=");
export const PODCAST_DETAIL_QUERY_PARAMS_URL = encodeURIComponent(
  "&media=podcast&entity=podcastEpisode&limit=20"
);
