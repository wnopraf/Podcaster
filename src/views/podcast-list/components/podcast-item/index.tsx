interface PodcastItem {
 title: string;
 author: string;
 imgUrl: string;
}

export function PodcastItem({ title, author, imgUrl }: PodcastItem) {
 return (
  <div className="shadow-light-200">
   <div className="w-1/2 h-1/2 rounded-full -translate-y-1/2">
    <img src={imgUrl} alt="podcast cover" />
   </div>
   <div className="mt-1">
    <h4 className="capitalize">{title}</h4>
    <span className="block mt-1">Author:&nbsp;{author}</span>
   </div>
  </div>
 );
}
