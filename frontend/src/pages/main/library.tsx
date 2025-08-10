import { ComicCard } from "@/components/ui";
import { MainLayout } from "@/layouts";
import { BookMarked, BookOpen } from "lucide-react";
import { useState } from "react";

const fltBtns = [
    {
        id: "saved",
        title: "Saved Comics",
        icon: BookMarked
    },
    {
        id: "reads",
        title: "My Reads",
        icon: BookOpen
    },
]


export default function Library() {
    const [selectedBtn, setSelectedBtn] = useState("saved")
    const handleFilter = (id: string) => {
        setSelectedBtn(id)
    }
    return (
        <MainLayout title="My Library" subtitle="Browse your comics">
            <div className="flex items-center gap-4">
                {fltBtns.map((btn) => (
                    <button key={btn.id} onClick={() => handleFilter(btn.id)} className={`flex items-center gap-2 border-b-2 ${selectedBtn === btn.id ? "border-primary-2 text-primary-2" : "border-transparent bg-background text-muted shadow-lg"} p-4`}>
                        <btn.icon size={18} />
                        {btn.title}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ComicCard />
            </div>
        </MainLayout>
  )
}
