import { TransactionCard, TransactionCardSkeleton } from "@/components/ui";
import { useAdmin, useAuth, usePayment } from "@/hooks";
import { MainLayout } from "@/layouts";

export default function Transactions() {
  const { user } = useAuth();
  const { transactions: adminTransactions, isTransactionsLoading } = useAdmin();
  const { transactions: userTransactions, isLoadingTransactions } =
    usePayment();
  const filteredTransactions =
    userTransactions &&
    userTransactions?.filter(
      (transaction: ITransaction) => transaction.user.id === user?.id
    );
  const filteredAdminTransactions =
    adminTransactions &&
    adminTransactions?.filter(
      (transaction: ITransaction) => transaction.user.id === user?.id
    );

  const isAdmin = user?.isAdmin;
  const isUser = user?.role === "reader" || user?.role === "creator";

  const transactions = isAdmin
    ? filteredAdminTransactions
    : isUser
    ? filteredTransactions
    : [];
  const isLoading = isTransactionsLoading || isLoadingTransactions;

  console.log(userTransactions);

  return (
    <MainLayout title="Transactions" subtitle="View your transactions">
      <div className="main">
        {isLoading && <TransactionCardSkeleton />}
        {!isLoading && transactions && transactions.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions &&
              transactions.map((transaction: ITransaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
          </div>
        )}

        {!isLoading && transactions && transactions.length === 0 && (
          <div className="bg-background rounded-lg h-40 border border-line animate-pulse">
            <div className="flex items-center justify-center h-full">
              <p className="text-muted text-sm">No transactions found</p>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
