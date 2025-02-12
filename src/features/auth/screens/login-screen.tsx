import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AlternateEmail, Lock } from "@mui/icons-material";
import { FirebaseError } from "firebase/app";
import { useAuth } from "../hooks/useAuth";
import { EMAIL_REGEX } from "../constants.ts";
import { GoogleIcon } from "../icons/google-icon.tsx";

import GymGirlIllustration from "../assets/gym-girl.svg";

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

const ImageContainer = styled.img`
  width: 80%;
  height: auto;
  margin: 0 auto;
  display: block;
`;

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
      <ImageContainer src={GymGirlIllustration} alt="Dumbbell Illustration" />
      <Typography variant="h4" fontWeight={900} sx={{ mb: 4 }}>
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
          gap: 3,
        }}
        onSubmit={handleSubmit(handleLogin)}
      >
        <TextField
          variant="outlined"
          label={t("auth.login.email.label")}
          placeholder={t("auth.login.email.placeholder")}
          slotProps={{
            htmlInput: { "data-testid": "login-email-input" },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              ),
            },
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
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            },
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
          size="large"
          fullWidth
        >
          {isAuthenticating ? (
            <CircularProgress data-testid="authenticating-progress" size={25} />
          ) : (
            t("auth.login.submit")
          )}
        </Button>
      </Box>
      <Divider variant="middle" sx={{ my: 2 }}>
        <Typography variant="caption">Or</Typography>
      </Divider>
      <Box>
        {/* TODO: Implement login with google */}
        <Button
          variant="outlined"
          fullWidth
          size="large"
          startIcon={<GoogleIcon />}
          disabled
        >
          {t("auth.login.google")}
        </Button>
      </Box>
    </Container>
  );
};
