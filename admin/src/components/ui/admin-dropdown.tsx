import { Shield, UserRound, Users, BookOpen, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import ButtonWithLoader from "./ButtonWithLoader";
import { useAuth } from "@/hooks";
import { forwardRef } from "react";

interface AdminDropdownProps {
  user: IUser;
  toggleDropDown: () => void;
}

const AdminDropdown = forwardRef<HTMLDivElement, AdminDropdownProps>(
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
            <Shield size={16} className="text-primary" /> Admin
          </p>
        </div>
        
        <ul className="space-y-1">
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/profile" className="text-sm flex items-center gap-2 p-2">
              <UserRound size={18} /> Profile
            </Link>
          </li>
          
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/admin/comics" className="text-sm flex items-center gap-2 p-2">
              <BookOpen size={18} /> Manage Comics
            </Link>
          </li>
          
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/admin/users" className="text-sm flex items-center gap-2 p-2">
              <Users size={18} /> Manage Users
            </Link>
          </li>
          <li className="hover:bg-foreground rounded-lg">
            <Link to="/admin/payouts" className="text-sm flex items-center gap-2 p-2">
              <Wallet size={18} /> Payouts
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

AdminDropdown.displayName = "AdminDropdown";

export default AdminDropdown;
