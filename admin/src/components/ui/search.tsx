import { SearchIcon } from "lucide-react";

export default function Search({search, setSearch, placeholder}: {search: string, setSearch: (search: string) => void, placeholder: string}) {
  return (
    <div className="flex items-center gap-2 bg-background shadow-lg h-12 px-4 border border-line focus-within:border-primary-2">
        <SearchIcon  className="text-muted" />
        <input type="text" placeholder={placeholder} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg outline-none" />
    </div>
  )
}
