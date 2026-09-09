import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chef's Menu Manager",
          headerShown: false,
        }}
      />
    </Stack>
  );
}