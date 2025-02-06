import { signOut } from "firebase/auth";
import { useAuth } from "../../auth/hooks/useAuth";
import { Box, Button } from "@mui/material";

export const HomeScreen = () => {
  const { auth } = useAuth();

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleSignOut} color="error">
        Sign out
      </Button>
    </Box>
  );
};
