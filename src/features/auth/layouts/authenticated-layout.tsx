import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LinearProgress } from "@mui/material";

export const AuthenticatedLayout = () => {
  const { user, status } = useAuth();

  if (status === "loading") {
    // TODO: Show a skeleton loader
    return <LinearProgress />;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};
