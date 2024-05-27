interface PodcastItem {
 title: string;
 author: string;
 imgUrl: string;
}

export function PodcastItem({ title, author, imgUrl }: PodcastItem) {
 return (
  <div className=" shadow-md">
   <div className="w-1/2  mx-auto mt-[calc(-25%)]">
    <img
     className="rounded-full w-full h-auto"
     src={imgUrl}
     alt="podcast cover"
    />
   </div>
   <div className="mt-3 text-center">
    <h4 className="capitalize text-clamp-2">{title}</h4>
    <span className="block mt-1 text-clamp-1">Author:&nbsp;{author}</span>
   </div>
  </div>
 );
}
