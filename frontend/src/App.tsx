import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Categories, Comic, Home, Library, MarketPlace, ReelFlow } from "@/pages/main";
import { Login, Register, Role, Verify } from "./pages/auth";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<Role />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/comic/:id" element={<Comic />} /> 
        <Route path="/categories" element={<Categories />} />
        <Route path="/library" element={<Library />} />
        <Route path="/reel-flow" element={<ReelFlow />} />
        <Route path="/marketplace" element={<MarketPlace />} />
      </Routes>
    </>
  );
}
