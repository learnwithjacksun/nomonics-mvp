import { Episodes } from "@/components/main";
import { ButtonWithLoader } from "@/components/ui";
import { useAdmin, useAuth, useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { BookOpen, Heart, Loader, Star, Lock, Bookmark } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Comic() {
  const { deleteComic, isLoading } = useAdmin();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    allComics,
    likeComic,
    unlockComic,
    isLoading: isLikeLoading,
    isUnlockLoading,
    isAllComicsLoading,
    isSaveLoading,
    saveComic,
  } = useComics();
  const comic = allComics?.find((comic) => comic.id === id);
  if (!comic) {
    return <div>Comic not found</div>;
  }

  const isAdminOrCreator = user?.isAdmin || user?.role === "creator";
  const isAdmin = user?.isAdmin;
  const isCreator = user?.role === "creator";
  const isReader = user?.role === "reader";
  const isGuest = !user;

  // Check if comic is locked for the user
  // Free comics (type: "free" and credit: 0) should never be locked
  const isFreeComic = comic?.type === "free" || comic?.credit === 0;
  const isAlreadySubscribed =
    user && comic?.subscribers?.some((sub) => sub.id === user.id);
  const isComicLocked =
    !isFreeComic && !isAlreadySubscribed && (isGuest || isReader);
  const isInsufficientCredits = isReader && user?.credits < comic?.credit;

  const handleDelete = async () => {
    await deleteComic(id || "");
  };

  const handleUnlockComic = async () => {
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

    if (isInsufficientCredits) {
      toast.error("Insufficient credits to unlock this comic");
      return;
    }

    const success = await unlockComic(id || "");
    if (success) {
      toast.success("Comic unlocked successfully!");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-10 mt-10 main">
        <div className="w-full md:w-[900px] mx-auto grid md:grid-cols-2 grid-cols-1 gap-4 bg-background rounded-lg p-4 border border-line">
          <div className="overflow-hidden rounded-sm relative">
            <img
              src={comic?.coverImage.url}
              alt={comic?.title}
              className="w-full h-full object-cover"
            />
            {isComicLocked && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <Lock size={48} className="mx-auto mb-2" />
                  <p className="text-lg font-semibold">Comic Locked</p>
                  <p className="text-sm opacity-90">
                    {isGuest
                      ? "Login to unlock this comic"
                      : `Requires ${comic?.credit} credits to unlock`}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4 flex flex-col">
            {isAdminOrCreator && (
              <div className="flex items-center gap-2">
                {comic?.status === "pending" && (
                  <span className="bg-primary text-primary-2 font-medium px-2 py-1 rounded-full text-xs">
                    Pending
                  </span>
                )}
                {comic?.status === "approved" && (
                  <span className="bg-green-500 text-white font-medium px-2 py-1 rounded-full text-xs">
                    Approved
                  </span>
                )}
                {comic?.status === "rejected" && (
                  <span className="bg-red-500 text-white font-medium px-2 py-1 rounded-full text-xs">
                    Rejected
                  </span>
                )}
              </div>
            )}

            <div>
              <h1 className="text-2xl font-bold">{comic?.title}</h1>
              <p>Author: {comic?.creator.name}</p>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <p className="flex items-center gap-1">
                <BookOpen size={18} /> {comic?.chapters.length} chapters
              </p>
            </div>
            <div className="flex items-center gap-4 justify-between">
              <div className="space-y-2">
                <p className="text-sm font-bold">Comic Credits:</p>
                <div className="flex items-center gap-2 w-fit bg-primary/10 px-4 py-1 rounded-full">
                  <Star size={20} />
                  <span className="text-primary-2 font-semibold">
                    {isFreeComic ? "Free" : comic?.credit}
                  </span>
                </div>
              </div>
              {user && isReader && (
                <div className="space-y-2">
                  <p className="text-sm font-bold">Your Credits:</p>
                  <div className="flex items-center gap-2 w-fit bg-primary/10 text-primary-2 px-4 py-1 rounded-full">
                    <Star size={20} />
                    <span className=" font-semibold">{user?.credits}</span>
                  </div>
                </div>
              )}
            </div>
            <ul className="flex items-center gap-2 text-muted flex-wrap">
              {comic?.genre.map((genre) => (
                <li
                  key={genre}
                  className="bg-foreground px-3 capitalize py-1 rounded-full text-sm"
                >
                  {genre}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <button
                onClick={() => likeComic(id || "")}
                className="bg-primary-2 text-white text-sm h-9 px-4 rounded-lg w-fit"
              >
                {isLikeLoading ? (
                  <Loader size={20} className="animate-spin" />
                ) : (
                  <Heart size={20} />
                )}
                {comic?.likes.length}{" "}
                {comic?.likes.length === 1 ? "Like" : "Likes"}
              </button>
              {isReader && !isComicLocked && (
                <button
                  onClick={() => saveComic(id || "")}
                  className="border border-primary-2 text-primary-2 text-sm h-9 px-4 rounded-lg w-fit"
                >
                  {isSaveLoading ? (
                    <Loader size={20} className="animate-spin" />
                  ) : (
                    <Bookmark size={20} />
                  )}
                  {isSaveLoading ? "Saving..." : "Save"}
                </button>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold">Synopsis:</p>
              <p className="text-sm text-muted line-clamp-6 text-ellipsis">
                {comic?.synopsis}
              </p>
            </div>

            {/* Unlock Button */}
            {isComicLocked && (
              <ButtonWithLoader
                initialText={isGuest ? "Login to Unlock" : "Unlock Comic"}
                loadingText="Unlocking..."
                className="w-full btn-primary h-11 rounded-lg"
                onClick={handleUnlockComic}
                loading={isUnlockLoading}
              />
            )}

            {isCreator && !isAdmin && comic?.id && (
              <ButtonWithLoader
                initialText="Delete"
                loadingText="Deleting..."
                className="bg-red-500 text-white mt-auto w-full h-10 rounded-lg"
                loading={isLoading.deleteComic}
                onClick={handleDelete}
              />
            )}
          </div>
        </div>

       

        <Episodes
          chapters={comic?.chapters}
          isLoading={isAllComicsLoading}
          comicId={id || ""}
          isComicLocked={isComicLocked}
        />
      </div>
    </MainLayout>
  );
}
