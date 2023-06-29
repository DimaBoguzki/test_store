import * as React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { LogIn, Register, NotFount } from '../pages';

export default function Auth() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={ <LogIn /> }
      />
      <Route
        path="/register"
        element={ <Register /> }
      />
      <Route
        path="*"
        element={<NotFount />}
      />
    </Routes>
  );
}
