import api from "@/config/api";
import { toBase64 } from "@/helpers/toBase64String";
import type { CreateComicSchema } from "@/schemas/create-comic";
import type { NewChapterSchema } from "@/schemas/new-chapter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "@/store";

export default function useComics() {
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlockLoading, setIsUnlockLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
      return false;
    } else {
      toast.error(error.message || "An error occurred");
      return false;
    }
  };

  const createNewComic = async (
    data: CreateComicSchema,
    pdf: File,
    image: File | null,
    categories: string[]
  ) => {
    setIsLoading(true);
    try {
      const convertedPdf = await toBase64(pdf);
      let convertedImage;
      if (image) {
        const result = await toBase64(image);
        convertedImage = result;
      }

      const payload = {
        title: data.title,
        synopsis: data.synopsis,
        genre: categories,
        coverImage: convertedImage,
        comicFile: convertedPdf,
        type: data.type,
        format: data.format,
      };
      const response = await api.post("/comic/create", payload);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["creator-comics"] });
        queryClient.invalidateQueries({ queryKey: ["comics"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        queryClient.invalidateQueries({ queryKey: ["new-release-comics"] });
        queryClient.invalidateQueries({ queryKey: ["free-comics"] });
        queryClient.invalidateQueries({ queryKey: ["trending-comics"] });
        navigate("/comics");
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

  const addNewChapter = async (
    comicId: string,
    data: NewChapterSchema,
    pdf: File
  ) => {
    setIsLoading(true);
    try {
      const convertedPdf = await toBase64(pdf);
      const payload = {
        title: data.title,
        chapterNumber: data.chapterNumber,
        comicFile: convertedPdf,
        format: data.format,
      };
      const response = await api.post(`/comic/${comicId}/chapter`, payload);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["creator-comics"] });
        queryClient.invalidateQueries({ queryKey: ["comics"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        queryClient.invalidateQueries({ queryKey: ["new-release-comics"] });
        queryClient.invalidateQueries({ queryKey: ["free-comics"] });
        queryClient.invalidateQueries({ queryKey: ["trending-comics"] });
        navigate(-1);
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

  const getCreatorComics = async () => {
    try {
      const response = await api.get("/comic/creator");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const getApprovedComics = async () => {
    try {
      const response = await api.get("/comic/");
      if (response.data.success) {
        console.log(response.data.data);
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

  const getAllComics = async () => {
    try {
      const response = await api.get("/comic/all");
      if (response.data.success) {
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

  const getNewReleaseComics = async () => {
    try {
      const response = await api.get("/comic/new-release");
      if (response.data.success) {
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

  const getFreeComics = async () => {
    try {
      const response = await api.get("/comic/free");
      if (response.data.success) {
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

  const getTrendingComics = async () => {
    try {
      const response = await api.get("/comic/trending");
      if (response.data.success) {
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

  const saveComic = async (comicId: string | null) => {
    if (!comicId) return;
    setIsSaveLoading(true);
    try {
      const response = await api.post(`/user/comic/${comicId}/save`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comics"] });
        queryClient.invalidateQueries({ queryKey: ["trending-comics"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setIsSaveLoading(false);
    }
  }

  const getSavedComics = async () => {
    try {
      const response = await api.get("/user/comic/saved");
      if (response.data.success) {
        console.log(response.data.data);
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  }


  const { data: savedComics, isLoading: isSavedComicsLoading } = useQuery<IComic[] | []>({
    queryKey: ["saved-comics"],
    queryFn: getSavedComics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { data: allComics, isLoading: isAllComicsLoading } = useQuery<IComic[]>({
    queryKey: ["all-comics"],
    queryFn: getAllComics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  const { data: comics, isLoading: isComicsLoading } = useQuery<IComic[]>({
    queryKey: ["comics"],
    queryFn: getApprovedComics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  const { data: creatorComics, isLoading: isCreatorComicsLoading } = useQuery<
    IComic[]
  >({
    queryKey: ["creator-comics"],
    queryFn: getCreatorComics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  const { data: newReleaseComics, isLoading: isNewReleaseComicsLoading } =
    useQuery<IComic[]>({
      queryKey: ["new-release-comics"],
      queryFn: getNewReleaseComics,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      enabled: true,
    });

  const { data: freeComics, isLoading: isFreeComicsLoading } = useQuery<
    IComic[]
  >({
    queryKey: ["free-comics"],
    queryFn: getFreeComics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  const { data: trendingComics, isLoading: isTrendingComicsLoading } = useQuery<
    IComic[]
  >({
    queryKey: ["trending-comics"],
    queryFn: getTrendingComics,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: true,
  });

  const likeComic = async (comicId: string) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/comic/${comicId}/like`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comics"] });
        queryClient.invalidateQueries({ queryKey: ["trending-comics"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
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

  const unlockComic = async (comicId: string) => {
    setIsUnlockLoading(true);
    try {
      const response = await api.post(`/comic/${comicId}/unlock`);
      if (response.data.success) {
        toast.success(response.data.message);
        
        // Update user credits in the store
        if (response.data.data.user) {
          const currentUser = useAuthStore.getState().user;
          if (currentUser) {
            setUser({
              ...currentUser,
              credits: response.data.data.user.credits,
            });
          }
        }
        
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ["comics"] });
        queryClient.invalidateQueries({ queryKey: ["trending-comics"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        queryClient.invalidateQueries({ queryKey: ["creator-comics"] });
        queryClient.invalidateQueries({ queryKey: ["new-release-comics"] });
        queryClient.invalidateQueries({ queryKey: ["free-comics"] });
        
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
      return false;
    } finally {
      setIsUnlockLoading(false);
    }
  };

  return {
    createNewComic,
    isLoading,
    isUnlockLoading,
    comics,
    creatorComics,
    newReleaseComics,
    freeComics,
    trendingComics,
    isComicsLoading,
    isCreatorComicsLoading,
    isNewReleaseComicsLoading,
    isFreeComicsLoading,
    isTrendingComicsLoading,
    addNewChapter,
    likeComic,
    unlockComic,
    allComics,
    isAllComicsLoading,
    saveComic,
    isSaveLoading,
    savedComics,
    isSavedComicsLoading,
  };
}
