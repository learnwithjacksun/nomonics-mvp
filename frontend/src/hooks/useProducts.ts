import api from "@/config/api";
import { toBase64 } from "@/helpers/toBase64String";
import type { ProductSchema } from "@/schemas/product";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useProducts() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
  };

  const createProduct = async (data: ProductSchema, image: File) => {
    setIsLoading(true);
    try {
      const imageUrl = await toBase64(image);
      const payload = {
        name: data.name,
        price: data.price,
        contact: data.contact,
        description: data.description,
        image: imageUrl,
        category: data.category,
        vendorType: "local",
      };
      const response = await api.post("/marketplace/create", payload);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["products"] });
        navigate("/marketplace")
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`/marketplace/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["products"] });
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const getProducts = async () => {
    try {
      const response = await api.get("/marketplace/");
      if (response.data.success) {
        return response.data.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const { data: products, isLoading: isLoadingProducts } = useQuery<IProduct[]>(
    {
      queryKey: ["products"],
      queryFn: getProducts,
    }
  );

  return {
    createProduct,
    isLoading,
    products,
    isLoadingProducts,
    deleteProduct,
    isDeleting,
  };
}
