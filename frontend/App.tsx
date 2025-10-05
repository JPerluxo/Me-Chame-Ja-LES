import { ExpoRoot } from "expo-router";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <ExpoRoot context={require.context("./src/app")} />
    </AuthProvider>
  );
}