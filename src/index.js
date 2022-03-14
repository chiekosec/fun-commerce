import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to='/products' />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
