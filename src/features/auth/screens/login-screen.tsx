import {
  Box,
  Button,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

/**
 * Values from the login form
 */
type LoginInputs = {
  /**
   * User email
   */
  email: string;

  /**
   * User password
   */
  password: string;
};

export const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { auth } = useAuth();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const handleLogin: SubmitHandler<LoginInputs> = async ({
    email,
    password,
  }) => {
    try {
      setIsAuthenticating(true);

      // This operation fails if the login is incorrect
      // TODO: Put this method in the auth context
      await signInWithEmailAndPassword(auth, email, password);

      navigate(searchParams.get("redirect") || "/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingBlock: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t("auth.login.title")}
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
        onSubmit={handleSubmit(handleLogin)}
      >
        <TextField
          variant="outlined"
          label={t("auth.login.email.label")}
          placeholder={t("auth.login.email.placeholder")}
          error={!!errors.email}
          helperText={errors.email?.message}
          type="email"
          fullWidth
          {...register("email", {
            required: t("auth.login.email.errors.required"),
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: t("auth.login.email.errors.invalid"),
            },
          })}
        />
        <TextField
          variant="outlined"
          label={t("auth.login.password.label")}
          placeholder={t("auth.login.password.placeholder")}
          error={!!errors.password}
          helperText={errors.password?.message}
          type="password"
          fullWidth
          {...register("password", {
            required: t("auth.login.password.errors.required"),
          })}
        />
        <Button
          disabled={isAuthenticating}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {isAuthenticating ? (
            <CircularProgress size={25} />
          ) : (
            t("auth.login.submit")
          )}
        </Button>
      </Box>
    </Container>
  );
};
