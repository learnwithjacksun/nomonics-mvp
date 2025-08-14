import { AdminComicCard } from "@/components/admin";
import { ComicCardSkeleton, Search } from "@/components/ui";
import { genres } from "@/constants/data";
import { useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { useState } from "react";

export default function Comics() {
  const { allComics, isAllComicsLoading } = useComics();

  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const filteredComics = allComics?.filter((comic) => {
    const searchTerm = search.toLowerCase();
    const titleMatch = comic.title.toLowerCase().includes(searchTerm);
    const genreMatchFromSearch = comic.genre.some((g) =>
      g.toLowerCase().includes(searchTerm)
    );

    const genreFilter =
      selectedGenre === "all" ||
      comic.genre.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());

    return (titleMatch || genreMatchFromSearch) && genreFilter;
  });

  return (
    <MainLayout title="All Comics" subtitle="Manage all comics">
      <div className="space-y-4 main">
        <div className="md:w-[70%] w-full">
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Search by comic title..."
          />
        </div>
        <ul className="flex items-center gap-2 flex-wrap">
          {genres.map((category) => (
            <li
              key={category}
              onClick={() => setSelectedGenre(category)}
              className={`capitalize text-sm ${
                selectedGenre === category
                  ? "bg-primary/10 font-medium text-primary-2 border border-transparent"
                  : "bg-background text-muted border border-line"
              } rounded-full px-3 py-1 cursor-pointer shadow-lg`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      {isAllComicsLoading ? (
         <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
         {Array.from({ length: 5 }).map((_, idx) => (
           <ComicCardSkeleton key={idx} />
         ))}
       </div>
      ) : (
        <div className="main grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredComics?.map((comic) => (
            <AdminComicCard key={comic.id} comic={comic} />
          ))}
        </div>
      )}

      {filteredComics?.length === 0 && (
        <div className="main center gap-4 rounded-lg min-h-40 bg-background border border-line p-4">
          <p className="text-muted text-center">No comics found</p>
        </div>
      )}
    </MainLayout>
  );
}
