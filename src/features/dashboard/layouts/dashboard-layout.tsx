import { Outlet } from "react-router";

export const DashboardLayout = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <Outlet />
    </div>
  );
};
