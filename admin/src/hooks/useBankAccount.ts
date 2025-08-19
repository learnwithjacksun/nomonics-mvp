import api from "@/config/api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export default function useBankAccount() {
  const queryClient = useQueryClient();

  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
  };

  const getSupportedBanks = async () => {
    try {
      const response = await api.get("/bank/supported-banks");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
      return [];
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  const resolveBankAccount = async (data: {
    accountNumber: string;
    bankCode: string;
    bankName: string;
  }) => {
    try {
      const response = await api.post("/bank/resolve-bank-account", data);
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
      return null;
    } catch (error) {
      onError(error as Error | AxiosError);
    }
  };

  // Get bank accounts
  const getBankAccount = async () => {
    try {
      const response = await api.get("/bank");
      if (response.data.success) {
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data: bankAccount, isLoading: isLoadingBankAccount } = useQuery<
    IBankAccount
  >({
    queryKey: ["bankAccounts"],
    queryFn: getBankAccount,
  });

  // Add bank account mutation
  const addOrUpdateBankAccountMutation = useMutation({
    mutationFn: async (data: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      bankCode: string;
    }) => {
      const response = await api.post("/bank", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: Error | AxiosError) => {
      onError(error);
    },
  });

 


  // Delete bank account mutation
  const deleteBankAccountMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/bank/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      } else {
        toast.error(data.message);
      }
    },
    onError: (error: Error | AxiosError) => {
      onError(error);
    },
  });

  const { data: supportedBanks, isLoading: isLoadingSupportedBanks } = useQuery(
    {
      queryKey: ["supportedBanks"],
      queryFn: getSupportedBanks,
    }
  );

  return {
    bankAccount,
    isLoadingBankAccount,
    addOrUpdateBankAccount: addOrUpdateBankAccountMutation.mutate,
    isAddingOrUpdateBankAccount: addOrUpdateBankAccountMutation.isPending,
    deleteBankAccount: deleteBankAccountMutation.mutate,
    isDeletingBankAccount: deleteBankAccountMutation.isPending,
    supportedBanks,
    isLoadingSupportedBanks,
    resolveBankAccount,
  };
}
