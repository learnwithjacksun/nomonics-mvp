import { ComicCardTwo } from "@/components/main";
import { Search } from "@/components/ui";
import { genres } from "@/constants/data";
import { useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function Categories() {
  const { comics, isComicsLoading } = useComics();
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const filteredComics = comics?.filter((comic) => {
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
    <MainLayout
      title="Categories"
      subtitle="Browse comics by genre"
    >
      <div className="space-y-4 main">
        <div className="md:w-[70%] w-full">
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Search by comic title or genre..."
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
      {isComicsLoading ? (
        <div className="main center gap-4 rounded-lg min-h-40 bg-background border border-line p-4">
          <Loader size={20} className="text-primary animate-spin" /> Loading
          Comics...
        </div>
      ) : (
        <div className="main grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredComics?.map((comic) => (
            <ComicCardTwo key={comic.id} comic={comic} />
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
