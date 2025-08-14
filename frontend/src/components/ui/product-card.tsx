import { formatNumber } from "@/helpers/formatNumber";
import { ChevronRight} from "lucide-react";

export default function ProductCard({product}: {product: IProduct}) {

  return (
    <div className="relative bg-white  rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 p-4">
        {/* Left Side - Book Cover Image */}
        <div className="col-span-1 relative overflow-hidden rounded">
          <img
            src={product.image}
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
              {product.category}
            </p>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-muted line-clamp-3 text-ellipsis">
              {product.description}
            </p>
          </div>


          <p className="text-primary-2 font-bold text-lg mt-auto">
            &#8358; {formatNumber(product.price)}
          </p>
        </div>
      </div>

      <a href={product.contact} target="_blank" className="bg-primary/10 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="h-10 w-10 center rounded-full overflow-hidden">
                <img src={product.createdBy.image} alt="" />
            </div>
            <p className="text-sm text-primary-2 font-semibold">{product.createdBy.name}</p>
        </div>
        <button>
             <ChevronRight size={30}/>
        </button>
      </a>
    </div>
  );
}
