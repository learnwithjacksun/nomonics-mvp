import { Trash2 } from "lucide-react";
import { formatDate } from "@/helpers/formatDate";
import { useBankAccount } from "@/hooks";

interface BankAccountCardProps {
  bankAccount: IBankAccount;

}

export default function BankAccountCard({
  bankAccount,
}: BankAccountCardProps) {

  const { deleteBankAccount, isDeletingBankAccount } = useBankAccount();
  return (
    <div className="border border-line shadow-lg rounded-lg p-4 space-y-3 dark:bg-secondary bg-background">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">{bankAccount.accountName}</h3>
           
          </div>
          <div className="space-y-1">
            <p className="text-muted text-sm">
              <span className="font-medium">Account:</span> {bankAccount.accountNumber}
            </p>
            <p className="text-muted text-sm">
              <span className="font-medium">Bank:</span> {bankAccount.bankName}
            </p>
            <p className="text-muted text-xs">
              Added {formatDate(bankAccount.createdAt)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
         
           
          
          
          
          <button
           
            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
            title="Delete account"
            disabled={isDeletingBankAccount}
            onClick={() => deleteBankAccount(bankAccount.id)}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
