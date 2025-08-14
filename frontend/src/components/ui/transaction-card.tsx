import { formatDate } from "@/helpers/formatDate";
import { formatNumber } from "@/helpers/formatNumber";
import clsx from "clsx";



export default function TransactionCard({
  transaction,
}: {
  transaction: ITransaction;
}) {
  return (
    <div className="border border-line shadow-lg cursor-pointer rounded-lg p-4 space-y-2 dark:bg-secondary bg-background">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">{transaction.title}</h3>
        <p
          className={clsx(
            "text-sm px-2 py-1 rounded-full capitalize font-medium",
            {
              "bg-yellow-500/10 text-yellow-500":
                transaction.status === "pending",
              "bg-green-500/10 text-green-500":
                transaction.status === "success",
              "bg-red-500/10 text-red-500": transaction.status === "failed",
            }
          )}
        >
          {transaction.status}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-muted text-sm text-ellipsis line-clamp-1">
          {transaction.description}
        </p>
        <p className="text-lg font-medium">
          {transaction.type === "credit" ? "+" : "-"} &#8358;
          {formatNumber(transaction.amount)}
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-line pt-2">
        <p className="text-muted text-xs">{formatDate(transaction.createdAt)}</p>
      </div>
    </div>
  );
}