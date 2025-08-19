import {
  BankAccountCard,
  Box,
  ButtonWithLoader,
  InputWithoutIcon,
} from "../ui";
import { Lock } from "lucide-react";
import { useAuth, useBankAccount, useWithdrawal } from "@/hooks";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.number().min(1000, { message: "Amount must be greater than 1000" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Withdrawal() {
  const { user } = useAuth();
  const { bankAccount } = useBankAccount();
  const { createWithdrawal, isCreatingWithdrawal } = useWithdrawal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = (data: FormSchema) => {
  
    if (data.amount > Number(user?.earnings)) return toast.error("Insufficient balance");
    if (!bankAccount) return toast.error("No bank account added");
    createWithdrawal({
      amount: data.amount,
      accountName: bankAccount?.accountName,
      accountNumber: bankAccount?.accountNumber,
      bankCode: bankAccount?.bankCode,
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Withdrawal</h3>
         
        </div>

        {/* Withdrawals List */}

        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <Box>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <InputWithoutIcon
                type="number"
                label="Amount"
                placeholder="Enter amount"
                {...register("amount", {
                  valueAsNumber: true,
                })}
                error={errors.amount?.message}
              />
              <ButtonWithLoader
                initialText="Withdraw"
                loadingText="Processing..."
                className="w-full btn-primary h-10 rounded-lg"
                loading={isCreatingWithdrawal}
                disabled={isCreatingWithdrawal}
              />
              <p className="flex items-center gap-2 text-sm justify-center text-muted">
                <Lock size={18} className="text-yellow-500" /> Secured by
                paystack
              </p>
            </form>
          </Box>
          <div>
            {bankAccount ? (
              <div className="">
                <BankAccountCard bankAccount={bankAccount} />
              </div>
            ) : (
              <div className="center h-30 bg-secondary border border-line rounded-lg">
                <p>No Bank Account Added</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
