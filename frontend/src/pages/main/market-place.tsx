import { ProductCard, ProductCardSkeleton } from "@/components/ui";
import {  useProducts } from "@/hooks";
import { MainLayout } from "@/layouts";
import { useState } from "react";

const fltBtns = [
  {
    id: "nomonics",
    title: "Nomonics",
  },
  {
    id: "local",
    title: "Local Vendors",
  },
];

export default function MarketPlace() {
  const {products, isLoadingProducts} = useProducts()
  const [selectedBtn, setSelectedBtn] = useState("nomonics");
  const handleFilter = (id: string) => {
    setSelectedBtn(id);
  };
  const isLocalVendorProducts = products?.filter((product) => product.vendorType === "local")
  const isNomonicsProducts = products?.filter((product) => product.vendorType === "nomonics")

  const displayProducts = selectedBtn === "local" ? isLocalVendorProducts : isNomonicsProducts
  return (
    <MainLayout
      title="Market Place"
      subtitle="Buy and sell comics all on Nomonics"
    >
      <div className="main space-y-10">
        <div className="inline-flex items-center shadow-lg">
          {fltBtns.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleFilter(btn.id)}
              className={`flex items-center border-b-2 ${
                selectedBtn === btn.id
                  ? "border-primary-2 bg-background text-primary-2"
                  : "border-transparent bg-background text-muted "
              } p-4`}
            >
              {btn.title}
            </button>
          ))}
        </div>
        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </div>
        ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        )}
      </div>
    </MainLayout>
  );
}
