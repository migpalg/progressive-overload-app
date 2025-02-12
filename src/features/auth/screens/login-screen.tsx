import {
  Alert,
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
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { EMAIL_REGEX } from "../constants.ts";
import { FirebaseError } from "firebase/app";

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

/**
 * This Screen allows the user to login into the application.
 */
export const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { signInWithEmailAndPassword } = useAuth();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [errorCode, setErrorCode] = useState<string | null>(null);
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
      setErrorCode(null);

      // This operation fails if the login is incorrect
      await signInWithEmailAndPassword(email, password);

      navigate(searchParams.get("redirect") || "/dashboard");
    } catch (error) {
      setErrorCode(
        error instanceof FirebaseError ? error.code : "auth/default"
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ paddingBlock: 2 }}>
      <Typography variant="h4" gutterBottom>
        {t("auth.login.title")}
      </Typography>
      {errorCode && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t([`auth.errors.${errorCode}`, "auth.errors.auth/default"])}
        </Alert>
      )}
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
          slotProps={{
            htmlInput: { "data-testid": "login-email-input" },
          }}
          disabled={isAuthenticating}
          error={!!errors.email}
          helperText={errors.email?.message}
          type="email"
          fullWidth
          {...register("email", {
            required: t("auth.login.email.errors.required"),
            pattern: {
              value: EMAIL_REGEX,
              message: t("auth.login.email.errors.invalid"),
            },
          })}
        />
        <TextField
          variant="outlined"
          disabled={isAuthenticating}
          label={t("auth.login.password.label")}
          slotProps={{
            htmlInput: { "data-testid": "login-password-input" },
          }}
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
          data-testid="login-submit-button"
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          {isAuthenticating ? (
            <CircularProgress data-testid="authenticating-progress" size={25} />
          ) : (
            t("auth.login.submit")
          )}
        </Button>
      </Box>
    </Container>
  );
};
