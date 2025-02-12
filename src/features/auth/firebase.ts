import { initializeApp } from "firebase/app";
import { config } from "./config";
import { connectAuthEmulator, getAuth } from "firebase/auth";

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL);
}
