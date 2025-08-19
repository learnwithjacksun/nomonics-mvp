import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import api from "@/config/api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export default function useComments() {
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

  const addComment = async (chapterId: string, comment: string) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/comment/${chapterId}`, { comment });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comments", chapterId] });
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

  const getChapterComments = async (chapterId: string) => {
    try {
      const response = await api.get(`/comment/${chapterId}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return [];
    }
  };

  const likeComment = async (commentId: string) => {
    try {
      const response = await api.post(`/comment/${commentId}/like`);
      if (response.data.success) {
        toast.success(response.data.message);
        // Invalidate all comment queries to refresh the UI
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return false;
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      const response = await api.delete(`/comment/${commentId}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comments"] });
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return false;
    }
  };

  return {
    addComment,
    getChapterComments,
    likeComment,
    deleteComment,
    isLoading,
  };
}
