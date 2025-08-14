export default function ProductCardSkeleton() {
    return (
      <div className="relative bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-pulse">
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
          {/* Left Side - Image Skeleton */}
          <div className="col-span-1 relative overflow-hidden rounded bg-gray-200" style={{ aspectRatio: "1/1.414" }} />
  
          {/* Right Side - Content Details Skeleton */}
          <div className="md:col-span-2 col-span-1 flex flex-col space-y-3">
            {/* Category */}
            <div className="h-6 w-20 bg-gray-200 rounded-full" />
            {/* Title */}
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="h-5 w-1/2 bg-gray-200 rounded" />
            {/* Description lines */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
            {/* Price */}
            <div className="h-6 w-24 bg-gray-200 rounded mt-auto" />
          </div>
        </div>
  
        {/* Footer */}
        <div className="bg-primary/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }
  