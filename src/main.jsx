import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import RootLayout from "@/layouts/root.layout.jsx";
import MainLayout from "@/layouts/main.layout.jsx";

import HomePage from "@/pages/home.page.jsx";
import AboutPage from "@/pages/about.page.jsx";
import ProductsPage from "@/pages/products.page.jsx";
import ProductDetailPage from "@/pages/product-detail.page.jsx";
import AdminPage from "@/pages/admin.page.jsx";
import AdminLoginPage from "@/pages/admin-login.page.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/officeit-admin" element={<AdminPage />} />
          </Route>
          <Route path="/officeit-admin/login" element={<AdminLoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
