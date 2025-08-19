import api from "@/config/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import { AxiosError } from "axios";

interface Withdrawal {
  amount: number;
  accountName: string;
  accountNumber: string;
  bankCode: string;
}


export default function useWithdrawal() {
  const queryClient = useQueryClient();

const createWithdrawalFn = async (data: Withdrawal) => {
  const response = await api.post("/withdrawal", data);
  return response.data;
}

  const {mutate: createWithdrawal, isPending: isCreatingWithdrawal} = useMutation({
    mutationFn: createWithdrawalFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Withdrawal created successfully");
    },
    onError: (error : Error | AxiosError) => {
      console.log(error);
      toast.error(error.message);
    },
  })

  return {
    createWithdrawal,
    isCreatingWithdrawal,
  }
}
