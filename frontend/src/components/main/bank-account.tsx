import { useEffect, useState } from "react";
import {
  BankAccountCard,
  ButtonWithLoader,
  InputWithoutIcon,
  Modal,
  SelectWithoutIcon,
} from "../ui";
import { useBankAccount } from "@/hooks";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankDataFormSchema, type BankDataFormSchema } from "@/schemas/bank-data-form";

export default function BankAccount() {
  const [showBankForm, setShowBankForm] = useState(false);
  const [resolvedAccountName, setResolvedAccountName] = useState("");
  const {
    bankAccount,
    isLoadingBankAccount,
    supportedBanks,
    resolveBankAccount,
    addOrUpdateBankAccount,
    isAddingOrUpdateBankAccount,
  } = useBankAccount();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BankDataFormSchema>({
    resolver: zodResolver(bankDataFormSchema),
    defaultValues: {
      accountNumber: "",
      bankCode: "",
      isDefault: false,
    },
  });

  const selectedbanckCode = watch("bankCode");
  const bankName = supportedBanks?.find(
    (bank: { code: string; name: string }) => bank.code === selectedbanckCode
  )?.name;
  useEffect(() => {
    const resolveAccount = async () => {
      if (selectedbanckCode && watch("accountNumber")) {
        const resolvedName = await resolveBankAccount({
          accountNumber: watch("accountNumber"),
          bankCode: selectedbanckCode,
          bankName: bankName,
        });
        setResolvedAccountName(resolvedName?.accountName || "");
      } else {
        setResolvedAccountName("");
      }
    };

    resolveAccount();
  }, [bankName, resolveBankAccount, selectedbanckCode, watch]);

  const onSubmit = (data: BankDataFormSchema) => {
    console.log(data, bankName, resolvedAccountName);
    addOrUpdateBankAccount({
      accountNumber: data.accountNumber,
      bankCode: data.bankCode,
      bankName: bankName,
      accountName: resolvedAccountName,
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Bank Accounts</h3>
          <ButtonWithLoader
            onClick={() => setShowBankForm(true)}
            initialText="Add Bank"
            loadingText="Adding..."
            className="bg-primary px-4 h-9 rounded-lg text-primary-foreground hover:bg-primary/90"
          />
        </div>

        {/* Bank Accounts List */}
        {isLoadingBankAccount ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : bankAccount ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BankAccountCard key={bankAccount.id} bankAccount={bankAccount} />
          </div>
        ) : (
          <div className="center h-40 bg-background shadow-lg border border-line rounded-lg text-center">
            <p className="text-muted text-sm">No bank account added</p>
          </div>
        )}
      </div>

      {showBankForm && (
        <Modal
          title="Add Bank Account"
          isOpen={showBankForm}
          onClose={() => setShowBankForm(false)}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputWithoutIcon
              type="number"
              label="Account Number"
              placeholder="Enter account number"
              {...register("accountNumber")}
              error={errors.accountNumber?.message}
            />

            <SelectWithoutIcon
              label="Bank"
              options={supportedBanks.map(
                (bank: { name: string; code: string }) => ({
                  label: bank.name,
                  value: bank.code,
                })
              )}
              {...register("bankCode")}
              error={errors.bankCode?.message}
            />

            <div className="bg-secondary rounded-lg p-4">
              <p className="text-sm text-muted">Account Name:</p>
              <p className="text-sm font-medium">
                {resolvedAccountName || "- - -"}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <ButtonWithLoader
                type="submit"
                initialText={"Add Account"}
                loadingText="Adding..."
                loading={isAddingOrUpdateBankAccount}
                className="flex-1 bg-primary rounded-lg text-primary-foreground hover:bg-primary/90"
              />
              <button
                type="button"
                onClick={() => setShowBankForm(false)}
                className="flex-1 px-4 py-2 border border-line rounded-lg hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
