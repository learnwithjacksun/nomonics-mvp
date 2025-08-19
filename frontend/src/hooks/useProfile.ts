import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/config/api";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { toBase64 } from "@/helpers/toBase64String";
import type { ProfileSchema } from "@/schemas/profile";

export default function useProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
  };

  const updateProfile = async (data: ProfileSchema, image?: File) => {
    setIsLoading(true);
    try {
        
        let imageBase64 = null;
      

      // Convert image to base64 if provided
      if (image) {
        const base64Image = await toBase64(image);
        imageBase64 = base64Image;
      }

      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        state: data.state,
        dob: data.dob,
        gender: data.gender,
        image: imageBase64,
      };

      const response = await api.put("/user/profile", payload);
      if (response.data.success) {
        toast.success(response.data.message);
        // Invalidate user queries to refresh the user data
        queryClient.invalidateQueries({ queryKey: ["user"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
  };
}
