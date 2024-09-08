import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Slot, SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import GlobalProvider from '../context/GlobalProvider'
import TimerProvider from '../context/time'

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
    const [fontsLoaded, error] = useFonts({
        "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
        "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
        "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
        "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
        "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, error])

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <GlobalProvider>
        <TimerProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(search)/[query]" options={{ headerShown: true }} />
                <Stack.Screen name="notifications" options={{ headerShown: false }} />
                <Stack.Screen name="mood-logging" options={{ headerShown: false }} />
                <Stack.Screen name="settings" options={{ headerShown: false }} />
                <Stack.Screen name="timer/[id]" options={{ headerShown: false }} />
                <Stack.Screen name="adjustTimer" options={{ headerShown: false }} />
                <Stack.Screen name="meditation" options={{ headerShown: false }} />
                <Stack.Screen name="quiz" options={{ headerShown: false }} />
            </Stack>
            </TimerProvider>
        </GlobalProvider>
    )
}

export default RootLayout;

