import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/pages/home";
import { Layout } from "@/components/layout";
import { SignupPage } from "@/pages/signup";
import { LoginPage } from "@/pages/login";
import { OrdersPage } from "@/pages/orders";
import { RequireAuth } from "@/components/require-auth";
import { ProductPage } from "@/pages/product";
import { ProductsPage } from "@/pages/products";
import { CartPage } from "@/pages/cart";
import { CheckoutPage } from "@/pages/checkout";
import { NotFoundPage } from "@/pages/not-found";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
        {/* not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}