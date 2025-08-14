import { adminNavLinks, creatorNavLinks, navLinks } from "@/constants/data";
import {
  Menu,
  Star,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { MenuBar } from ".";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks";
import { ChevronDown } from "lucide-react";
import { ReaderDropdown, CreatorDropdown, AdminDropdown } from "../ui";

export default function Header() {
  const {user} = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInAvatar = avatarRef.current?.contains(target);
      const isClickInDropdown = dropdownRef.current?.contains(target);
      
      if (!isClickInAvatar && !isClickInDropdown) {
        setIsDropDownOpen(false);
      }
    };

    if (isDropDownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropDownOpen]);

  const menuNavLinks = user?.role === "creator" ? creatorNavLinks : navLinks;

  const isAdminNavLinks = user?.isAdmin ? adminNavLinks : menuNavLinks;

  // Function to render the appropriate dropdown based on user role
  const renderDropdown = () => {
    if (!user) return null;

    if (user.isAdmin) {
      return (
        <AdminDropdown 
          user={user} 
          toggleDropDown={toggleDropDown}
          ref={dropdownRef}
        />
      );
    }

    if (user.role === "creator") {
      return (
        <CreatorDropdown 
          user={user} 
          toggleDropDown={toggleDropDown}
          ref={dropdownRef}
        />
      );
    }

    if (user.role === "reader") {
      return (
        <ReaderDropdown 
          user={user} 
          toggleDropDown={toggleDropDown}
          ref={dropdownRef}
        />
      );
    }

    return null;
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
              {isAdminNavLinks.map((link) => (
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
                    <span className="text-sm md:text-md">{user?.credits}</span>
                  </div>
                </div>

                <div
                  onClick={toggleDropDown}
                  className="flex items-center gap-1 cursor-pointer"
                  ref={avatarRef}
                >
                  <div className="md:h-11 md:w-11 h-9 w-9 center bg-blue-300 rounded-full overflow-hidden">
                    <img
                      src={user?.image || "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix"}
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

            {isDropDownOpen && renderDropdown()}
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





