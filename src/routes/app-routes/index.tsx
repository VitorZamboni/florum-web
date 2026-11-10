import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { Layout } from "@/components/layout";
import { SignupPage } from "@/pages/sigup";
import { LoginPage } from "@/pages/login";
import { OrdersPage } from "@/pages/orders";
import { RequireAuth } from "@/components/require-auth";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/orders" element={<OrdersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}