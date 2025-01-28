import { initializeApp } from "firebase/app";
import { config } from "./config";
import { getAuth } from "firebase/auth";

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
