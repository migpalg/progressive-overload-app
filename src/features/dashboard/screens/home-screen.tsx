import { useAuth } from "../../auth/hooks/useAuth";
import { Box, Button, Typography } from "@mui/material";

export const HomeScreen = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box>
      <Typography variant="h2" fontWeight={900}>
        Home
      </Typography>
      <Typography variant="subtitle1">Welcome to the home screen!</Typography>

      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Typography>
      <Button variant="contained" onClick={handleSignOut} color="error">
        Sign out
      </Button>
    </Box>
  );
};
