import { Episodes } from "@/components/main";
import { MainLayout } from "@/layouts";
import { BookOpen, Clock, Heart } from "lucide-react";
import { useParams } from "react-router-dom";

export default function Comic() {
  const { id } = useParams();
  console.log(id)
  const categories = [
    "Adventure",
    "Action",
    "Superhero",
    "Comedy",
    "Drama",
    "Fantasy",
    "Sci-Fi",
  ];
  return (
    <MainLayout>
      <div className="space-y-10 mt-4">
        <div className="w-full md:w-[900px] mx-auto grid md:grid-cols-2 grid-cols-1 gap-4 bg-background rounded-lg p-4 border border-line">
          <div className="overflow-hidden rounded-sm">
            <img
              src="/poster.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-bold">The Amazing Spider-Man</h1>
              <p>Author: Stan Lee</p>
            </div>
            <div className="flex items-center gap-4 text-muted">
              <p className="flex items-center gap-1">
                <Clock size={18} /> 15 min
              </p>
              <p className="flex items-center gap-1">
                <BookOpen size={18} /> 10 chapters
              </p>
            </div>
            <ul className="flex items-center gap-2 text-muted flex-wrap">
              {categories.map((category) => (
                <li className="bg-foreground px-3 py-1 rounded-full text-sm">
                  {category}
                </li>
              ))}
            </ul>
            <button className="btn-primary text-sm h-9 px-4 rounded-lg">
              <Heart size={20} /> 1247 Likes
            </button>
            <div className="space-y-2">
              <p className="text-sm font-bold">Synopsis:</p>
              <p className="text-sm text-muted">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Repellendus ducimus reiciendis assumenda rem! Saepe eligendi
                incidunt labore cupiditate doloribus excepturi! Iste voluptas
                tempora ad excepturi voluptatem obcaecati, quod enim nulla.
              </p>
            </div>
          </div>
        </div>

        <Episodes/>
      </div>
    </MainLayout>
  );
}
