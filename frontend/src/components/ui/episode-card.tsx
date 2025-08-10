import {  BookOpen, Clock, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EpisodeCard() {
  const navigate = useNavigate();

 
  const readTime = "15 min";
  const comments = 10;

  const handleNavigate = () => {
    navigate(`/comic/1`);
  };

  return (
    <div 
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer"
      onClick={handleNavigate}
    >
      <div className=" p-4">
       

        {/* Right Side - Content Details */}
        <div className="col-span-2 flex flex-col justify-between space-y-3">
          {/* Title and Author */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              Chapter 1
            </h3>
            <p className="text-sm text-muted dark:text-gray-400 font-medium">
              Venom vs Spider-Man
            </p>
          </div>

         
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock size={18} />
                  <span>{readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquareText size={18} />
                  <span>{comments} Comments</span>
                </div>
            </div>


         

          {/* Action Button */}
          <button 
            className="w-full btn-primary h-9 rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigate();
            }}
          >
            <BookOpen className="w-4 h-4" />
            Read Now
          </button>
        </div>
      </div>
    </div>
  );
}
