import api from "@/config/api";
import Paystack from "@paystack/inline-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const popup = new Paystack();

export default function usePayment() {
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const onError = (error: Error | AxiosError) => {
    console.error(error);
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message || "An error occurred");
    } else {
      toast.error(error.message || "An error occurred");
    }
  };

  const buyCredit = async (
    userId: string,
    amount: number,
    credit: number,
    status: string,
    reference: string
  ) => {
    try {
      setLoading(true);
      const response = await api.post("/transaction/buy-credit", {
        userId,
        amount,
        credit,
        status,
        reference,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/transactions");
        getUser();
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      onError(error as Error | AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const initializePayment = (
    email: string,
    amount: number,
    userId: string,
    credit: number
  ) => {
    setLoading(true);
    popup.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount * 100,
      onSuccess: (transaction) => {
        console.log(transaction);
        setSuccess(true);
        toast.success("Payment successful");
        setLoading(false);
        buyCredit(userId, amount, credit, "success", transaction.reference);
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        setSuccess(true);
      },
      onLoad: (response) => {
        console.log("onLoad: ", response);
        toast.success("Payment successful");
        setLoading(false);
      },
      onCancel: () => {
        console.log("onCancel");
        toast.error("Payment cancelled");
        setLoading(false);
      },
      onError: (error) => {
        console.log("Error: ", error.message);
        toast.error(error.message);
        setSuccess(false);
        setLoading(false);
      },
    });
  };

  const getTransactions = async () => {
    try {
      const response = await api.get("/transaction");
      if (response.data.success) {
        console.log(response.data.data);
        return response.data.data;
      } else {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (error) {
      console.error(error, "Login first");
    }
  };

  const { data: transactions, isLoading: isLoadingTransactions } = useQuery<
    ITransaction[]
  >({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  return {
    initializePayment,
    loading,
    success,
    transactions,
    isLoadingTransactions,
  };
}
