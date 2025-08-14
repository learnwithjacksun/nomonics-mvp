import { useAuth, useComics } from "@/hooks";
import { BookOpen, Clock, Lock, MessageSquareText, Trash2, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function EpisodeCard({ chapter }: { chapter: IChapter }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { comics, unlockComic, isUnlockLoading } = useComics();
  if (!comics && !user) {
    return null;
  }

  const comic = comics && comics.find((comic) => comic.id === chapter.comic);

  const handleNavigate = () => {
    navigate(
      `/preview?comicId=${chapter.comic}&chapterNumber=${chapter.chapterNumber}`
    );
  };

  const isGuest = !user;
  const isReader = user?.role === "reader";
  const isFreeComic = comic?.type === "free" || comic?.credit === 0;
  const isAlreadySubscribed = user && comic?.subscribers?.some(sub => sub.id === user.id);
  const isComicLocked = !isFreeComic && !isAlreadySubscribed && (isGuest || (isReader && user?.credits && comic?.credit && user?.credits < comic?.credit));

  const handleUnlockComic = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isGuest) {
      toast.error("Please login first to unlock this comic");
      navigate("/login");
      return;
    }
    
    if (isFreeComic) {
      toast.success("This comic is free and already unlocked!");
      return;
    }

    if (isAlreadySubscribed) {
      toast.success("You have already unlocked this comic!");
      return;
    }
    
    if (isReader && user?.credits && comic?.credit && user?.credits < comic?.credit) {
      toast.error("Insufficient credits to unlock this comic");
      return;
    }

    const success = await unlockComic(chapter.comic);
    if (success) {
      toast.success("Comic unlocked successfully!");
    }
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
      onClick={handleNavigate}
    >
      {user?.role === "creator" && (
        <div className="absolute top-2 right-2">
          <Trash2 size={20} className="text-red-500" />
        </div>
      )}

      <div className="p-4">
        {/* Right Side - Content Details */}
        <div className="flex flex-col justify-between space-y-3">
          {/* Title and Author */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              Chapter {chapter.chapterNumber}
            </h3>
            <p className="text-sm text-muted dark:text-gray-400 font-medium">
              {chapter.title}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock size={18} />
              <span>{chapter.readTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareText size={18} />
              <span>
                {chapter.comments.length}{" "}
                {chapter.comments.length === 1 ? "Comment" : "Comments"}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {isComicLocked && (
            <button
              className="w-full btn bg-secondary h-9 rounded-lg flex items-center justify-center gap-2"
              onClick={handleUnlockComic}
              disabled={isUnlockLoading}
            >
              {isUnlockLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <Lock size={20} className="text-yellow-500" />
              )}
              {isUnlockLoading ? "Unlocking..." : (isGuest ? "Login to Unlock" : "Unlock Comic")}
            </button>
          )}

          {!isComicLocked && (
            <button
              className="w-full btn-primary h-9 rounded-lg"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate();
              }}
            >
              <BookOpen className="w-4 h-4" />
              Read Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
