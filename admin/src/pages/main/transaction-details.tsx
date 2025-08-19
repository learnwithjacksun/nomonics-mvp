import { useAdmin } from "@/hooks";
import { MainLayout } from "@/layouts";
import {
  Loader,
  TriangleAlert,
  ArrowLeft,
  User,
  Hash,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";

export default function TransactionDetails() {
  const { id } = useParams();
  const { transactions } = useAdmin();
  const transaction = transactions?.find(
    (transaction: ITransaction) => transaction.id === id
  );

  if (!transaction) {
    return (
      <MainLayout
        title="Transaction Details"
        description="View transaction details"
      >
        <div className="flex items-center gap-2">
          <TriangleAlert size={20} className="text-primary" />
          Transaction not found. Retrying...
          <Loader size={20} className="animate-spin" />
        </div>
      </MainLayout>
    );
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle size={20} className="text-green-600" />;
      case "pending":
        return <Clock size={20} className="text-yellow-600" />;
      case "failed":
        return <XCircle size={20} className="text-red-600" />;
      default:
        return <Clock size={20} className="text-gray-600" />;
    }
  };

  return (
    <MainLayout
      title="Transaction Details"
      description="View transaction details"
    >
      <div className="space-y-6">
        {/* Back Button */}
        <Link
          to="/transactions"
          className="inline-flex items-center gap-2 text-primary-2 hover:underline"
        >
          <ArrowLeft size={16} />
          Back to Transactions
        </Link>

        {/* Transaction Header */}
        <div className="bg-white rounded-lg p-6 border border-line shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {transaction.title}
              </h1>
              <p className="text-gray-600">{transaction.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  transaction.status
                )}`}
              >
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Transaction Amount */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Transaction Amount</p>
                <p
                  className={`text-3xl font-bold ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "credit" ? "+" : "-"}₦
                  {transaction.amount.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Type</p>
                <p className="font-semibold capitalize">{transaction.type}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Hash size={20} />
                Transaction Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reference ID:</span>
                  <span className="font-mono text-sm">
                    {transaction.reference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span>{formatDate(transaction.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Updated:</span>
                  <span>{formatDate(transaction.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(transaction.status)}
                    <span className="capitalize">{transaction.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} />
                User Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{transaction.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{transaction.user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Role:</span>
                  <span className="capitalize font-medium">
                    {transaction.user.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Credits:</span>
                  <span className="font-medium">
                    {transaction.user.credits.toLocaleString()}
                  </span>
                </div>
                {transaction.user.phone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">
                      {transaction.user.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </MainLayout>
  );
}
