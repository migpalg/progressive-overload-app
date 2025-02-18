import { Navigate, Outlet } from "react-router";
import { LinearProgress } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

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
