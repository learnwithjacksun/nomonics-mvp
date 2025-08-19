import { Search, TransactionCard, TransactionCardSkeleton } from "@/components/ui";
import { useAdmin } from "@/hooks";
import { MainLayout } from "@/layouts";
import { useState, useMemo } from "react";

const statusFilterBtns = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Success",
    value: "success",
  },
  {
    label: "Failed",
    value: "failed",
  },
];

const typeFilterBtns = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Credit",
    value: "credit",
  },
  {
    label: "Debit",
    value: "debit",
  },
];

export default function Transactions() {
  const { transactions, isTransactionsLoading } = useAdmin();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // Filter and search logic
  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    
    return transactions.filter((transaction: ITransaction) => {
      // Search filter
      const searchMatch = search === "" || 
        transaction.title.toLowerCase().includes(search.toLowerCase()) ||
        transaction.description.toLowerCase().includes(search.toLowerCase()) ||
        transaction.user.name.toLowerCase().includes(search.toLowerCase()) ||
        transaction.user.email.toLowerCase().includes(search.toLowerCase());
      
      // Status filter
      const statusMatch = selectedStatus === "all" || transaction.status === selectedStatus;
      
      // Type filter
      const typeMatch = selectedType === "all" || transaction.type === selectedType;
      
      return searchMatch && statusMatch && typeMatch;
    });
  }, [transactions, search, selectedStatus, selectedType]);

  const isLoading = isTransactionsLoading;

  return (
    <MainLayout title="Transactions" description="View your transactions">
      <div className="space-y-6">
        {/* Filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="md:w-[70%] w-full">
            <Search placeholder="Search transactions, users, or descriptions..." search={search} setSearch={setSearch}/>
          </div>

          {/* Status Filter */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                Filter by Status
              </h3>
              <ul className="flex items-center gap-2 flex-wrap">
                {statusFilterBtns.map((status) => (
                  <li
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className={`capitalize text-sm ${
                      selectedStatus === status.value
                        ? "bg-primary-2 font-medium text-white border border-transparent"
                        : "bg-background text-muted border border-line"
                    } rounded-full px-4 py-2 cursor-pointer shadow-lg`}
                  >
                    {status.label}
                  </li>
                ))}
              </ul>
            </div>
            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Type</h3>
              <ul className="flex items-center gap-2 flex-wrap">
                {typeFilterBtns.map((type) => (
                  <li
                    key={type.value}
                    onClick={() => setSelectedType(type.value)}
                    className={`capitalize text-sm ${
                      selectedType === type.value
                        ? "bg-primary-2 font-medium text-white border border-transparent"
                        : "bg-background text-muted border border-line"
                    } rounded-full px-4 py-2 cursor-pointer shadow-lg`}
                  >
                    {type.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Results count and clear filters */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted">
              Showing {filteredTransactions.length} of {transactions?.length || 0} transactions
            </p>
            {(search || selectedStatus !== "all" || selectedType !== "all") && (
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedStatus("all");
                  setSelectedType("all");
                }}
                className="text-sm text-primary-2 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Transactions Grid */}
        <div>
          {isLoading && <TransactionCardSkeleton />}
          {!isLoading && filteredTransactions.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTransactions.map((transaction: ITransaction) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredTransactions.length === 0 && (
            <div className="bg-background rounded-lg h-40 border border-line">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-muted text-sm mb-2">
                    {search || selectedStatus !== "all" || selectedType !== "all"
                      ? "No transactions found matching your filters"
                      : "No transactions found"
                    }
                  </p>
                  {(search || selectedStatus !== "all" || selectedType !== "all") && (
                    <button
                      onClick={() => {
                        setSearch("");
                        setSelectedStatus("all");
                        setSelectedType("all");
                      }}
                      className="text-sm text-primary-2 hover:underline"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
