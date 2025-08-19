import { ComicCardSkeleton } from "../ui";
import ComicCard from "./comic-card";

interface FeatureProps {
  title: string;
  comics: IComic[] | undefined;
  isLoading: boolean;
}

export default function Feature({ title, comics, isLoading }: FeatureProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold uppercase">{title}</h2>
      {isLoading ? (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ComicCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
          {comics?.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}

      {comics?.length === 0 && (
        <div className="flex items-center justify-center h-40 bg-background rounded-lg border border-line shadow-lg">
          <p className="text-muted-foreground">No comics found</p>
        </div>
      )}
    </div>
  );
}
