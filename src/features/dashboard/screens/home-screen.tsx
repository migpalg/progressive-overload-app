import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/use-auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  styled,
  Typography,
} from "@mui/material";

import DumbbellIllustration from "../assets/dumbbell.svg";

const HeaderImage = styled("img")`
  position: absolute;
  inset: 0;
  object-fit: contain;
  transform: scale(1.75) rotate(-20deg);
`;

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
    <Container sx={{ overflow: "hidden", py: 2 }}>
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

      <Paper
        elevation={2}
        sx={(theme) => ({
          p: 2,
          my: 2,
          borderRadius: 4,
          backgroundColor: theme.palette.grey[100],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
        })}
      >
        <Box>
          <Typography
            sx={{ lineHeight: 1.1, mb: 0.5 }}
            variant="h6"
            fontWeight={800}
          >
            Setup your workout plan
          </Typography>
          <Typography sx={{ opacity: 0.5 }} variant="subtitle2">
            Workout
          </Typography>
        </Box>
        <Box
          sx={{
            width: 100,
            height: 70,
            position: "relative",
          }}
        >
          <HeaderImage src={DumbbellIllustration} alt="Dumbbell illustration" />
        </Box>
      </Paper>

      <Button variant="contained" onClick={handleSignOut} color="error">
        Sign out
      </Button>
    </Container>
  );
};
