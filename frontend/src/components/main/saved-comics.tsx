import { useComics } from "@/hooks";
import ComicCard from "./comic-card";
import ComicCardSkeleton from "../ui/comic-card-skeleton";

export default function SavedComics() {
  const { savedComics, isSavedComicsLoading } = useComics();
  return (
    <div className="space-y-4">
      {isSavedComicsLoading ? (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ComicCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
          {savedComics && savedComics?.map((comic) => (
            <ComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}

      {savedComics?.length === 0 && (
        <div className="flex items-center justify-center h-40 bg-background rounded-lg border border-line shadow-lg">
          <p className="text-muted-foreground">No comics found</p>
        </div>
      )}
    </div>
  );
}
