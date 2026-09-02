    import { Stack } from "expo-router";

    export default function RootLayout() {
        return(
            <Stack>
        <Stack.Screen name="index" screenOptions={{ headerShown: false }}/>
        <Stack.Screen name="register" options={{ title:'criar conta'}}/>
            </Stack>
        );
    }