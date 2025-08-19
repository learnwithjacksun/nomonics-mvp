import { navLinks } from "@/constants/data";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ButtonWithLoader } from "../ui";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks";

interface MobileMenuProps {
  onClose: () => void;
  isOpen: boolean;
}

const MobileMenu = ({ onClose, isOpen }: MobileMenuProps) => {
  const { logout, isLoading } = useAuth();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className="fixed inset-0 z-80 md:hidden block">
      <motion.div
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       exit={{opacity: 0}}
       transition={{duration: 0.2}}
       className="absolute inset-0 bg-black/50" onClick={onClose} />

       
      <motion.div
      initial={{scaleX: 0}}
      animate={{scaleX: 1}}
      exit={{scaleX: 0}}
      className="absolute origin-left inset-y-0 h-full w-[70%] bg-primary-2 flex flex-col">
        <div className="h-[70px] w-full bg-primary-2 flex items-center justify-end px-4">
          <button className="h-11 w-11 center bg-primary-2/10 text-white rounded-full" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <ul className="pl-4 space-y-2">
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? " flex items-center gap-2 bg-primary text-primary-2 font-semibold rounded-l-full p-4"
                    : "text-muted flex items-center gap-2 p-4 hover:bg-primary/10 hover:text-primary rounded-l-full"
                }
              >
                <link.icon size={18} />
                <span className="text-sm">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <ButtonWithLoader
          initialText="Logout"
          loadingText="Logging out..."
          onClick={() => {logout()}}
          loading={isLoading}
          className="mt-auto bg-red-500 text-white h-11"
        />
      </motion.div>
    </div>
  );
};

export default MobileMenu;
