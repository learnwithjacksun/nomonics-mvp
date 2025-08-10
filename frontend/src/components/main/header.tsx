import { navLinks } from "@/constants/data";
import { user } from "@/constants/dummy";
import {
  BadgeDollarSign,
  ChevronDown,
  CloudUpload,
  Menu,
  Sparkle,
  Star,
  UserRound,
  Wallet,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { ButtonWithLoader } from "../ui";
import { useEffect, useState } from "react";
import { MenuBar } from ".";
import { AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur">
        <nav className="main h-[70px] flex items-center justify-between">
          <div className="flex items-center justify-between">
            <Link to="/" className="-translate-x-4 -translate-y-1">
              <img src="/logo.svg" alt="logo" width={150} height={150} />
            </Link>

            <ul className="hidden md:flex items-center justify-center gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      isActive
                        ? "text-sm bg-primary-2/10 px-4 py-2 rounded-lg text-primary-2 font-medium border border-transparent"
                        : "text-sm text-nowrap px-4 py-2 border border-transparent hover:border-primary-2 rounded-lg text-primary-2 transition-all duration-300"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 relative">
            {!user && (
              <div className="flex items-center md:gap-4 gap-2">
                <Link
                  to="/login"
                  className="hidden md:block font-semibold text-sm px-4 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/role"
                  className="btn btn-primary px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </div>
            )}
            {user && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium hidden md:block">
                    Credits:{" "}
                  </p>
                  <div className="center gap-2 h-9 px-4 rounded-full bg-yellow-500/10 text-primary-2 font-semibold">
                    <Star size={18} />
                    <span>{user?.credit}</span>
                  </div>
                </div>

                <div
                  onClick={toggleDropDown}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <div className="md:h-11 md:w-11 h-9 w-9 center rounded-full overflow-hidden">
                    <img
                      src="https://ui-avatars.com/api/?name=John+Doe&background=4b2e00&color=fff"
                      alt=""
                    />
                  </div>
                  <ChevronDown size={20} />
                </div>
              </div>
            )}
            <div className="md:hidden cursor-pointer">
              <Menu size={24} onClick={() => setIsMenuOpen(true)} />
            </div>

            {isDropDownOpen && (
              <UserMenu
                isOpen={isDropDownOpen}
                user={user}
                toggleDropDown={toggleDropDown}
              />
            )}
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <MenuBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

const UserMenu = ({
  user,
  toggleDropDown,
  isOpen,
}: {
  user: User | null;
  toggleDropDown: () => void;
  isOpen: boolean;
}) => {
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
    <>
      <div
        className={`absolute top-full right-0 w-[220px] bg-white rounded-lg p-2 space-y-4 z-50`}
      >
        <div className="bg-foreground rounded-lg p-2 space-y-1">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-muted flex items-center gap-1 capitalize">
            <Sparkle size={16} className="text-primary" /> {user?.role}
          </p>
        </div>
        <ul className="">
          <li
            onClick={toggleDropDown}
            className="hover:bg-foreground rounded-lg"
          >
            <Link to="/profile" className="text-sm flex items-center gap-2 p-2">
              {" "}
              <UserRound size={18} /> Profile
            </Link>
          </li>
          <li
            onClick={toggleDropDown}
            className="hover:bg-foreground rounded-lg"
          >
            <Link to="/profile" className="text-sm flex items-center gap-2 p-2">
              {" "}
              <BadgeDollarSign size={18} /> Sell Comics
            </Link>
          </li>
          {user?.role === "creator" && (
            <li
              onClick={toggleDropDown}
              className="hover:bg-foreground rounded-lg"
            >
              <Link
                to="/creator/create"
                className="text-sm flex items-center gap-2 p-2"
              >
                {" "}
                <CloudUpload size={18} /> Upload Comics
              </Link>
            </li>
          )}
          {user?.role === "reader" && (
            <li
              onClick={toggleDropDown}
              className="hover:bg-foreground rounded-lg"
            >
              <Link to="/token" className="text-sm flex items-center gap-2 p-2">
                {" "}
                <Wallet size={18} /> Purchase Credits
              </Link>
            </li>
          )}
        </ul>
        <ButtonWithLoader
          initialText="Logout"
          loadingText="Logging out..."
          className="w-full bg-red-500 h-10 rounded-lg text-white"
        />
      </div>
    </>
  );
};
