// src/app/_layout.tsx
import { Stack } from "expo-router";
import "../styles/global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="fidelity" />
      <Stack.Screen name="wallet" />
      <Stack.Screen name="policies" />
      <Stack.Screen name="config" />
      <Stack.Screen name="drivers" /> */}
    </Stack>
  );
}