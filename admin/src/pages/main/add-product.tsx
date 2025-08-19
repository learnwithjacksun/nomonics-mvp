import { MainLayout, MiniLayout } from "@/layouts";
import {
  Box,
  ButtonWithLoader,
  ImageUploader,
  InputWithoutIcon,
  SelectWithoutIcon,
} from "@/components/ui";
import { comicCategories } from "@/constants/data";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductSchema } from "@/schemas/product";
import { useProducts } from "@/hooks";
import { toast } from "sonner";

export default function AddProduct() {
  const { createProduct, isLoading } = useProducts();
  const [image, setImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });
  const onSubmit = (data: ProductSchema) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    createProduct(data, image);
  };
  return (
    <MainLayout>
      <MiniLayout
        title="Add Product"
        subtitle="Add a new product to the market place"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <InputWithoutIcon
                  type="text"
                  label="Comic Name"
                  placeholder="Enter comic name"
                  {...register("name")}
                  error={errors.name?.message}
                />
                <InputWithoutIcon
                  type="number"
                  label="Price"
                  placeholder="Enter price"
                  {...register("price")}
                  error={errors.price?.message}
                />
                <InputWithoutIcon
                  type="tel"
                  label="WhatsApp Contact"
                  placeholder="Enter whatsapp contact"
                  {...register("contact")}
                  error={errors.contact?.message}
                />
                <SelectWithoutIcon
                  label="Genre"
                  options={comicCategories}
                  {...register("category")}
                  error={errors.category?.message}
                />
              </div>
              <ImageUploader
                label="Product Image"
                image={image}
                setImage={setImage}
              />
              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="text-sm text-muted font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={5}
                  {...register("description")}
                  placeholder="e.g. A young boy discovers he has spider-like abilities and becomes the superhero Spider-Man."
                  className="p-4 w-full rounded-lg text-sm border border-line focus:border-primary focus:ring-[3px] focus:ring-primary/20 dark:bg-secondary mt-1"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 font-medium text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </Box>
          <ButtonWithLoader
            initialText="Add Product"
            loading={isLoading}
            loadingText="Adding Product"
            type="submit"
            className="w-full btn-primary mt-4 h-10 rounded-lg"
          />
        </form>
      </MiniLayout>
    </MainLayout>
  );
}
