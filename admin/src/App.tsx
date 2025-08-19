import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ScrollToTop } from "@/components/ui";
import { Home, NotFound, Protector } from "@/pages";
import {
  AddComic,
  AddProduct,
  ComicDetails,
  Comics,
  MarketPlace,
  Overview,
  Preview,
  Revenue,
  TransactionDetails,
  Transactions,
  UserDetails,
  Users,
  Settings,
} from "./pages/main";
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
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route element={<Protector />}>
          <Route path="/overview" element={<Overview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/add" element={<AddComic />} />
          <Route path="/comics/:id" element={<ComicDetails />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<TransactionDetails />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/marketplace/add" element={<AddProduct />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
