import { useNavigate } from "react-router-dom";

export default function ComicCard({comic}: {comic: IComic}) {
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/comic/${id}`);
  };

  return (
    <div
      className="relative rounded-sm overflow-hidden cursor-pointer"
      style={{ aspectRatio: "1/1.414" }}
      onClick={() => handleNavigate(comic.id)}
    >
      {/* Background Image */}
      <img
        src={comic.coverImage.url}
        alt={comic.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-lg font-bold">{comic?.title || "Unknown"}</h3>
        <p className="text-sm opacity-80">by {typeof comic.creator === "string" ? "Unknown" : comic.creator.name}</p>
      </div>
    </div>
  );
}
