import { ReadComics, SavedComics } from "@/components/main";
import { MainLayout } from "@/layouts";
import { BookMarked, BookOpen } from "lucide-react";
import { useState } from "react";

const fltBtns = [
  {
    id: "saved",
    title: "Saved Comics",
    icon: BookMarked,
  },
  {
    id: "reads",
    title: "My Reads",
    icon: BookOpen,
  },
];

export default function Library() {
  const [selectedBtn, setSelectedBtn] = useState("reads");
  const handleFilter = (id: string) => {
    setSelectedBtn(id);
  };
  return (
    <MainLayout title="My Library" subtitle="Browse your comics">
      <div className="main space-y-10">
        <div className="inline-flex items-center shadow-lg">
          {fltBtns.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleFilter(btn.id)}
              className={`flex items-center border-b-2 ${
                selectedBtn === btn.id
                  ? "border-primary-2 bg-background text-primary-2"
                  : "border-transparent bg-background text-muted "
              } p-4`}
            >
              {btn.title}
            </button>
          ))}
        </div>
        {selectedBtn === "saved" && <SavedComics />}
        {selectedBtn === "reads" && <ReadComics />}
      </div>
    </MainLayout>
  );
}
