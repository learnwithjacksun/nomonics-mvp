import { X, Clock, CheckCircle, AlertCircle, Ban } from "lucide-react";
import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import clsx from "clsx";

interface WithdrawalCardProps {
  withdrawal: IWithdrawal;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

export default function WithdrawalCard({
  withdrawal,
  onCancel,
  isCancelling = false,
}: WithdrawalCardProps) {
  const getStatusIcon = () => {
    switch (withdrawal.status) {
      case "pending":
        return <Clock size={18} className="text-yellow-500" />;
      case "processing":
        return <Clock size={18} className="text-blue-500" />;
      case "completed":
        return <CheckCircle size={18} className="text-green-500" />;
      case "failed":
        return <AlertCircle size={18} className="text-red-500" />;
      case "cancelled":
        return <Ban size={18} className="text-gray-500" />;
      default:
        return <Clock size={18} className="text-yellow-500" />;
    }
  };

  const getStatusColor = () => {
    switch (withdrawal.status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "processing":
        return "bg-blue-500/10 text-blue-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "failed":
        return "bg-red-500/10 text-red-500";
      case "cancelled":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  return (
    <div className="border border-line shadow-lg rounded-lg p-4 space-y-3 dark:bg-secondary bg-background">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium">Withdrawal Request</h3>
            <span className={clsx("text-sm px-2 py-1 rounded-full font-medium capitalize", getStatusColor())}>
              {withdrawal.status}
            </span>
          </div>
          
          <div className="space-y-2">
            <p className="text-2xl font-bold">
              ₦{formatNumber(withdrawal.amount)}
            </p>
            
            <div className="space-y-1">
              <p className="text-muted text-sm">
                <span className="font-medium">Reference:</span> {withdrawal.reference}
              </p>
              <p className="text-muted text-sm">
                <span className="font-medium">Bank:</span> {withdrawal.bankAccount.bankName}
              </p>
              <p className="text-muted text-sm">
                <span className="font-medium">Account:</span> {withdrawal.bankAccount.accountNumber}
              </p>
              <p className="text-muted text-sm">
                <span className="font-medium">Account Name:</span> {withdrawal.bankAccount.accountName}
              </p>
              {withdrawal.failureReason && (
                <p className="text-red-500 text-sm">
                  <span className="font-medium">Reason:</span> {withdrawal.failureReason}
                </p>
              )}
              <p className="text-muted text-xs">
                Requested {formatDate(withdrawal.createdAt)}
              </p>
              {withdrawal.processedAt && (
                <p className="text-muted text-xs">
                  Processed {formatDate(withdrawal.processedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          
          {withdrawal.status === "pending" && onCancel && (
            <button
              onClick={() => onCancel(withdrawal.id)}
              disabled={isCancelling}
              className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
              title="Cancel withdrawal"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
