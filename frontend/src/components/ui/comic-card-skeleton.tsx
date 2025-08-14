export default function ComicCardSkeleton() {
    return (
      <div
        className="relative rounded-sm overflow-hidden cursor-pointer bg-gray-200"
        style={{ aspectRatio: "1/1.414" }}
      >
        {/* Background Placeholder with Pulse */}
        <div className="absolute inset-0 bg-gray-300 animate-pulse" />
  
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
  
        {/* Text Placeholder */}
        <div className="absolute bottom-0 left-0 p-4 w-full animate-pulse">
          <div className="h-5 bg-gray-400 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-500 rounded w-1/2" />
        </div>
      </div>
    );
  }
  