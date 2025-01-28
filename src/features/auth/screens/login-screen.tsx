import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LoginScreen = () => {
  const { t } = useTranslation();

  return (
    <div>
      <TextField
        variant="outlined"
        label={t("auth.login.email.label")}
        fullWidth
      />
      <TextField
        variant="outlined"
        label={t("auth.login.password.label")}
        type="password"
        fullWidth
      />
      <Button variant="contained" color="primary" fullWidth>
        {t("auth.login.submit")}
      </Button>
    </div>
  );
};
