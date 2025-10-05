import axios from "axios";

const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL || "http://localhost:3000";

export const api = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
});