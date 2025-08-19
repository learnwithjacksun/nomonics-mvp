import { Link } from "react-router-dom";
import { EpisodeCard, EpisodeCardSkeleton } from "../ui";
import { Plus } from "lucide-react";
import { useAuth } from "@/hooks";

export default function Episodes({
  chapters,
  isLoading,
  comicId,
  isComicLocked,
}: {
  chapters: IChapter[] | undefined;
  isLoading: boolean;
  comicId: string;
  isComicLocked: boolean;
}) {
  const { user } = useAuth();
  const isCreator = user?.role === "creator";
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold uppercase">Chapters</h2>

        {isCreator && (
          <Link
            to={`/creator/new-chapter?comicId=${comicId}`}
            className="btn text-primary-2 rounded-lg h-9"
        >
            <Plus /> Add Chapter
          </Link>
        )}
      </div>
      {isComicLocked && (
        <div className="bg-red-500/10 text-red-500 font-medium p-4 rounded-lg">
          <p>You need to unlock this comic first to read its chapters</p>
        </div>
      )}
      {!isComicLocked && <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {isLoading ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <EpisodeCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          chapters?.map((chapter) => (
            <EpisodeCard key={chapter.id} chapter={chapter} />
          ))
        )}
      </div>}
    </div>
  );
}
