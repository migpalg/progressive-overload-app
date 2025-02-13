import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import {
  FitnessCenter as FitnessCenterIcon,
  EggAlt as EggAltIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

export const DashboardLayout = () => {
  const [value, setValue] = useState("/dashboard");
  const navigate = useNavigate();

  return (
    <Box sx={{ pb: 7 }}>
      <Outlet />
      <Paper
        elevation={7}
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue: string) => {
            setValue(newValue);
            navigate(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="/dashboard"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            value="/dashboard/routine"
            label="Routine"
            icon={<FitnessCenterIcon />}
          />
          <BottomNavigationAction
            value="/dashboard/diet"
            label="Diet"
            icon={<EggAltIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};
