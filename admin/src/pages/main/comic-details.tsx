import { ComicSettings } from "@/components/main";
import Episodes from "@/components/main/episodes";
import { useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { BookOpen, Heart, Loader, Star, TriangleAlert } from "lucide-react";
import { useParams } from "react-router-dom";

export default function ComicDetails() {
    const {id} = useParams()
    const {allComics, isAllComicsLoading, likeComic, isLoading: isLikeLoading} = useComics()
    const comic = allComics?.find((comic) => comic.id === id)

    if(isAllComicsLoading || !comic) {
        return (
            <MainLayout title="Comic Details" description="Comic Details">
               <div className="flex items-center gap-2">
                <TriangleAlert size={20} className="text-primary" /> 
                Comic not found. Retrying... 
                <Loader size={20} className="animate-spin" />
            </div>
            </MainLayout>
        )
    }

    const isFreeComic = comic?.type === "free" || comic?.credit === 0;



  return (
    <MainLayout title={comic?.title} description={comic?.synopsis}>
        <div className="w-full md:w-[900px] mx-auto grid md:grid-cols-2 grid-cols-1 gap-4 bg-background rounded-lg p-4 border border-line">
          <div className="overflow-hidden rounded-sm relative">
            <img
              src={comic?.coverImage.url}
              alt={comic?.title}
              className="w-full h-full object-cover"
            />
            
          </div>
          <div className="space-y-4 flex flex-col">
           
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
             
            </div>
            <div className="space-y-2">
              <p className="text-sm font-bold">Synopsis:</p>
              <p className="text-sm text-muted line-clamp-6 text-ellipsis whitespace-pre-wrap">
                {comic?.synopsis}
              </p>
            </div>


          
            
        
          </div>
        </div>

        <ComicSettings comicId={comic?.id} />

        <Episodes
          chapters={comic?.chapters}
          isLoading={isAllComicsLoading}
          comicId={id || ""}
          isComicLocked={false}
        />
    </MainLayout>
  )
}
