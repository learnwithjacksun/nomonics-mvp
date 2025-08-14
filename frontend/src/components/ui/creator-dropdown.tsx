import { BadgeDollarSign, CloudUpload, Sparkle, TrendingUp, UserRound, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import ButtonWithLoader from "./ButtonWithLoader";
import { useAuth } from "@/hooks";
import { forwardRef } from "react";

interface CreatorDropdownProps {
  user: IUser;
  toggleDropDown: () => void;
}

const CreatorDropdown = forwardRef<HTMLDivElement, CreatorDropdownProps>(
  ({ user }, ref) => {
    const { logout } = useAuth();

    return (
      <div 
        ref={ref}
        className="absolute top-full right-0 w-[220px] bg-white rounded-lg p-2 shadow-lg border border-line space-y-4 z-50"
      >
        <div className="bg-foreground rounded-lg p-2 space-y-1">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted flex items-center gap-1 capitalize">
            <Sparkle size={16} className="text-primary" /> Creator
          </p>
        </div>
        
        <ul className="space-y-1">
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/profile" className="text-sm flex items-center gap-2 p-2">
              <UserRound size={18} /> Profile
            </Link>
          </li>
          
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/creator/create" className="text-sm flex items-center gap-2 p-2">
              <CloudUpload size={18} /> Upload Comics
            </Link>
          </li>
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/creator/create" className="text-sm flex items-center gap-2 p-2">
              <BadgeDollarSign size={18} /> Sell Products
            </Link>
          </li>
          
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/creator/stats" className="text-sm flex items-center gap-2 p-2">
              <TrendingUp size={18} /> Stats/ Earnings
            </Link>
          </li>
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/transactions" className="text-sm flex items-center gap-2 p-2">
              <Wallet size={18} /> Transactions
            </Link>
          </li>
        </ul>
        
        <ButtonWithLoader
          initialText="Logout"
          loadingText="Logging out..."
          onClick={() => logout()}
          className="w-full bg-red-500 h-10 rounded-lg text-white"
        />
      </div>
    );
  }
);

CreatorDropdown.displayName = "CreatorDropdown";

export default CreatorDropdown;
