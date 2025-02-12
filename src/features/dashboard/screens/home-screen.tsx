import { useAuth } from "../../auth/hooks/useAuth";
import { Box, Button } from "@mui/material";

export const HomeScreen = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleSignOut} color="error">
        Sign out
      </Button>
    </Box>
  );
};
