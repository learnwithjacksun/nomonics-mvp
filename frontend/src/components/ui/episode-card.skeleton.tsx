export default function EpisodeCardSkeleton() {
    return (
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
        <div className="p-4">
          <div className="col-span-2 flex flex-col justify-between space-y-3">
            
            {/* Title and Comic Name placeholders */}
            <div>
              <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
            </div>
  
            {/* Read time & Comments placeholders */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-10" />
              </div>
              <div className="flex items-center gap-1">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16" />
              </div>
            </div>
  
            {/* Button placeholder */}
            <div className="w-full h-9 bg-gray-300 dark:bg-gray-700 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  