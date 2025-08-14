import { Box, ButtonWithLoader, InputWithoutIcon } from "@/components/ui";
import { formatNumber } from "@/helpers/formatNumber";
import { useAuth, usePayment } from "@/hooks";
import { MainLayout, MiniLayout } from "@/layouts";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function PurchaseCredit() {
  const { user } = useAuth();
  
  const { initializePayment, loading} = usePayment();
  const [credit, setCredit] = useState("");
  const [equivalentPrice, setEquivalentPrice] = useState(0);
  useEffect(() => {
    if (credit) {
      setEquivalentPrice(Number(credit) * 10);
    } else {
      setEquivalentPrice(0);
    }
  }, [credit]);

  const handlePurchase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!credit) {
      toast.error("Please enter amount of credits");
      return;
    }
    if (Number(credit) < 20) {
      toast.error("Minimum purchase is 20 credits");
      return;
    }
    if (!user?.email) {
      toast.error("Please login to purchase credits");
      return;
    }
    initializePayment(user?.email, equivalentPrice, user?.id, Number(credit));
    
      setCredit("");
      setEquivalentPrice(0);
    
  };
  return (
    <MainLayout>
      <MiniLayout
        title="Purchase Credit"
        subtitle="Buy credits to unlock comics"
      >
        <div className="w-full md:w-[480px] mx-auto">
          <Box>
            <form className="space-y-4" onSubmit={handlePurchase}>
              <InputWithoutIcon
                type="number"
                placeholder="e.g. 10"
                label="Amount of Credits"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
              />
              <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                <p className="text-muted text-sm">Equivalent price</p>
                <p className="text-primary-2 font-bold text-xl">
                  &#8358; {formatNumber(equivalentPrice)}
                </p>
              </div>
              <ButtonWithLoader
                type="submit"
                initialText="Purchase"
                loadingText="Purchasing..."
                className="w-full btn-primary h-10 rounded-lg"
                loading={loading}
                disabled={loading}
              />
            </form>
          </Box>
        </div>
      </MiniLayout>
    </MainLayout>
  );
}
