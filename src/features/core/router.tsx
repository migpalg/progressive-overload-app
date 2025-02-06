import { Route, Routes } from "react-router";
import { LoginScreen } from "../auth/screens/login-screen";
import { AuthenticatedLayout } from "../auth/layouts/authenticated-layout";

export const Router = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<LoginScreen />} />
      </Route>

      <Route path="*" element={<AuthenticatedLayout />}>
        <Route path="dashboard" element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};
