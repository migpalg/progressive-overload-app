import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/use-auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Paper,
  styled,
  Typography,
} from "@mui/material";

import DumbbellIllustration from "../assets/dumbbell.svg";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../core/firebase";

const HeaderImage = styled("img")`
  position: absolute;
  inset: 0;
  object-fit: contain;
  transform: scale(1.75) rotate(-20deg);
`;

export const HomeScreen = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const shortName =
    user?.displayName &&
    `${user?.displayName.split(" ")[0][0]}${user?.displayName.split(" ")[1][0]}`;

  const handleButtonClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "entries"), {
        title: "Bench Press",
        sets: 3,
        reps: 10,
        weight: 100,
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log('error creating document', error);
    }
  }

  return (
    <Container
      sx={(theme) => ({
        overflow: "hidden",
        py: 2,
        minHeight: "100vh",
        backgroundColor: theme.palette.grey[50],
      })}
    >
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
        sx={{
          p: 2,
          my: 2,
          borderRadius: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 4,
        }}
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

      <Box>
        <Box sx={{ my: 2 }}>
          <Typography variant="h2" fontWeight={600}>
            {t("home.recent-entries.title")}
          </Typography>

          <Typography variant="caption" sx={{ opacity: 0.5 }}>
            {t("home.recent-entries.subtitle")}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid size={6} key={index}>
              <Paper key={index} sx={{ borderRadius: 4, p: 2 }}>
                <Typography variant="h6">Bench Press</Typography>
                <Typography variant="body2" sx={{ opacity: 0.5 }}>
                  3x10
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Button onClick={handleButtonClick}>
        Create a mock entry
      </Button>
    </Container>
  );
};
