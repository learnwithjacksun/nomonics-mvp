import { ArrowLeft, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "./profile-card";
import { useState } from "react";
import MobileMenu from "./mobile-menu";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/overview";
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/50 backdrop-blur-sm shadow-sm">
        <nav
          className={`flex items-center h-[70px] w-[90%] mx-auto ${
            isDashboard ? "justify-between" : "justify-between"
          }`}
        >
          <div className={`${isDashboard ? "hidden" : "block"}`}>
            <button
              onClick={() => navigate(-1)}
              className="h-10 w-10 center rounded-full bg-primary/10 text-primary-2"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

         {isDashboard && <div className="text-xl visible md:invisible">
            🔥 
          </div>}

          <div className="flex items-center gap-4">
            
            <ProfileCard />
            <div className="md:hidden block cursor-pointer">
              <Menu onClick={() => setIsMobileMenuOpen(true)} />
            </div>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            isOpen={isMobileMenuOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
