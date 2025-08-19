import { navLinks } from "@/constants/data"
import { NavLink } from "react-router-dom"
import { ButtonWithLoader } from "../ui"
import { useAuth } from "@/hooks"

export default function Sidebar() {
  const { logout, isLoading } = useAuth();
  return (
    <div className=" h-full flex flex-col bg-primary-2">
      <div className="h-[70px] w-full">
        <div className="h-full w-full flex items-center">
          <img src="/logo.svg" alt="logo" width={150} height={150} />
        </div>
      </div>

      <ul className="pl-4 mt-10 space-y-2">
        {navLinks.map((link, index) => (
          <li key={index}>
            <NavLink to={link.href} className={({isActive}) => isActive ? " flex items-center gap-2 bg-primary text-primary-2 font-semibold rounded-l-full p-4" : "text-muted flex items-center gap-2 p-4 hover:bg-primary/10 hover:text-primary rounded-l-full"}>
              <link.icon size={18} />
              <span className="text-sm">{link.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <ButtonWithLoader loading={isLoading} initialText="Logout" loadingText="Logging out..." onClick={() => {logout()}} className="mt-auto bg-red-500 text-white h-11" />
    </div>
  )
}
