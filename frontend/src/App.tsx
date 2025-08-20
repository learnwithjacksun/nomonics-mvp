import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import {
  Categories,
  Comic,
  Home,
  Library,
  MarketPlace,
  ReelFlow,
  Profile,
  Preview,
  PurchaseCredit,
  Transactions,
  SellProducts,
} from "@/pages/main";
import { ForgotPassword, Login, NewPassword, Register, Role, Verify } from "./pages/auth";
import { Comics, Create, NewChapter, Revenue, Stats } from "./pages/creator";
import { Overview, Comics as AdminComics } from "./pages/admin";
import ComicDetails from "./pages/admin/comic-details";
import { useAuth } from "./hooks";
import { useEffect } from "react";

export default function App() {
  const { getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<NewPassword />} />
        <Route path="/role" element={<Role />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/comic/:id" element={<Comic />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/library" element={<Library />} />
        <Route path="/reel-flow" element={<ReelFlow />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/marketplace/sell" element={<SellProducts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/purchase-credit" element={<PurchaseCredit />} />
        <Route path="/transactions" element={<Transactions />} />

        <Route path="/creator">
          <Route path="create" element={<Create />} />
          <Route path="stats" element={<Stats />} />
          <Route path="comics" element={<Comics />} />
          <Route path="new-chapter" element={<NewChapter />} />
          <Route path="revenue" element={<Revenue />} />
        </Route>
        <Route path="/admin">
          <Route path="overview" element={<Overview />} />
          <Route path="comics" element={<AdminComics />} />
          <Route path="comic/:id" element={<ComicDetails />} />

        </Route>
      </Routes>
    </>
  );
}
