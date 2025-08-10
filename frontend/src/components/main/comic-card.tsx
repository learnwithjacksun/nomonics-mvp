import { useNavigate } from "react-router-dom";

export default function ComicCard() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/comic/1`);
  };

  return (
    <div
      className="relative rounded-sm overflow-hidden cursor-pointer"
      style={{ aspectRatio: "1/1.414" }}
      onClick={handleNavigate}
    >
      {/* Background Image */}
      <img
        src="/poster.jpg"
        alt="The Amazing Spider-Man"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="text-lg font-bold">The Amazing Spider-Man</h3>
        <p className="text-sm opacity-80">by Stan Lee</p>
      </div>
    </div>
  );
}
