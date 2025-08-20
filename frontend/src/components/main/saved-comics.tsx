import { useComics } from "@/hooks";
import ComicCardSkeleton from "../ui/comic-card-skeleton";
import ComicCardTwo from "./comic-card-two";

export default function SavedComics() {
  const { savedComics, isSavedComicsLoading } = useComics();
  return (
    <div className="space-y-4">
      {isSavedComicsLoading ? (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ComicCardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-4">
          {savedComics && savedComics?.map((comic) => (
            <ComicCardTwo key={comic.id} comic={comic} />
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
