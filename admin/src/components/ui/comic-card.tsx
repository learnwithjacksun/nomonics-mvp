import { Heart, Clock, ChevronRight, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ComicCard() {
  const navigate = useNavigate();

  // const episodes = 10;
  const likes = 1247;
  const readTime = "15 min";

  const handleNavigate = () => {
    navigate(`/comic/1`);
  };

  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
        {/* Left Side - Book Cover Image */}
        <div className="col-span-1 relative overflow-hidden rounded-lg">
          <img 
            src="/poster.jpg" 
            alt="The Amazing Spider-Man" 
            className="w-full h-full object-cover" 
            style={{ aspectRatio: '1/1.414' }} // A4 proportions (1:√2)
          />
          
          
        </div>

        {/* Right Side - Content Details */}
        <div className="md:col-span-2 col-span-1 flex flex-col space-y-3">
          {/* Title and Author */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              The Amazing Spider-Man
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Stan Lee
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            {/* <div className="flex items-center gap-1">
              <span>{episodes} {episodes > 1 ? "chapters" : "chapter"}</span>
            </div> */}
            <div className="flex items-center gap-1">
              <Clock size={18} />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Likes */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <Heart size={18} className="fill-current text-red-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {likes.toLocaleString()}
              </span>
            </div>
            <button className="h-9 text-primary-2 rounded-lg">
              <Bookmark size={18}/>
              Save
            </button>
          </div>

          {/* Action Button */}
          <button 
            className="w-full btn-primary h-9 rounded-lg mt-auto"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            View Details
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
