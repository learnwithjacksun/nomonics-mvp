import { creatorNavLinks, navLinks } from "@/constants/data";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ButtonWithLoader } from "../ui";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks";

interface MenuBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuBar({ isOpen, onClose }: MenuBarProps) {
  const {user, logout} = useAuth();
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

  const menuNavLinks = user?.role === "creator" ? creatorNavLinks : navLinks;

  return (
    <div className="fixed inset-0 z-60">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ scaleX: 0 }}
        className="relative z-10 w-[70%] origin-left h-[100dvh] bg-primary-2 flex flex-col"
      >
        <div className="flex justify-end h-[70px] px-4">
          <button className="text-white" onClick={onClose}>
            <X />
          </button>
        </div>

        <ul className="space-y-4 pl-4">
          {menuNavLinks.map((link) => (
            <li key={link.label}>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary-2 font-semibold flex items-center gap-2 bg-primary py-3 px-4 rounded-l-full"
                    : "text-white/80 hover:bg-primary/20 rounded-l-full flex items-center gap-2 py-3 px-4"
                }
              >
                <link.icon size={20} />
                <span className="text-sm">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {!user && (
          <div className="flex flex-col gap-4 px-4 mt-auto mb-4">
            <Link
              to="/role"
              className="btn bg-primary/20 text-primary py-2 rounded-lg"
            >
              Register
            </Link>
            <Link to="/login" className="btn text-white py-2 rounded-lg">
              Login
            </Link>
          </div>
        )}

        {user && (
          <ButtonWithLoader
            initialText="Logout"
            loadingText="Logging out..."
            className="w-[90%] mx-auto mt-auto mb-4 bg-red-500 h-10 rounded-lg text-white"
            onClick={() => logout()}
          />
        )}
      </motion.div>
    </div>
  );
}
