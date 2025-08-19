import api from "@/config/api";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

export default function useAdmin() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState({
    updateComicCredit: false,
    approveComic: false,
    rejectComic: false,
    deleteComic: false,
    updateWithdrawalStatus: false,
    toggleAdmin: false,
  });

  const setLoading = (key: keyof typeof isLoading, value: boolean) => {
    setIsLoading((prev) => ({ ...prev, [key]: value }));
  };

  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
  };

  const getAdminStats = async () => {
    try {
      const response = await api.get("/user/admin/stats");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get("/user/admin/users");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateComicCredit = async (id: string, credit: number) => {
    setLoading("updateComicCredit", true);
    try {
      const response = await api.put(`/admin/comic/${id}/credit`, { credit });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comic"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setLoading("updateComicCredit", false);
    }
  };

  const updateComicStatus = async (
    id: string | undefined,
    status: "approved" | "rejected"
  ) => {
    const loadingKey = status === "approved" ? "approveComic" : "rejectComic";
    setLoading(loadingKey, true);
    try {
      if (!id) {
        toast.error("Comic ID is required");
        return false;
      }
      const response = await api.put(`/admin/comic/${id}/status`, { status });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comic"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setLoading(loadingKey, false);
    }
  };

  const deleteComic = async (id: string) => {
    setLoading("deleteComic", true);
    try {
      const response = await api.delete(`/admin/comic/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["comic"] });
        queryClient.invalidateQueries({ queryKey: ["all-comics"] });
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setLoading("deleteComic", false);
    }
  };

  const getTransactions = async () => {
    try {
      const response = await api.get("/admin/transactions");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
     console.log(error);
    }
  }

  const getWithdrawals = async () => {
    try {
      const response = await api.get("/admin/withdrawals");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return [];
      }
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const updateWithdrawalStatus = async (data: {
    id: string;
    status: "pending" | "processing" | "completed" | "failed" | "cancelled";
    adminNotes?: string;
  }) => {
    setLoading("updateWithdrawalStatus", true);
    try {
      const response = await api.put(`/admin/withdrawal/${data.id}/status`, {
        status: data.status,
        adminNotes: data.adminNotes,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
        queryClient.invalidateQueries({ queryKey: ["admin-withdrawals"] });
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setLoading("updateWithdrawalStatus", false);
    }
  };

  const toggleAdminStatus = async (userId: string) => {
    setLoading("toggleAdmin", true);
    try {
      const response = await api.patch(`/user/${userId}/toggle-admin`);
      if (response.data.success) {
        toast.success(response.data.message);
        queryClient.invalidateQueries({ queryKey: ["users"] });
        return response.data.data;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setLoading("toggleAdmin", false);
    }
  };

  const getBalance = async () => {
    try {
      const response = await api.get("/admin/balance");
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

  const { data: balance, isLoading: isCheckingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalance,
  });


  const { data: adminStats, isLoading: isAdminStatsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });

  const { data: users, isLoading: isUsersLoading } = useQuery<IUser[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const { data: withdrawals, isLoading: isWithdrawalsLoading } = useQuery<IWithdrawal[]>({
    queryKey: ["admin-withdrawals"],
    queryFn: getWithdrawals,
  });

  return {
    adminStats,
    users,
    isAdminStatsLoading,
    isUsersLoading,
    isLoading,
    updateComicCredit,
    updateComicStatus,
    deleteComic,
    transactions,
    isTransactionsLoading,
    withdrawals,
    isWithdrawalsLoading,
    updateWithdrawalStatus,
    toggleAdminStatus,
    balance,
    isCheckingBalance,
  };
}
