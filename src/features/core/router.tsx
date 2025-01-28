import { Route, Routes } from "react-router";
import { LoginScreen } from "../auth/screens/login-screen";

export const Router = () => {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<LoginScreen />} />
      </Route>
    </Routes>
  );
};
