import { Box, Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

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
      await signInWithEmailAndPassword(auth, email, password);

      // TODO: Redirect to the home page
    } catch (error) {
      console.error(error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      onSubmit={handleSubmit(handleLogin)}
    >
      <TextField
        variant="outlined"
        label={t("auth.login.email.label")}
        placeholder={t("auth.login.email.placeholder")}
        error={!!errors.email}
        helperText={errors.email?.message}
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
        {t("auth.login.submit")}
      </Button>
    </Box>
  );
};
