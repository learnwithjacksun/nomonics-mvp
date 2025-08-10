import { ComicCard } from "@/components/main";
import { Search } from "@/components/ui";
import { genres } from "@/constants/data";
import { MainLayout } from "@/layouts";
import { useState } from "react";

export default function Comics() {
    const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  return (
    <MainLayout title="My Comics" subtitle="View and manage all your uploaded and approved comics">
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
                <li key={category} onClick={() => setSelectedGenre(category)} className={`capitalize text-sm ${selectedGenre === category ? "bg-primary/10 font-medium text-primary-2 border border-transparent" : "bg-background text-muted border border-line"} rounded-full px-3 py-1 cursor-pointer shadow-lg`}>{category}</li>
            ))}
        </ul>
      </div>
        <div className="main grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">  
            <ComicCard />
            <ComicCard />
            <ComicCard />
        </div>
    </MainLayout>
  )
}
