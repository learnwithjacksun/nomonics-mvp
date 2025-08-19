import { useState } from "react";
import { Plus, Wallet, TrendingUp } from "lucide-react";
import { Box } from "@/components/ui";
import { useAdmin, useAdminCommission } from "@/hooks";
import { MainLayout } from "@/layouts";
import { formatNumber } from "@/helpers/formatNumber";
import { BankAccount, Withdrawal, CommissionStats } from "@/components/main";

export default function Revenue() {

  const [activeTab, setActiveTab] = useState<
    "overview" | "bank-accounts" | "withdrawals"
  >("overview");

  const { balance } = useAdmin();
  const { totalCommission } = useAdminCommission();

  const stats = [
    {
      title: "Total Revenue",
      value: `₦${formatNumber(Number(balance) || 0)}`,
      icon: Wallet,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Admin Commission",
      value: `₦${formatNumber(totalCommission || 0)}`,
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
  ];

  return (
    <MainLayout
      title="Revenue Management"
      description="Manage your earnings and withdrawals"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-background border border-line rounded-lg p-4 shadow-lg"
            >
              <div className="space-y-2">
                <p className="text-sm text-muted">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-line">
          <nav className="flex space-x-4 md:space-x-8 flex-wrap">
            {[
              { id: "overview", label: "Overview" },
              { id: "bank-accounts", label: "Bank Accounts" },
              { id: "withdrawals", label: "Withdrawals" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as "overview" | "bank-accounts" | "withdrawals"
                  )
                }
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-primary-2 text-primary-2"
                    : "border-transparent text-muted hover:text-primary-2"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <Box title="Quick Actions" icon={<Plus size={20} />}>
                  <div className="space-y-3">
                    <div
                      onClick={() => setActiveTab("bank-accounts")}
                      className="w-full cursor-pointer text-left p-3 border border-line rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">
                            Add Bank Account
                          </p>
                          <p className="text-xs text-muted">
                            Save your bank details for withdrawals
                          </p>
                        </div>
                        <Plus size={20} className="text-muted" />
                      </div>
                    </div>

                    <div
                      onClick={() => setActiveTab("withdrawals")}
                      className="w-full cursor-pointer text-left p-3 border border-line rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-sm">Make Withdrawal</p>
                          <p className="text-xs text-muted">
                            Withdraw your earnings to your bank account
                          </p>
                        </div>
                        <Wallet size={20} className="text-muted" />
                      </div>
                    </div>
                  </div>
                </Box>

                {/* Commission Stats */}
                <CommissionStats />
              </div>
            </div>
          )}

          {/* Bank Accounts Tab */}
          {activeTab === "bank-accounts" && <BankAccount />}

          {/* Withdrawals Tab */}
          {activeTab === "withdrawals" && <Withdrawal />}
        </div>
      </div>
    </MainLayout>
  );
}
