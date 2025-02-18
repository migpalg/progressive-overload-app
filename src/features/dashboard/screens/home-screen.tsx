import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/use-auth";
import { Avatar, Box, Button, Typography } from "@mui/material";

export const HomeScreen = () => {
  const { signOut, user } = useAuth();
  const { t } = useTranslation();
  const shortName =
    user?.displayName &&
    `${user?.displayName.split(" ")[0][0]}${user?.displayName.split(" ")[1][0]}`;

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar>{shortName}</Avatar>
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="h5" fontWeight={900}>
            {t("home.greeting")}
          </Typography>
          <Typography variant="subtitle1">
            {user?.displayName ?? user?.email}
          </Typography>
        </Box>
      </Box>
      <Button variant="contained" onClick={handleSignOut} color="error">
        Sign out
      </Button>
    </Box>
  );
};
