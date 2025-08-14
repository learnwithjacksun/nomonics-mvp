export default function TransactionCardSkeleton() {
    return (
      <div className="border border-line rounded-lg p-4 space-y-2 dark:bg-secondary bg-background animate-pulse">
        {/* Title & status */}
        <div className="flex justify-between items-center">
          <div className="h-5 w-32 bg-muted rounded"></div>
          <div className="h-5 w-16 bg-muted rounded-full"></div>
        </div>
  
        {/* Description & amount */}
        <div className="space-y-1">
          <div className="h-4 w-48 bg-muted rounded"></div>
          <div className="h-5 w-24 bg-muted rounded"></div>
        </div>
  
        {/* Footer date */}
        <div className="flex justify-between items-center border-t border-line pt-2">
          <div className="h-3 w-20 bg-muted rounded"></div>
        </div>
      </div>
    );
  }
  