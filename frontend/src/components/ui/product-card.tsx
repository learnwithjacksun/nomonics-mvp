import { formatNumber } from "@/helpers/formatNumber";
import { ChevronRight} from "lucide-react";

export default function ProductCard() {

  return (
    <div className="relative bg-white  rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
        {/* Left Side - Book Cover Image */}
        <div className="col-span-1 relative overflow-hidden rounded-md">
          <img
            src="/poster.jpg"
            alt="The Amazing Spider-Man"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1/1.414" }} // A4 proportions (1:√2)
          />
        </div>

        {/* Right Side - Content Details */}
        <div className="md:col-span-2 col-span-1 flex flex-col space-y-3">
          {/* Title and Author */}
          <div>
            <p className="bg-primary/10 w-fit font-semibold text-primary-2 px-2 py-1 rounded-full text-sm">
              Drama
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              Tom and Jerry
            </h3>
            <p className="text-sm text-muted line-clamp-3 text-ellipsis">
              Lorem ipsum dolor sit amet conse adipisicing elit.
              Perferendis dignissimos atque quis odit exercit porro
              architecto modi qui, soluta amet!
            </p>
          </div>


          <p className="text-primary-2 font-bold text-lg mt-auto">
            &#8358; {formatNumber(2500)}
          </p>
        </div>
      </div>

      <a href="#" target="_blank" className="bg-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="h-10 w-10 center rounded-full overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Elon+Musk&background=4b2e00&color=fff" alt="" />
            </div>
            <p className="text-sm text-primary-2 font-semibold">Gift Jackson</p>
        </div>
        <button>
             <ChevronRight size={30}/>
        </button>
      </a>
    </div>
  );
}
