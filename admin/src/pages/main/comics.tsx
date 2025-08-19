import ComicCard from "@/components/main/comic-card";
import { ComicCardSkeleton, Search } from "@/components/ui";
import { useComics } from "@/hooks";
import { MainLayout } from "@/layouts";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
const comicFilterBtns = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Approved",
    value: "approved",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

export default function Comics() {
  const { allComics, isAllComicsLoading } = useComics();
  const [search, setSearch] = useState("");
  const [selectedComic, setSelectedComic] = useState("all");

  const filteredComics = useMemo(() => {
    if (!allComics) return [];

    return allComics.filter((comic) => {
      // Search filter
      const searchMatch =
        search === "" ||
        comic.title.toLowerCase().includes(search.toLowerCase()) ||
        comic.synopsis.toLowerCase().includes(search.toLowerCase());

      // Role filter
      const roleMatch =
        selectedComic === "all" || comic.status === selectedComic;

      return searchMatch && roleMatch;
    });
  }, [allComics, search, selectedComic]);

  return (
    <MainLayout title="Comics" description="Manage all comics">
      <div className="space-y-4">
        <div className="md:w-[70%] w-full">
          <Search
            search={search}
            setSearch={setSearch}
            placeholder="Search by comic title or synopsis..."
          />
        </div>

        <div className="flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <ul className="flex items-center gap-2 flex-wrap">
            {comicFilterBtns.map((comic) => (
              <li
                key={comic.value}
                onClick={() => setSelectedComic(comic.value)}
                className={`capitalize text-sm ${
                  selectedComic === comic.value
                    ? "bg-primary-2 font-medium text-white border border-transparent"
                    : "bg-background text-muted border border-line"
                } rounded-full px-4 py-2 cursor-pointer shadow-lg`}
              >
                {comic.label}
              </li>
            ))}
          </ul>
          <div>
          <Link
            to="/comics/add"
            className="btn btn-primary w-fit px-4 h-10 rounded-lg"
          >
            <Plus size={20} />
            Add Comic
          </Link>
        </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted">
            Showing {filteredComics.length} of {allComics?.length || 0} comics
          </p>
          {(search || selectedComic !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedComic("all");
              }}
              className="text-sm text-primary-2 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
       
      </div>

      <div className="space-y-4">
        {isAllComicsLoading ? (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <ComicCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4">
            {filteredComics?.map((comic) => (
              <ComicCard key={comic.id} comic={comic} />
            ))}
          </div>
        )}

        {filteredComics?.length === 0 && (
          <div className="flex items-center justify-center h-40 bg-background rounded-lg border border-line shadow-lg">
            <p className="text-muted-foreground">No comics found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
