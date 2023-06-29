import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { Main, Cart, NotFount } from '../pages';
import Header from '../layout/Header';
import MainLayout from '../layout/Main';
import CartProvider from "../context/cart";

export default function App() {
  return (
    <CartProvider>
      <Header/>
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={ <Main /> }
          />
          <Route
            path="/cart"
            element={ <Cart /> }
          />
          <Route
            path="*"
            element={<NotFount />}
          />
        </Routes>
      </MainLayout>
    </CartProvider>
  );
}
