import { initializeApp } from "firebase/app";
import { config } from "./config";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL, {
    disableWarnings: true,
  });

  connectFirestoreEmulator(
    db,
    import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_URL,
    import.meta.env.VITE_FIREBASE_FIRESTORE_EMULATOR_PORT,
  );
}
