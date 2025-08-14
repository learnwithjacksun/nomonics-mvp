import { useComics } from "@/hooks";
import { Bookmark, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const { comics } = useComics();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Only use the first 5 most recent comics
  const recentComics = comics ? [...comics].slice(0, 5) : [];
  const displayComic = recentComics[index];

  useEffect(() => {
    if (recentComics.length > 1) {
      intervalRef.current = setInterval(() => {
        setFade(false); // Start fade-out
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % recentComics.length);
          setFade(true); // Fade back in
        }, 500); // Duration matches CSS transition
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [recentComics]);

  return (
    <div className="relative min-h-[500px] md:min-h-[calc(100vh-95px)] py-10 flex items-center overflow-hidden">
      {/* Background Image with Fade */}
      <img
        src={displayComic?.coverImage.url}
        alt="hero"
        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-2 to-primary/10" />

      {/* Hero Content */}
      <div className="relative z-20 main left-0 w-full">
        <div
          className={`md:w-1/2 space-y-[33px] transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-white text-4xl md:text-[69px] font-comic">
            {displayComic?.title}
          </h2>

          {/* Genres */}
          <div className="flex flex-wrap items-center gap-2">
            {displayComic?.genre.map((genre) => (
              <div
                key={genre}
                className="border border-primary capitalize bg-primary/20 text-primary px-4 py-2 rounded-md"
              >
                {genre}
              </div>
            ))}
          </div>

          {/* Synopsis with fixed height for layout stability */}
          <p
            className="text-white text-md md:text-2xl overflow-hidden"
            style={{
              minHeight: "4.5rem", // Prevent layout jump
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3, // Truncate to 3 lines
            }}
          >
            {displayComic?.synopsis}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to={`/comic/${displayComic?.id}`}
              className="btn btn-primary font-semibold h-12 px-4 rounded-lg flex items-center"
            >
              Read me <ChevronRight size={20} />
            </Link>
            <button className="btn bg-white text-main font-semibold h-12 px-4 rounded-lg flex items-center gap-2">
              <Bookmark size={20} /> Save me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
