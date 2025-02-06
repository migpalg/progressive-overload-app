import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { LinearProgress } from "@mui/material";

export const AuthenticatedLayout = () => {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return <LinearProgress />;
  }

  if (!user) {
    return (
      <Navigate to={`/auth/login?target=${encodeURI(location.pathname)}`} />
    );
  }

  return (
    <div>
      <h1>Authenticated Layout</h1>
      <Outlet />
    </div>
  );
};
