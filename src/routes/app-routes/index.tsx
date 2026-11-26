import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { Layout } from "@/components/layout";
import { SignupPage } from "@/pages/sigup";
import { LoginPage } from "@/pages/login";
import { Orders } from "@/pages/orders";
import { RequireAuth } from "@/components/require-auth";
import { Product } from "@/pages/product";
import Products from "@/pages/products";
import { Cart } from "@/pages/cart";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Route>
    </Routes>
  );
}