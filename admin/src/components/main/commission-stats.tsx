import { useState, useEffect } from 'react';
import { TrendingUp, Users, CreditCard, DollarSign } from 'lucide-react';
import { Box } from '@/components/ui';
import { useAdminCommission, useSettings } from '@/hooks';
import { formatNumber } from '@/helpers/formatNumber';

export default function CommissionStats() {
  const { totalCommission, loading, error } = useAdminCommission();
  const { settings } = useSettings();
  const [stats, setStats] = useState({
    totalTransactions: 0,
    averageCommission: 0,
    commissionRate: 0,
  });

  useEffect(() => {
    if (settings && totalCommission > 0) {
      // Calculate some basic stats
      const commissionRate = settings.adminCommissionPercentage;
      const averageCommission = totalCommission / Math.max(stats.totalTransactions, 1);
      
      setStats({
        totalTransactions: Math.round(totalCommission / (settings.creditsPerPaidComic / settings.creditsPerHundredNaira * 100 * commissionRate / 100)),
        averageCommission,
        commissionRate,
      });
    }
  }, [settings, stats.totalTransactions, totalCommission]);

  const statCards = [
    {
      title: "Total Commission",
      value: `₦${formatNumber(totalCommission || 0)}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Commission Rate",
      value: `${settings?.adminCommissionPercentage || 0}%`,
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Est. Transactions",
      value: formatNumber(stats.totalTransactions),
      icon: CreditCard,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Avg. Commission",
      value: `₦${formatNumber(stats.averageCommission || 0)}`,
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  if (loading) {
    return (
      <Box title="Commission Statistics" icon={<TrendingUp size={20} />}>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      </Box>
    );
  }

  if (error) {
    return (
      <Box title="Commission Statistics" icon={<TrendingUp size={20} />}>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </Box>
    );
  }

  return (
    <Box title="Commission Statistics" icon={<TrendingUp size={20} />}>
      <div className="grid grid-cols-2 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-background border border-line rounded-lg p-3"
          >
            <div className="space-y-1">
              <p className="text-xs text-muted">{stat.title}</p>
              <p className="text-lg font-semibold">{stat.value}</p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
      
      {settings && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Commission Breakdown:</strong> For every {settings.creditsPerPaidComic}-credit comic sold, 
            you earn ₦{((settings.creditsPerPaidComic / settings.creditsPerHundredNaira) * 100 * settings.adminCommissionPercentage / 100).toFixed(2)} 
            ({settings.adminCommissionPercentage}% of ₦{((settings.creditsPerPaidComic / settings.creditsPerHundredNaira) * 100).toFixed(2)})
          </p>
        </div>
      )}
    </Box>
  );
}
