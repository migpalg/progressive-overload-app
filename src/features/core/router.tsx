import { Navigate, Route, Routes } from "react-router";
import { LoginScreen } from "../auth/screens/login-screen";
import { AuthenticatedLayout } from "../auth/layouts/authenticated-layout";
import { HomeScreen } from "../dashboard/screens/home-screen";
import { DashboardLayout } from "../dashboard/layouts/dashboard-layout";
import { RoutineScreen } from "../dashboard/screens/routine-screen";
import { DietScreen } from "../dashboard/screens/diet-screen";

export const Router = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<LoginScreen />} />
      </Route>

      <Route path="" element={<AuthenticatedLayout />}>
        {/* Fallback to dasboard */}
        <Route index element={<Navigate to="dashboard" />} />` `
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomeScreen />} />
          <Route path="routine" element={<RoutineScreen />} />
          <Route path="diet" element={<DietScreen />} />
        </Route>
      </Route>
    </Routes>
  );
};
