import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack initialRouteName="(home)" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}
